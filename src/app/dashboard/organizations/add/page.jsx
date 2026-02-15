"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddOrganization = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      address: {
        city: data.city,
        country: data.country,
      },
    };

    delete payload.city;
    delete payload.country;

    const toastId = toast.loading("Saving organization...");

    try {
      const res = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add organization");
      }

      toast.success("Organization added successfully 🎉", {
        id: toastId,
      });

      reset(); // ✅ clear form
      router.push("/dashboard/organizations"); // ✅ redirect
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        id: toastId,
      });
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-base-100 shadow rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold">Add Organization</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Organization Name */}
          <div>
            <label className="label">Organization Name</label>
            <input
              className="input input-bordered w-full"
              {...register("name", {
                required: "Organization name is required",
              })}
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
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
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

          {/* Website */}
          <div>
            <label className="label">Website</label>
            <input
              className="input input-bordered w-full"
              {...register("website")}
            />
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

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              {...register("description")}
            />
          </div>

          {/* Logo */}
          <div>
            <label className="label">Logo</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("logo")}
            />
          </div>

          {/* Verified */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Verified Organization</span>
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
              type="reset"
              className="btn btn-ghost"
              onClick={() => router.push("/dashboard/organizations")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Organization"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrganization;
