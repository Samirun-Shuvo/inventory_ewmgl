"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ViewEmployeeInner = () => {
  const searchParams = useSearchParams();
  const empStr = searchParams.get("emp");
  const emp = empStr ? JSON.parse(empStr) : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!emp) {
    return <p className="text-center text-red-500 mt-10">No employee data found.</p>;
  }

  return (
    <div className="card w-full max-w-7xl bg-white shadow-md border border-gray-200 mx-auto mt-10">
      <div className="card-body px-6 py-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Employee Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold">Name:</span> {emp.name || "-"}</p>
          <p><span className="font-semibold">PF Number:</span> {emp.pf || "-"}</p>
          <p><span className="font-semibold">Organization:</span> {emp.organization || "-"}</p>
          <p><span className="font-semibold">Department:</span> {emp.department || "-"}</p>
          <p><span className="font-semibold">Designation:</span> {emp.designation || "-"}</p>
          <p><span className="font-semibold">Email:</span> {emp.email || "-"}</p>
          <p><span className="font-semibold">Phone:</span> {emp.phone || "-"}</p>
          <p><span className="font-semibold">IP Extension No:</span> {emp.ip_extention_no || "-"}</p>
          <p><span className="font-semibold">Date of Birth:</span> {formatDate(emp.dob)}</p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`inline-block px-2 py-1 text-sm rounded ${
                emp.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {emp.status || "-"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const ViewEmployee = () => {
  return (
    <Suspense fallback={<div>Loading employee details...</div>}>
      <ViewEmployeeInner />
    </Suspense>
  );
};

export default ViewEmployee;
