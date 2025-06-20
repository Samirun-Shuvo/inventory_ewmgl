"use client";

import Heading from "@/components/Heading";
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

  const handleView = () => {};
  const handleEdit = () => {};
  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("User deleted successfully");
        // Update local state to reflect deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("An unexpected error occurred");
    }
  };

  // 🔍 Filter logic
  const filteredUsers = users.filter((user) => {
    const lower = searchTerm.toLowerCase();
    return (
      user.employeeName?.toLowerCase().includes(lower) ||
      user.employeePf?.toString().includes(lower) ||
      user.employeeEmail?.toLowerCase().includes(lower) ||
      user.employeePhone?.toLowerCase().includes(lower) ||
      user.employeeDepartment?.toLowerCase().includes(lower) ||
      user.employeeDesignation?.toLowerCase().includes(lower) ||
      user.employeeOrganization?.toLowerCase().includes(lower) ||
      user.productType?.toLowerCase().includes(lower) ||
      user.productTypeDetail?.toLowerCase().includes(lower) ||
      user.productModel?.toLowerCase().includes(lower) ||
      user.productSerial?.toLowerCase().includes(lower) ||
      user.productServiceTag?.toLowerCase().includes(lower) ||
      user.productOrganization?.toLowerCase().includes(lower) ||
      user.productProcessor?.toLowerCase().includes(lower) ||
      user.productRam?.toLowerCase().includes(lower) ||
      user.productHdd?.toLowerCase().includes(lower) ||
      user.productSsd?.toLowerCase().includes(lower) ||
      user.productGeneration?.toLowerCase().includes(lower) ||
      user.productDisplaySize?.toLowerCase().includes(lower) ||
      user.status?.toLowerCase().includes(lower) ||
      new Date(user.assignedAt)
        .toISOString()
        .split("T")[0]
        .toLowerCase()
        .includes(lower)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead className="bg-[#e9d8d8] text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>PF No</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Employee Org</th>
                <th>Product Type</th>
                <th>Type Detail</th>
                <th>Model</th>
                <th>Serial</th>
                <th>Service Tag</th>
                <th>Product Org</th>
                <th>Processor</th>
                <th>RAM</th>
                <th>HDD</th>
                <th>SSD</th>
                <th>Generation</th>
                <th>Display Size</th>
                <th>Assigned Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.employeeName || "-"}</td>
                  <td>{user.employeePf || "-"}</td>
                  <td>{user.employeeEmail || "-"}</td>
                  <td>{user.employeePhone || "-"}</td>
                  <td>{user.employeeDepartment || "-"}</td>
                  <td>{user.employeeDesignation || "-"}</td>
                  <td>{user.employeeOrganization || "-"}</td>
                  <td>{user.productType || "-"}</td>
                  <td>{user.productTypeDetail || "-"}</td>
                  <td>{user.productModel || "-"}</td>
                  <td>{user.productSerial || "-"}</td>
                  <td>{user.productServiceTag || "-"}</td>
                  <td>{user.productOrganization || "-"}</td>
                  <td>{user.productProcessor || "-"}</td>
                  <td>{user.productRam || "-"}</td>
                  <td>{user.productHdd || "-"}</td>
                  <td>{user.productSsd || "-"}</td>
                  <td>{user.productGeneration || "-"}</td>
                  <td>{user.productDisplaySize || "-"}</td>
                  <td>
                    {new Date(user.assignedAt).toISOString().split("T")[0] ||
                      "-"}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "active"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {user?.status}
                    </span>
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
                        onClick={() => handleDelete(user._id)}
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
      )}
    </div>
  );
};

export default UserListPage;
