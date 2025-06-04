"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import toast from "react-hot-toast";

const AddUser = () => {
  const [pf, setPf] = useState("");
  const [employee, setEmployee] = useState(null);

  const [serviceTag, setServiceTag] = useState("");
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(serviceTag);

  const handleSearchEmployee = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/employees/${pf}`);
      if (!response.ok) throw new Error("Employee not found");

      const result = await response.json();
      setEmployee(result);
      setProduct(null); // Reset previous product
    } catch (error) {
      setError("Employee not found.");
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/products/${serviceTag}`);
      if (!response.ok) throw new Error("Product not found");
      const result = await response.json();
      setProduct(result);
    } catch (error) {
      setError("Product not found.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };
  console.log(product);

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
      <Heading title="Product Assign To Employee" />

      {/* 🔍 Search by PF */}
      <div className="space-y-6">
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="pf"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Employee Search by PF Number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="pf"
            value={pf}
            onChange={(e) => setPf(e.target.value)}
            className={`block w-full rounded-md border px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              error ? "border-red-500 ring-red-500" : "border-gray-300"
            }`}
            placeholder="Enter PF Number"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleSearchEmployee}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Searching..." : "Search Employee"}
        </button>
      </div>

      {/* 👤 Employee details */}
      {employee && (
        <>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Employee Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <strong>Name:</strong> {employee.name}
              </div>
              <div>
                <strong>PF Number:</strong> {employee.pf}
              </div>
              <div>
                <strong>Email:</strong> {employee.email}
              </div>
              <div>
                <strong>Phone:</strong> {employee.phone}
              </div>
              <div>
                <strong>Department:</strong> {employee.department}
              </div>
              <div>
                <strong>Designation:</strong> {employee.designation}
              </div>
              <div>
                <strong>Organization:</strong> {employee.organization}
              </div>
              <div>
                <strong>Status:</strong> {employee.status}
              </div>
            </div>
          </div>

          {/* 🔍 Search by Service Tag */}
          <div className="space-y-6 mt-10">
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="service_tag"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Product Search By Service Tag{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="service_tag"
                value={serviceTag}
                onChange={(e) => setServiceTag(e.target.value)}
                className={`block w-full rounded-md border px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  error ? "border-red-500 ring-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Service Tag"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleSearchProduct}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? "Searching..." : "Search Product"}
            </button>
          </div>
        </>
      )}

      {product && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📦 Product Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <strong>Product Type:</strong> {product.product_type || "N/A"}
            </div>
            <div>
              <strong>Brand:</strong> {product.brand || "N/A"}
            </div>
            <div>
              <strong>Model:</strong> {product.model || "N/A"}
            </div>
            <div>
              <strong>Serial Number:</strong> {product.serial_number || "N/A"}
            </div>
            <div>
              <strong>Service Tag:</strong> {product.service_tag || "N/A"}
            </div>
            <div>
              <strong>Display Size:</strong> {product.display_size || "N/A"}
            </div>
            <div>
              <strong>Processor:</strong> {product.processor || "N/A"}
            </div>
            <div>
              <strong>RAM:</strong> {product.ram || "N/A"}
            </div>
            <div>
              <strong>HDD:</strong> {product.hdd || "N/A"}
            </div>
            <div>
              <strong>SSD:</strong> {product.ssd || "N/A"}
            </div>
            <div>
              <strong>Generation:</strong> {product.generation || "N/A"}
            </div>
            <div>
              <strong>Organization:</strong> {product.organization || "N/A"}
            </div>
            <div>
              <strong>Status:</strong> {product.status || "N/A"}
            </div>
            <div>
              <strong>Created At:</strong>{" "}
              {product.createdAt
                ? new Date(product.createdAt).toLocaleString()
                : "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
