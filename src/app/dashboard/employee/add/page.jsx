"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  organizations,
  departments,
  designations,
  employeeStatus,
} from "@/constants/selectOptions";
import { useRouter } from "next/navigation";


const AddEmployee = () => {
  const router = useRouter();
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
      router.push("/dashboard/employee");
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
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* PF Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PF Number
            </label>
            <input
              type="number"
              {...register("pf")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.pf && (
              <p className="text-red-500 text-sm mt-1">{errors.pf.message}</p>
            )}
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organization
            </label>
            <select
              {...register("organization", {
                required: "Organization is required",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
            >
              <option value="">Select organization</option>
              {organizations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
            {errors.organization && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organization.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              {...register("department", {
                required: "Department is required",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <select
              {...register("designation", {
                required: "Designation is required",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
            >
              <option value="">Select designation</option>
              {designations.map((des) => (
                <option key={des} value={des}>
                  {des}
                </option>
              ))}
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
            >
              <option value="">Select status</option>
              {employeeStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
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
            {isSubmitting ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
