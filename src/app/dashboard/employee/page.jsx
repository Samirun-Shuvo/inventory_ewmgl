"use client";

import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleView = (id) => {
    console.log("View", id);
    // Implement view logic here
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
    // Implement edit logic here
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

  // ✅ Conditional return for loading and empty states
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
      <h1 className="text-3xl font-bold mb-6">
        Employee List ({employees.length})
      </h1>

      <div className="overflow-x-auto border border-gray-200 shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="border p-3">#</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">PF</th>
              <th className="border p-3">Designation</th>
              <th className="border p-3">Department</th>
              <th className="border p-3">Organization</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Status</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id} className="hover:bg-gray-50 transition">
                <td className="border p-3">{index + 1}</td>
                <td className="border p-3">{emp.name}</td>
                <td className="border p-3">{emp.pf}</td>
                <td className="border p-3">{emp.designation}</td>
                <td className="border p-3">{emp.department}</td>
                <td className="border p-3">{emp.organization}</td>
                <td className="border p-3">{emp.email}</td>
                <td className="border p-3">{emp.phone}</td>
                <td className="border p-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="border p-3 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleView(emp._id)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
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
