"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ViewProduct = () => {
  const searchParams = useSearchParams();
  const productStr = searchParams.get("product");
  const productDetails = productStr ? JSON.parse(productStr) : null;

  if (!productStr) {
    return <p>No product data found.</p>;
  }

  const {
    brand,
    model,
    product_type,
    type,
    serial_number,
    service_tag,
    processor,
    ram,
    hdd,
    ssd,
    generation,
    display_size,
    organization,
    status,
    createdAt,
  } = productDetails;

  return (
  <div className="card w-full max-w-4xl bg-white shadow-md border border-gray-200 mx-auto mt-10">
  <div className="card-body px-6 py-8">
    <h2 className="text-2xl font-bold text-blue-600 mb-6">Product Details</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <p>
        <span className="font-semibold">Product Type:</span> {product_type || "-"}
      </p>
      <p>
        <span className="font-semibold">Type:</span> {type || "-"}
      </p>
      <p>
        <span className="font-semibold">Brand:</span> {brand || "-"}
      </p>
      <p>
        <span className="font-semibold">Model:</span> {model || "-"}
      </p>
      <p>
        <span className="font-semibold">Processor:</span> {processor || "-"}
      </p>
      <p>
        <span className="font-semibold">Generation:</span> {generation || "-"}
      </p>
      <p>
        <span className="font-semibold">RAM:</span> {ram || "-"}
      </p>
      <p>
        <span className="font-semibold">HDD:</span> {hdd || "-"}
      </p>
      <p>
        <span className="font-semibold">SSD:</span> {ssd || "-"}
      </p>
      <p>
        <span className="font-semibold">Display Size:</span> {display_size || "-"}
      </p>
      <p>
        <span className="font-semibold">Serial Number:</span> {serial_number || "-"}
      </p>
      <p>
        <span className="font-semibold">Service Tag:</span> {service_tag || "-"}
      </p>
      <p>
        <span className="font-semibold">Organization:</span> {organization || "-"}
      </p>
      <p>
        <span className="font-semibold">Status:</span>{" "}
        <span
          className={`inline-block px-2 py-1 text-sm rounded ${
            status?.toLowerCase() === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status || "-"}
        </span>
      </p>
      <p>
        <span className="font-semibold">Created At:</span>{" "}
        {createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
      </p>
    </div>
  </div>
</div>

  );
};

export default ViewProduct;
