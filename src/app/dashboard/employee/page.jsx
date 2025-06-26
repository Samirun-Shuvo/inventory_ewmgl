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
    // TODO: Implement edit functionality or navigate to edit page
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

  // Filter employees by search term across multiple fields
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

  return (
    <div>
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
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredEmployees.length === 0 ? (
        <p className="text-center">No employee found.</p>
      ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs w-full text-center">
              <thead className="bg-[#e9d8d8]">
                <tr>
                  <th className="min-w-[40px]">#</th>
                  <th className="min-w-[180px]">ID</th>
                  <th className="min-w-[150px]">Name</th>
                  <th className="min-w-[100px]">PF</th>
                  <th className="min-w-[180px]">Designation</th>
                  <th className="min-w-[150px]">Department</th>
                  <th className="min-w-[180px]">Organization</th>
                  <th className="min-w-[200px]">Email</th>
                  <th className="min-w-[130px]">Phone</th>
                  <th className="min-w-[100px]">Status</th>
                  <th className="min-w-[140px] text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={emp._id} className="hover:bg-gray-50">
                    <td>{index + 1}</td>
                    <td>{emp._id}</td>
                    <td>{emp.name || "-"}</td>
                    <td>{emp.pf || "-"}</td>
                    <td>{emp.designation || "-"}</td>
                    <td>{emp.department || "-"}</td>
                    <td>{emp.organization || "-"}</td>
                    <td>{emp.email || "-"}</td>
                    <td>{emp.phone || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          emp.status === "Active"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {emp.status || "-"}
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
      )}
    </div>
  );
};

export default EmployeeList;
