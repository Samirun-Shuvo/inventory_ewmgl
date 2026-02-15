"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, ArrowLeft, Save, X } from "lucide-react";

import { productStatus, productTypes } from "@/constants/selectOptions";
import ProductCommonFields from "@/components/formComponent/ProductCommonFields";
import Link from "next/link";

const EditProductForm = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id; // Expecting /dashboard/products/edit/[id]

  // State Management
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const productType = watch("product_type");

  /**
   * 1. Initial Data Fetch (Organizations & Product)
   */
  useEffect(() => {
    const initForm = async () => {
      if (!productId) {
        setError("Missing Product ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch both organizations and product details in parallel
        const [orgRes, prodRes] = await Promise.all([
          fetch("/api/organizations"),
          fetch(`/api/products/${productId}`),
        ]);

        if (!orgRes.ok || !prodRes.ok)
          throw new Error("Could not load required data.");

        const [orgsData, productData] = await Promise.all([
          orgRes.json(),
          prodRes.json(),
        ]);

        setOrganizations(orgsData);

        // Populate the form with fetched data
        reset({
          product_type: productData.product_type || "",
          organization: productData.organization || "",
          brand: productData.brand || "",
          model: productData.model || "",
          display_size: productData.display_size || "",
          type: productData.type || "",
          service_tag: productData.service_tag || "",
          serial_number: productData.serial_number || "",
          processor: productData.processor || "",
          generation: productData.generation || "",
          ssd: productData.ssd || "",
          hdd: productData.hdd || "",
          ram: productData.ram || "",
          status: productData.status || "",
        });
      } catch (err) {
        setError(err.message);
        toast.error("Initialization failed");
      } finally {
        setLoading(false);
      }
    };

    initForm();
  }, [productId, reset]);

  /**
   * 2. Submit Handler
   */
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed.");
      }

      toast.success("Product updated successfully!");
      router.push("/dashboard/products");
      router.refresh(); // Refresh server data
    } catch (error) {
      toast.error(error.message || "Failed to update product.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-wide">
          Loading asset data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl border border-red-100 text-center shadow-sm">
        <h3 className="text-xl font-bold text-gray-800">Error Loading Form</h3>
        <p className="text-gray-500 mt-2 mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="btn btn-outline btn-sm"
        >
          Return to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <Link
        href="/dashboard/products"
        className="group inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-all mb-4 md:mb-6"
      >
        <ArrowLeft
          size={18}
          className="mr-2 group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Inventory</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Asset Profile
          </h2>
          <p className="text-sm text-gray-500">
            Update the hardware specifications and assignment details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Product Type (Full Width) */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("product_type", {
                  required: "Product type is required",
                })}
                className={`select select-bordered w-full bg-gray-50 focus:bg-white transition-all ${
                  errors.product_type ? "select-error" : ""
                }`}
              >
                <option value="" disabled>
                  Select a category...
                </option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.product_type && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.product_type.message}
                </p>
              )}
            </div>

            {/* Organization (Full Width) */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Assigned Organization <span className="text-red-500">*</span>
              </label>
              <select
                {...register("organization", {
                  required: "Organization is required",
                })}
                className={`select select-bordered w-full bg-gray-50 focus:bg-white transition-all ${
                  errors.organization ? "select-error" : ""
                }`}
              >
                <option value="" disabled>
                  Select Organization...
                </option>
                {organizations.map((org) => (
                  <option key={org._id} value={org.name}>
                    {org.name}
                  </option>
                ))}
              </select>
              {errors.organization && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.organization.message}
                </p>
              )}
            </div>

            {/* Dynamic Common Fields */}
            {productType && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-y border-gray-50 py-6 my-2">
                <ProductCommonFields
                  register={register}
                  errors={errors}
                  productType={productType}
                />
              </div>
            )}

            {/* Status (Full Width) */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Operational Status <span className="text-red-500">*</span>
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className={`select select-bordered w-full bg-gray-50 focus:bg-white transition-all ${
                  errors.status ? "select-error" : ""
                }`}
              >
                <option value="" disabled>
                  Select status...
                </option>
                {productStatus?.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex-1 gap-2 shadow-lg shadow-blue-100"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-ghost border-gray-200 flex-1 gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center text-gray-400">
          Loading Edit Interface...
        </div>
      }
    >
      <EditProductForm />
    </Suspense>
  );
}
