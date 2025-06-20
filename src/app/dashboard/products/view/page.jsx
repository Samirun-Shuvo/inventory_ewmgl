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
    <div className="card w-full max-w-6xl bg-base-100 shadow-sm mx-auto mt-10">
  <div className="card-body">
    <h2 className="card-title text-primary text-2xl font-bold">Product Details</h2>

    <p><span className="font-semibold">Brand:</span> {brand}</p>
    <p><span className="font-semibold">Model:</span> {model}</p>
    <p><span className="font-semibold">Product Type:</span> {product_type}</p>
    <p><span className="font-semibold">Type:</span> {type}</p>
    <p><span className="font-semibold">Serial Number:</span> {serial_number}</p>
    <p><span className="font-semibold">Service Tag:</span> {service_tag}</p>
    <p><span className="font-semibold">Processor:</span> {processor}</p>
    <p><span className="font-semibold">RAM:</span> {ram}</p>
    <p><span className="font-semibold">HDD:</span> {hdd}</p>
    <p><span className="font-semibold">SSD:</span> {ssd}</p>
    <p><span className="font-semibold">Generation:</span> {generation}</p>
    <p><span className="font-semibold">Display Size:</span> {display_size}</p>
    <p><span className="font-semibold">Organization:</span> {organization}</p>
    <p><span className="font-semibold">Status:</span> {status}</p>
    <p><span className="font-semibold">Created At:</span> {createdAt}</p>
  </div>
</div>

  );
};

export default ViewProduct;
