"use client";

import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Search, Plus, UserCheck } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { filterBySearch } from "@/utils/filter";
import { handleDelete } from "@/utils/handleDelete";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
      Fetch Assigned Users
  ========================= */
  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedUsers();
  }, []);

  /* =========================
      Search Filter
  ========================= */
  const filteredUsers = filterBySearch(users, searchTerm, [
    "employeeName",
    "employeePf",
    "employeeDepartment",
    "employeeDesignation",
    "employeeOrganization",
    "productType",
    "status",
    "assignedAt",
  ]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Assigned Users
          </h2>
          <p className="text-sm text-gray-500">
            Tracking {filteredUsers.length} asset assignments
          </p>
        </div>
        <Link
          href="/dashboard/users/add"
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add User
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, PF, dept or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        {loading ? (
          <div className="p-10 text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center text-gray-500 italic">
            No assigned users found matching your search.
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 font-semibold">
              <tr>
                <th className="w-12">#</th>
                <th>Employee Details</th>
                <th>Role & Dept</th>
                <th>Asset Type</th>
                <th>Assigned Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id} className="hover transition-colors">
                  <td className="text-xs opacity-50 font-mono">{idx + 1}</td>

                  {/* Name & PF Column */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <UserCheck size={20} />
                      </div>
                      <div>
                        <div className="font-bold">{user.employeeName || "N/A"}</div>
                        <div className="text-[11px] opacity-60 font-semibold uppercase">
                          PF: {user.employeePf || "-"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Dept Column */}
                  <td className="text-sm">
                    <div className="font-medium text-gray-700">
                      {user.employeeDesignation || "-"}
                    </div>
                    <div className="text-xs opacity-60">
                      {user.employeeDepartment || "-"}
                    </div>
                  </td>

                  {/* Product Type Badge */}
                  <td>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold uppercase">
                      {user.productType || "-"}
                    </span>
                  </td>

                  {/* Date Column */}
                  <td className="text-sm">
                    {user.assignedAt
                      ? new Date(user.assignedAt).toLocaleDateString("en-GB")
                      : "-"}
                  </td>

                  {/* Status Column */}
                  <td>
                    <StatusBadge status={user?.status} />
                  </td>

                  {/* Actions Column */}
                  <td>
                    <div className="flex justify-center gap-1">
                      <Link
                        href={{
                          pathname: "/dashboard/users/view",
                          query: { user: JSON.stringify(user) },
                        }}
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="View Details"
                      >
                        <Eye size={18} className="text-info" />
                      </Link>

                      <Link
                        href={`/dashboard/users/edit/${user._id}`}
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="Edit Assignment"
                      >
                        <Pencil size={18} className="text-warning" />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete({
                            id: user._id,
                            resource: "users",
                            setState: setUsers,
                            itemName: "user",
                          })
                        }
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="Delete"
                      >
                        <Trash2 size={18} className="text-error" />
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

export default UserListPage;