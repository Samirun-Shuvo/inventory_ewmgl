"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  organizations,
  departments,
  designations,
  employeeStatus,
} from "@/constants/selectOptions";

const EditEmployee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const empParam = searchParams.get("emp");

  // Deserialize employee from query string
  const employee = useMemo(() => {
    try {
      return empParam ? JSON.parse(empParam) : null;
    } catch (error) {
      console.error("Invalid employee data:", error);
      return null;
    }
  }, [empParam]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: employee || {},
  });

  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const res = await fetch(`/api/employees/${employee._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Failed to update employee");
        return;
      }

      toast.success("Employee updated successfully!");
      router.push("/dashboard/employee");
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  if (!employee) {
    return <div className="text-red-500">No employee data found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Edit Employee
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Full name is required" })}
              defaultValue={employee.name}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Date Of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Of Birth
            </label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
              defaultValue={employee.dob?.substring(0, 10)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* PF Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PF Number
            </label>
            <input
              type="number"
              {...register("pf", { required: "PF number is required" })}
              defaultValue={employee.pf}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.pf && (
              <p className="text-red-500 text-sm mt-1">{errors.pf.message}</p>
            )}
          </div>

          {/* IP Extension No */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              IP Extension No
            </label>
            <input
              type="number"
              {...register("ip_extention_no", {
                required: "IP extension number is required",
              })}
              defaultValue={employee.ip_extention_no}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.ip_extention_no && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ip_extention_no.message}
              </p>
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
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              defaultValue={employee.email}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              defaultValue={employee.phone}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Dropdown Fields */}
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
              defaultValue={employee.organization}
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
              defaultValue={employee.department}
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
              defaultValue={employee.designation}
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
              {...register("status", {
                required: "Status is required",
              })}
              defaultValue={employee.status}
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
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
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
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
