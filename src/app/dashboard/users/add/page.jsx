"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"; // <-- Added import here
import {
  organizations,
  departments,
  designations,
  productTypes,
} from "@/constants/selectOptions";
import Heading from "@/components/Heading";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [message, setMessage] = useState({ type: "", text: "" });

  const onSubmit = async (data) => {
    setMessage({ type: "", text: "" });
    console.log(data);
    
    // try {
    //   const res = await fetch("/api/user", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });

    //   if (!res.ok) {
    //     let errorMsg = "Failed to add User";
    //     try {
    //       const error = await res.json();
    //       toast.error(error.message || "Something went wrong");
    //     } catch (e) {}
    //     setMessage({ type: "error", text: errorMsg });
    //     return;
    //   }

    //   toast.success("User added successfully!");
    //   reset();
    // } catch (err) {
    //   toast.error("Network error. Please try again.");
    // }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
      <Heading title="Product Assign To User" />

      {message.text && (
        <p
          className={`text-center text-sm mb-6 ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: "name", label: "Full Name", type: "text" },
            {
              name: "email",
              label: "Email",
              type: "email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            },
            {
              name: "phone",
              label: "Phone Number",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            },
            { name: "pf", label: "PF" },
          ].map(({ name, label, type = "text", pattern }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                id={name}
                type={type}
                {...register(name, {
                  required: `${label} is required`,
                  ...(pattern && { pattern }),
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              name: "organization",
              label: "Organization",
              options: organizations,
            },
            { name: "department", label: "Department", options: departments },
            {
              name: "designation",
              label: "Designation",
              options: designations,
            },
            {
              name: "product_type",
              label: "Product Type",
              options: productTypes,
            },
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label} <span className="text-red-500">*</span>
              </label>
              <select
                id={name}
                {...register(name, { required: `${label} is required` })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: "brand", label: "Brand", type: "text" },
            { name: "model", label: "Model", type: "text" },
            { name: "display_size", label: "Display Size", type: "text" },
            {
              name: "service_tag",
              label: "Service Tag",
              type: "text",
              pattern: {
                message: "",
              },
            },
            {
              name: "serial_number",
              label: "Serial Number",
              pattern: {
                message: "",
              },
            },
            {
              name: "processor",
              label: "Processor",
              pattern: {
                message: "",
              },
            },
            {
              name: "generation",
              label: "Generation",
              pattern: {
                message: "",
              },
            },
            {
              name: "ssd",
              label: "SSD",
              pattern: {
                message: "",
              },
            },
            {
              name: "hdd",
              label: "HDD",
              pattern: {
                message: "",
              },
            },
            {
              name: "ram",
              label: "RAM",
              pattern: {
                message: "",
              },
            },
            {
              name: "description",
              label: "Description",
              pattern: {
                message: "",
              },
            },
          ].map(({ name, label, type = "text", pattern }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                id={name}
                type={type}
                {...register(name, {
                  required: `${label} is required`,
                  ...(pattern && { pattern }),
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col md:col-span-4">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Select Product Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                {...register("status", {
                  required: "Product status is required",
                })}
                className={`block w-full rounded-md border px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.status
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300"
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
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
            {isSubmitting ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
