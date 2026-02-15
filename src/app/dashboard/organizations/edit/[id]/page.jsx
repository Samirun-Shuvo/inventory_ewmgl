"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditOrganization = () => {
  const router = useRouter();
  const { id } = useParams(); // Assumes your file is [id]/page.jsx
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // 1. Fetch existing data
  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await fetch(`/api/organizations/${id}`);
        const result = await res.json();

        if (!res.ok) throw new Error("Failed to load organization");

        // Flatten address for the form fields if your API returns it nested
        const formData = {
          ...result,
          city: result.address?.city || "",
          country: result.address?.country || "",
        };

        reset(formData); // This fills the form inputs
      } catch (error) {
        toast.error(error.message);
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchOrg();
  }, [id, reset]);

  // 2. Handle Update
  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Updating organization...");

    const payload = {
      ...data,
      address: {
        city: data.city,
        country: data.country,
      },
    };
    delete payload.city;
    delete payload.country;

    try {
      const res = await fetch(`/api/organizations/${id}`, {
        method: "PUT", // or "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Update failed");

      toast.success("Organization updated successfully ✨", { id: toastId });
      router.push("/dashboard/organizations");
      router.refresh(); // Ensure the list view gets fresh data
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="p-10 text-center text-xl">
        Loading Organization Data...
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-base-100 shadow rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold">Edit Organization</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Organization Name */}
          <div>
            <label className="label">Organization Name</label>
            <input
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Legal Name */}
          <div>
            <label className="label">Legal Name</label>
            <input
              className="input input-bordered w-full"
              {...register("legal_name")}
            />
          </div>

          {/* Type & Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Organization Type</label>
              <input
                className="input input-bordered w-full"
                {...register("type", { required: true })}
              />
            </div>
            <div>
              <label className="label">Industry</label>
              <input
                className="input input-bordered w-full"
                {...register("industry")}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                className="input input-bordered w-full"
                {...register("phone")}
              />
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">City</label>
              <input
                className="input input-bordered w-full"
                {...register("city")}
              />
            </div>
            <div>
              <label className="label">Country</label>
              <input
                className="input input-bordered w-full"
                {...register("country")}
              />
            </div>
          </div>

          {/* Employee Size */}
          <div>
            <label className="label">Employee Size</label>
            <select
              className="select select-bordered w-full"
              {...register("employee_size")}
            >
              <option value="">Select size</option>
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="201-500">201–500</option>
              <option value="500+">500+</option>
            </select>
          </div>

          {/* Verified */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-md font-semibold">
                Verified Organization
              </span>
              <input
                type="checkbox"
                className="toggle toggle-success"
                {...register("is_verified")}
              />
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Organization"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrganization;
