"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"; // <-- Added import here
import {
  organizations,
  departments,
  designations,
} from "@/constants/selectOptions";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [message, setMessage] = useState({ type: "", text: "" });

  const onSubmit = async (data) => {
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let errorMsg = "Failed to add employee";
        try {
          const error = await res.json();
          toast.error(error.message || "Something went wrong");
        } catch (e) {}
        setMessage({ type: "error", text: errorMsg });
        return;
      }

      toast.success("Employee added successfully!");
      reset();
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Add New Employee
      </h2>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "name", label: "Full Name" },
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "organization",
              label: "Organizations",
              options: organizations,
            },
            { name: "department", label: "Department", options: departments },
            {
              name: "designation",
              label: "Designation",
              options: designations,
            },
            {
              name: "status",
              label: "Status",
              options: ["Active", "Inactive"],
            },
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
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
            {isSubmitting ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
