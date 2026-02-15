"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  departments,
  designations,
  employeeStatus,
} from "@/constants/selectOptions";
import { useRouter } from "next/navigation";

const AddEmployee = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch Organizations from your API
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await fetch("/api/organizations");
        if (!res.ok) throw new Error("Failed to load organizations");
        const data = await res.json();
        setOrganizations(data);
      } catch (err) {
        toast.error("Could not load organizations list");
      } finally {
        setLoadingOrgs(false);
      }
    };
    fetchOrgs();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add employee");
      }

      toast.success("Employee added successfully!");
      reset();
      router.push("/dashboard/employee"); // Redirect to list
    } catch (err) {
      toast.error(err.message || "Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`}
              placeholder="e.g. John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Date Of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Date Of Birth
            </label>
            <input
              type="date"
              {...register("dob", { required: "DOB is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PF Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              PF Number
            </label>
            <input
              type="text"
              {...register("pf", { required: "PF Number is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 10293"
            />
          </div>

          {/* IP Extension No */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              IP Extension No
            </label>
            <input
              type="text"
              {...register("ip_extention_no")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 5501"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone", { required: "Phone is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+8801..."
            />
          </div>

          {/* Organization Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Organization
            </label>
            <select
              {...register("organization", {
                required: "Please select an organization",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                {loadingOrgs
                  ? "Loading organizations..."
                  : "Select organization"}
              </option>
              {organizations.map((org) => (
                <option key={org._id} value={org.name}>
                  {org.name}
                </option>
              ))}
            </select>
            {errors.organization && (
              <p className="text-red-500 text-xs mt-1">
                {errors.organization.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Department
            </label>
            <select
              {...register("department", {
                required: "Department is required",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Designation
            </label>
            <select
              {...register("designation", {
                required: "Designation is required",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select designation</option>
              {designations.map((des) => (
                <option key={des} value={des}>
                  {des}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select status</option>
              {employeeStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-bold tracking-wider uppercase transition-all shadow-lg ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-95"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                Processing...
              </span>
            ) : (
              "Add Employee"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
