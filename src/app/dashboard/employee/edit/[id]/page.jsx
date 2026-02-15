"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

import {
  departments,
  designations,
  employeeStatus,
} from "@/constants/selectOptions";

const EditEmployee = () => {
  const router = useRouter();
  const { id } = useParams(); // Assuming your file is [id]/page.js or similar

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  /* =========================
      Fetch Data (Employee & Orgs)
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [empRes, orgRes] = await Promise.all([
          fetch(`/api/employees/${id}`),
          fetch("/api/organizations"),
        ]);

        if (!empRes.ok) throw new Error("Employee not found");

        const empData = await empRes.json();
        const orgData = await orgRes.json();

        setOrganizations(orgData);

        // Populate form with fetched employee data
        reset({
          ...empData,
          dob: empData.dob ? empData.dob.substring(0, 10) : "", // Format date for input
        });
      } catch (err) {
        toast.error(err.message || "Failed to load data");
        router.push("/dashboard/employee");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, reset, router]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update employee");
      }

      toast.success("Employee updated successfully!");
      router.push("/dashboard/employee");
    } catch (err) {
      toast.error(err.message || "Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 md:p-0">
      {/* Breadcrumb / Back Button */}
      <Link
        href="/dashboard/employee"
        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Employee List</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Edit Employee</h2>
          <p className="text-gray-500 mt-1">
            Update the information for this staff member.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none ${errors.name ? "border-error" : ""}`}
              />
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Date Of Birth */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Date Of Birth
              </label>
              <input
                type="date"
                {...register("dob", { required: "DOB is required" })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* PF Number */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                PF Number
              </label>
              <input
                type="text"
                {...register("pf", { required: "PF Number is required" })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* IP Extension */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                IP Extension No
              </label>
              <input
                type="text"
                {...register("ip_extention_no")}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phone", { required: "Phone is required" })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Organization */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Organization
              </label>
              <select
                {...register("organization", { required: "Required" })}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary"
              >
                <option value="">Select organization</option>
                {organizations.map((org) => (
                  <option key={org._id} value={org.name}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Department
              </label>
              <select
                {...register("department", { required: "Required" })}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary"
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
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Designation
              </label>
              <select
                {...register("designation", { required: "Required" })}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary"
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
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Status
              </label>
              <select
                {...register("status", { required: "Required" })}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary"
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

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-10 flex items-center gap-2"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Save size={20} />
              )}
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
