"use client";
import { getOrganizationStatusColor } from "@/utils/getStatusDesign";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const OrganizationsList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizations = async () => {
    try {
      const res = await fetch("/api/organizations");
      if (!res.ok) throw new Error("Failed to fetch organizations");
      const data = await res.json();
      setOrganizations(data);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organization?"))
      return;

    const toastId = toast.loading("Deleting...");
    try {
      const res = await fetch(`/api/organizations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Failed to delete");
      }
      setOrganizations((prev) => prev.filter((org) => org._id !== id));
      toast.success("Organization deleted successfully", { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
          Organizations
        </h2>
        <Link href="/dashboard/organizations/add" className="btn btn-primary">
          Add Organization
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        {loading ? (
          <div className="p-10 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : organizations.length === 0 ? (
          <div className="p-10 text-center text-gray-500 italic">
            No organizations found. Get started by adding one!
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-sm uppercase text-gray-600">
              <tr>
                <th>Organization</th>
                <th>Location</th>
                <th>Industry</th>
                <th>Size</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {organizations.map((org) => (
                <tr key={org._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-gray-100">
                          <img
                            src={
                              org.logo ||
                              `https://ui-avatars.com/api/?name=${org.name}&background=random`
                            }
                            alt="Logo"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          {org.name}
                          {org.is_verified && (
                            <div
                              className="badge badge-primary badge-xs tooltip"
                              data-tip="Verified"
                            ></div>
                          )}
                        </div>
                        <div className="text-xs opacity-50">{org.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="text-sm">
                    {org.address?.city}, {org.address?.country}
                  </td>

                  <td className="text-sm font-medium">{org.industry || "-"}</td>

                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {org.employee_size}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge badge-sm font-semibold capitalize ${getOrganizationStatusColor(org.status)}`}
                    >
                      {org.status || "inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/organizations/view/${org._id}`}
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="View"
                      >
                        👁️
                      </Link>
                      <Link
                        href={`/dashboard/organizations/edit/${org._id}`}
                        className="btn btn-square btn-ghost btn-sm tooltip text-warning"
                        data-tip="Edit"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(org._id)}
                        className="btn btn-square btn-ghost btn-sm tooltip text-error"
                        data-tip="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrganizationsList;
