"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { organizations } from "@/constants/selectOptions";
import { productTypes } from "@/constants/selectOptions";
import LaptopFields from "@/components/formComponent/LaptopFields";
import PrinterFields from "@/components/formComponent/PrinterFields";
import IpPhoneFields from "@/components/formComponent/IpPhoneFields";
import MouseFields from "@/components/formComponent/MouseFields";
import KeyboardFields from "@/components/formComponent/KeyboardFields";
import CpuFields from "@/components/formComponent/CpuFields";
import MonitorFields from "@/components/formComponent/MonitorFields";
import toast from "react-hot-toast";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const productType = watch("product_type");
  const status = watch("status");

  const onSubmit = async (data) => {
    const newData = {
      product_type: productType,
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
      status: data.status || "",
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const responseData = await response.json();
      toast.success("Product created successfully!");
      reset(); // clear form
      console.log("Product created:", responseData);
    } catch (error) {
      toast.error("Failed to create product. Please try again.");
      console.error("Error submitting product:", error.message);
    }
  };

  useEffect(() => {
    if (productType) {
      reset({ product_type: productType });
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
          <label
            htmlFor="product_type"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Product Type <span className="text-red-500">*</span>
          </label>
          <select
            id="product_type"
            {...register("product_type", {
              required: "Product type is required",
            })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.product_type
                ? "border-red-500 ring-red-500"
                : "border-gray-300"
            }`}
            defaultValue=""
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
            Organization <span className="text-red-500">*</span>
          </label>
          <select
            id="organization"
            {...register("organization", {
              required: "Organization is required",
            })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.organization
                ? "border-red-500 ring-red-500"
                : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select an organization
            </option>
            {organizations.map((organization) => (
              <option key={organization} value={organization}>
                {organization}
              </option>
            ))}
          </select>
          {errors.organization && (
            <p className="mt-1 text-sm text-red-600">
              {errors.organization.message}
            </p>
          )}
        </div>

        {/* Conditional Fields */}
        {productType === "Laptop" && <LaptopFields register={register} />}
        {productType === "CPU" && <CpuFields register={register} />}
        {productType === "Monitor" && <MonitorFields register={register} />}
        {productType === "Printer" && <PrinterFields register={register} />}
        {productType === "IP Phone" && <IpPhoneFields register={register} />}
        {productType === "Mouse" && <MouseFields register={register} />}
        {productType === "Keyboard" && <KeyboardFields register={register} />}

        {/* Product Status */}
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="status"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Select Product Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            {...register("status", {
              required: "Product status is required",
            })}
            className={`block w-full rounded-md border px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.status ? "border-red-500 ring-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Status --
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

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
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
