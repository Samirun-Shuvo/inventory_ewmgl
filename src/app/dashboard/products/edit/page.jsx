"use client";

import React, { useEffect, useMemo,Suspense } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { organizations, productStatus, productTypes } from "@/constants/selectOptions";
import ProductCommonFields from "@/components/formComponent/ProductCommonFields";

const EditProduct = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productStr = searchParams.get("product");

  // ✅ Memoize the parsed product to avoid re-parsing on every render
  const productDetails = useMemo(() => {
    try {
      return productStr ? JSON.parse(productStr) : null;
    } catch (e) {
      console.error("Invalid product data in query param.");
      return null;
    }
  }, [productStr]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const productType = watch("product_type");

  useEffect(() => {
    if (productDetails) {
      reset({
        product_type: productDetails.product_type || "",
        organization: productDetails.organization || "",
        brand: productDetails.brand || "",
        model: productDetails.model || "",
        display_size: productDetails.display_size || "",
        type: productDetails.type || "",
        service_tag: productDetails.service_tag || "",
        serial_number: productDetails.serial_number || "",
        processor: productDetails.processor || "",
        generation: productDetails.generation || "",
        ssd: productDetails.ssd || "",
        hdd: productDetails.hdd || "",
        ram: productDetails.ram || "",
        status: productDetails.status || "",
      });
    }
  }, [productDetails, reset]);

  const onSubmit = async (data) => {
    if (!productDetails?._id) {
      toast.error("Invalid product ID.");
      return;
    }

    try {
      const response = await fetch(`/api/products/${productDetails._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed.");
      }

      toast.success("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Update error:", error.message);
    }
  };

  if (!productDetails) {
    return (
      <div className="text-center text-red-500 my-10">
        Product data not found or invalid.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Edit Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        {/* Product Type */}
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="product_type"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            PRODUCT TYPE <span className="text-red-500">*</span>
          </label>
          <select
            id="product_type"
            {...register("product_type", {
              required: "Product type is required",
            })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.product_type
                ? "border-red-500 ring-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select a product type
            </option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.product_type && (
            <p className="mt-1 text-sm text-red-600">
              {errors.product_type.message}
            </p>
          )}
        </div>

        {/* Organization */}
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="organization"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            ORGANIZATION <span className="text-red-500">*</span>
          </label>
          <select
            id="organization"
            {...register("organization", {
              required: "Organization is required",
            })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.organization
                ? "border-red-500 ring-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select an organization
            </option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
          {errors.organization && (
            <p className="mt-1 text-sm text-red-600">
              {errors.organization.message}
            </p>
          )}
        </div>

        {/* Common Fields */}
        {productType && (
          <ProductCommonFields
            register={register}
            errors={errors}
            productType={productType}
          />
        )}

        {/* Status Field */}
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="status"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            STATUS <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            {...register("status", {
              required: "Status is required",
            })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.status ? "border-red-500 ring-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select a status
            </option>
            {productStatus?.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold tracking-wide transition duration-300 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProduct />
    </Suspense>
  );
}

