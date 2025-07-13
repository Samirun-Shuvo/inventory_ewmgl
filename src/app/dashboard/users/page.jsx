"use client";

import Heading from "@/components/Heading";
import StatusBadge from "@/components/StatusBadge";
import { filterBySearch } from "@/utils/filter";
import { handleDelete } from "@/utils/handleDelete";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
  const handleEdit = () => {};

  // 🔍 Filter user based on searchTerm
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
    <div>
      <Heading title="Assigned Users List" length={filteredUsers.length} />
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search by any field..."
        />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="table table-xs w-full text-center">
                <thead className="bg-[#e9d8d8] text-center">
                  <tr>
                    <th className="min-w-[50px]">#</th>
                    <th className="min-w-[150px]">Name</th>
                    <th className="min-w-[100px]">PF No</th>
                    <th className="min-w-[150px]">Department</th>
                    <th className="min-w-[180px]">Designation</th>
                    <th className="min-w-[200px]">Employee Organization</th>
                    <th className="min-w-[100px]">Product Type</th>
                    <th className="min-w-[130px]">Assigned Date</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="min-w-[140px] text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td>{idx + 1}</td>
                      <td>{user.employeeName || "-"}</td>
                      <td>{user.employeePf || "-"}</td>
                      <td>{user.employeeDepartment || "-"}</td>
                      <td>{user.employeeDesignation || "-"}</td>
                      <td>{user.employeeOrganization || "-"}</td>
                      <td>{user.productType || "-"}</td>
                      <td>
                        {user.assignedAt
                          ? new Date(user.assignedAt)
                              .toISOString()
                              .split("T")[0]
                          : "-"}
                      </td>
                      <td>
                        <StatusBadge status={user?.status} />
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <Link
                            href={{
                              pathname: "/dashboard/users/view",
                              query: { user: JSON.stringify(user) },
                            }}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <button
                            onClick={() => handleEdit(user._id)}
                            className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete({
                                id: user._id,
                                resource: "users",
                                setState: setUsers,
                                itemName: "user",
                              })
                            }
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
