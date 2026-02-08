"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  productStatus,
  productTypes,
} from "@/constants/selectOptions";
import ProductCommonFields from "@/components/formComponent/ProductCommonFields";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const router = useRouter();
  
  // 1. Add state to hold the organizations
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const productType = watch("product_type");

  /* =========================
      Fetch Organizations
  ========================= */
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await fetch("/api/organizations"); // Ensure this matches your API route
        if (!res.ok) throw new Error("Failed to fetch organizations");
        const data = await res.json();
        
        // Assuming your API returns an array of strings or objects
        // If it's an array of objects like [{name: 'Org1'}], map it accordingly
        setOrganizations(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load organizations");
      } finally {
        setLoadingOrgs(false);
      }
    };

    fetchOrgs();
  }, []);

  const onSubmit = async (data) => {
    const newData = {
      product_type: data.product_type || "",
      organization: data.organization || "",
      brand: data.brand || "",
      model: data.model || "",
      display_size: data.display_size || "",
      type: data.type || "",
      service_tag: data.service_tag || "",
      serial_number: data.serial_number || "",
      processor: data.processor || "",
      generation: data.generation || "",
      ssd: data.ssd || "",
      hdd: data.hdd || "",
      ram: data.ram || "",
      status: "Not Assigned",
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      toast.success("Product created successfully!");
      reset();
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Failed to create product.");
      console.error("Error submitting product:", error.message);
    }
  };

  // Keep product type selection when reset triggers
  useEffect(() => {
    if (productType) {
      reset((prev) => ({ ...prev, product_type: productType }));
    }
  }, [productType, reset]);

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        {/* Product Type */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="product_type" className="text-sm font-medium text-gray-700 mb-2">
            PRODUCT TYPE <span className="text-red-500">*</span>
          </label>
          <select
            id="product_type"
            {...register("product_type", { required: "Product type is required" })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.product_type ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>Select a product type</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.product_type && <p className="mt-1 text-sm text-red-600">{errors.product_type.message}</p>}
        </div>

        {/* Organization */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="organization" className="text-sm font-medium text-gray-700 mb-2">
            ORGANIZATION <span className="text-red-500">*</span>
          </label>
          <select
            id="organization"
            {...register("organization", { required: "Organization is required" })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.organization ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
            disabled={loadingOrgs}
          >
            <option value="" disabled>
              {loadingOrgs ? "Loading organizations..." : "Select an organization"}
            </option>
            {organizations?.map((org) => (
              <option key={org._id || org} value={org.name || org}>
                {org.name || org}
              </option>
            ))}
          </select>
          {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>}
        </div>

        {/* Common Fields */}
        {productType && (
          <ProductCommonFields
            register={register}
            errors={errors}
            productType={productType}
          />
        )}

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold tracking-wide transition duration-300 ${
              isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;