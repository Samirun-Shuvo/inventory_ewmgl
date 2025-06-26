"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ViewProduct = () => {
  const searchParams = useSearchParams();
  const userStr = searchParams.get("user");
  const userDetails = userStr ? JSON.parse(userStr) : null;

  if (!userDetails) {
    return <p>No user data found.</p>;
  }

  const {
    employeeName,
    employeePf,
    employeeEmail,
    employeePhone,
    employeeDepartment,
    employeeDesignation,
    employeeOrganization,

    productType,
    productTypeDetail,
    productModel,
    productSerial,
    productServiceTag,
    productProcessor,
    productRam,
    productHdd,
    productSsd,
    productGeneration,
    productDisplaySize,
    productOrganization,
    productStatus,

    status,
    assignedAt,
    createdAt,
  } = userDetails;

  return (
    <div className="card w-full max-w-6xl bg-white shadow-md border border-gray-200 mx-auto mt-10">
  <div className="card-body px-6 py-8">
    <h2 className="text-2xl font-bold text-blue-600 mb-6">User Details</h2>

    {/* Employee Info */}
    <h3 className="text-lg font-bold text-gray-800 mb-2">Employee Information</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <p><span className="font-semibold">Name:</span> {employeeName || "-"}</p>
      <p><span className="font-semibold">PF Number:</span> {employeePf || "-"}</p>
      <p><span className="font-semibold">Email:</span> {employeeEmail || "-"}</p>
      <p><span className="font-semibold">Phone:</span> {employeePhone || "-"}</p>
      <p><span className="font-semibold">Department:</span> {employeeDepartment || "-"}</p>
      <p><span className="font-semibold">Designation:</span> {employeeDesignation || "-"}</p>
      <p><span className="font-semibold">Organization:</span> {employeeOrganization || "-"}</p>
    </div>

    {/* Product Info */}
    <h3 className="text-lg font-bold text-gray-800 mt-8 mb-2">Product Information</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <p><span className="font-semibold">Product Type:</span> {productType || "-"}</p>
      <p><span className="font-semibold">Type Detail:</span> {productTypeDetail || "-"}</p>
      <p><span className="font-semibold">Model:</span> {productModel || "-"}</p>
      <p><span className="font-semibold">Serial Number:</span> {productSerial || "-"}</p>
      <p><span className="font-semibold">Service Tag:</span> {productServiceTag || "-"}</p>
      <p><span className="font-semibold">Processor:</span> {productProcessor || "-"}</p>
      <p><span className="font-semibold">RAM:</span> {productRam || "-"}</p>
      <p><span className="font-semibold">HDD:</span> {productHdd || "-"}</p>
      <p><span className="font-semibold">SSD:</span> {productSsd || "-"}</p>
      <p><span className="font-semibold">Generation:</span> {productGeneration || "-"}</p>
      <p><span className="font-semibold">Display Size:</span> {productDisplaySize || "-"}</p>
      <p><span className="font-semibold">Product Org:</span> {productOrganization || "-"}</p>
      <p><span className="font-semibold">Product Status:</span> {productStatus || "-"}</p>
    </div>

    {/* Meta Info */}
    <h3 className="text-lg font-bold text-gray-800 mt-8 mb-2">Meta Info</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <p>
        <span className="font-semibold">Status:</span>{" "}
        <span className={`inline-block px-2 py-1 text-sm rounded ${status?.toLowerCase() === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
          {status || "-"}
        </span>
      </p>
      <p><span className="font-semibold">Assigned At:</span> {assignedAt ? new Date(assignedAt).toLocaleDateString() : "-"}</p>
      <p><span className="font-semibold">Created At:</span> {createdAt ? new Date(createdAt).toLocaleDateString() : "-"}</p>
    </div>
  </div>
</div>

  );
};

export default ViewProduct;
