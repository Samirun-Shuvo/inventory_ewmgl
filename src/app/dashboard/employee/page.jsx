"use client";

import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Search, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { filterBySearch } from "@/utils/filter";
import { handleDelete } from "@/utils/handleDelete";
import { getEmployeeStatusColor } from "@/utils/getStatusDesign";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
      Fetch Employees
  ========================= */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employees");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  /* =========================
      Search filter
  ========================= */
  const filteredEmployees = filterBySearch(employees, searchTerm, [
    "name",
    "email",
    "designation",
    "department",
    "phone",
    "employee_id",
    "status",
  ]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Employees
          </h2>
          <p className="text-sm text-gray-500">
            Managing {filteredEmployees.length} total employees
          </p>
        </div>
        <Link
          href="/dashboard/employee/add"
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Employee
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, email, ID or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        {loading ? (
          <div className="p-10 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="p-10 text-center text-gray-500 italic">
            No employees found matching your search.
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 font-semibold">
              <tr>
                <th>Employee</th>
                <th>Designation</th>
                <th>Organization</th>
                <th>Department</th>
                <th>Extention</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp._id} className="hover transition-colors">
                  {/* Name & Avatar Column */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-gray-100">
                          <img
                            src={`https://ui-avatars.com/api/?name=${emp.name}&background=random&color=fff`}
                            alt={emp.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{emp.name}</div>
                        <div className="text-xs opacity-60">
                          PF_NO: {emp.pf || "N/A"}
                        </div>
                        <div className="text-[11px] opacity-40">
                          {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-sm font-medium">
                    {emp.designation || "-"}
                  </td>
                  <td className="text-sm">{emp.organization || "-"}</td>
                  <td className="text-sm">{emp.department || "-"}</td>
                  <td className="text-sm">{emp.ip_extention_no || "-"}</td>
                  <td className="text-sm">{emp.phone || "-"}</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge badge-sm font-semibold capitalize ${getEmployeeStatusColor(emp.status)}`}
                    >
                      {emp.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td>
                    <div className="flex justify-center gap-1">
                      <Link
                        href={`/dashboard/employee/view/${emp._id}`}
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="View Details"
                      >
                        <Eye size={18} className="text-info" />
                      </Link>
                      <Link
                        href={`/dashboard/employee/edit/${emp._id}`}
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="Edit Employee"
                      >
                        <Pencil size={18} className="text-warning" />
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete({
                            id: emp._id,
                            resource: "employees",
                            setState: setEmployees,
                            itemName: "employee",
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

export default EmployeeList;
