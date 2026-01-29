"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const OrganizationsList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     Fetch Organizations
  ========================= */
  const fetchOrganizations = async () => {
    try {
      const res = await fetch("/api/organizations");

      if (!res.ok) {
        throw new Error("Failed to fetch organizations");
      }

      const data = await res.json();
      setOrganizations(data);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Organization List
        </h2>

        <Link
          href="/dashboard/organizations/add"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Organization
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : organizations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No organizations found
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Industry</th>
                <th>Employee Size</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {organizations.map((org, index) => (
                <tr key={org._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={org.logo || "https://placehold.co/80x80"}
                            alt="Logo"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{org.name}</div>
                        <div className="text-sm opacity-50">
                          {org.legal_name || "-"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{org.industry || "-"}</td>
                  <td>{org.employee_size || "-"}</td>

                  <td>
                    {org.is_verified ? (
                      <span className="badge badge-success badge-outline">
                        Verified
                      </span>
                    ) : (
                      <span className="badge badge-warning badge-outline">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/organizations/${org._id}`}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/organizations/edit/${org._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button className="btn btn-sm btn-error">Delete</button>
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
