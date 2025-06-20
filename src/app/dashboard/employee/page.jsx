"use client";

import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Heading from "@/components/Heading";
import Link from "next/link";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employees");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
        toast.error("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        const res = await fetch(`/api/employees/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Employee deleted successfully!");
          setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        } else {
          toast.error(data.message || "Failed to delete employee");
        }
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("An error occurred while deleting.");
      }
    }
  };

  // 🔍 Filter employees based on search term
  const filteredEmployees = employees.filter((emp) => {
    const search = searchTerm.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(search) ||
      emp.pf?.toLowerCase().includes(search) ||
      emp.designation?.toLowerCase().includes(search) ||
      emp.department?.toLowerCase().includes(search) ||
      emp.organization?.toLowerCase().includes(search) ||
      emp.email?.toLowerCase().includes(search) ||
      emp.phone?.toLowerCase().includes(search) ||
      emp.status?.toLowerCase().includes(search)
    );
  });

  if (loading)
    return (
      <p className="text-center py-8 text-gray-600">Loading employees...</p>
    );

  if (!employees.length)
    return (
      <p className="text-center py-8 text-gray-600">No employees found.</p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Heading title="Employee List" length={filteredEmployees.length} />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead className="bg-[#e9d8d8]">
            <tr className="text-center">
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>PF</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Organization</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredEmployees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td>{emp._id}</td>
                <td>{emp.name}</td>
                <td>{emp.pf}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>{emp.organization}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>
                  <span
                    className={`badge ${
                      emp.status === "Active"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {emp?.status}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center items-center gap-2">
                    <Link
                      href={{
                        pathname: "/dashboard/employee/view",
                        query: { emp: JSON.stringify(emp) },
                      }}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>

                    <button
                      onClick={() => handleEdit(emp._id)}
                      className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
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
  );
};

export default EmployeeList;
