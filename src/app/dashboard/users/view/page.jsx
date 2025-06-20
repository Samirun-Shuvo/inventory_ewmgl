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
    <div class="card w-full max-w-6xl bg-base-100 shadow-sm mx-auto mt-10">
      <div class="card-body">
        <h2 class="card-title text-primary text-2xl font-bold">User Details</h2>

        <h2 class="text-lg font-bold mt-6">Employee Information</h2>

        <p>
          <span class="font-semibold">Name:</span> {employeeName}
        </p>
        <p>
          <span class="font-semibold">PF Number:</span> {employeePf}
        </p>
        <p>
          <span class="font-semibold">Email:</span> {employeeEmail}
        </p>
        <p>
          <span class="font-semibold">Phone:</span> {employeePhone}
        </p>
        <p>
          <span class="font-semibold">Department:</span> {employeeDepartment}
        </p>
        <p>
          <span class="font-semibold">Designation:</span> {employeeDesignation}
        </p>
        <p>
          <span class="font-semibold">Organization:</span>{" "}
          {employeeOrganization}
        </p>

        <h2 class="text-lg font-bold mt-6">Product Information</h2>
        <p>
          <span class="font-semibold">Product Type:</span> {productType}
        </p>
        <p>
          <span class="font-semibold">Product Type Detail:</span>{" "}
          {productTypeDetail}
        </p>
        <p>
          <span class="font-semibold">Model:</span> {productModel}
        </p>
        <p>
          <span class="font-semibold">Serial Number:</span> {productSerial}
        </p>
        <p>
          <span class="font-semibold">Service Tag:</span> {productServiceTag}
        </p>
        <p>
          <span class="font-semibold">Processor:</span> {productProcessor}
        </p>
        <p>
          <span class="font-semibold">RAM:</span> {productRam}
        </p>
        <p>
          <span class="font-semibold">HDD:</span> {productHdd}
        </p>
        <p>
          <span class="font-semibold">SSD:</span> {productSsd}
        </p>
        <p>
          <span class="font-semibold">Generation:</span> {productGeneration}
        </p>
        <p>
          <span class="font-semibold">Display Size:</span> {productDisplaySize}
        </p>
        <p>
          <span class="font-semibold">Organization:</span> {productOrganization}
        </p>
        <p>
          <span class="font-semibold">Status:</span> {productStatus}
        </p>

        <h2 class="text-lg font-bold mt-6">Meta Info</h2>
        <p>
          <span class="font-semibold">Status:</span> {status}
        </p>
        <p>
          <span class="font-semibold">Assigned At:</span> {assignedAt}
        </p>
        <p>
          <span class="font-semibold">Created At:</span> {createdAt}
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;
