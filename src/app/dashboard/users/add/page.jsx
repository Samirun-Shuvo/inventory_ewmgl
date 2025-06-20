"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import toast from "react-hot-toast";

const AddUser = () => {
  const [pf, setPf] = useState("");
  const [employee, setEmployee] = useState(null);
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeError, setEmployeeError] = useState("");
  const [productError, setProductError] = useState("");

  const handleSearchEmployee = async () => {
    setLoading(true);
    setEmployeeError("");
    try {
      const response = await fetch(`/api/employees/${pf}`);
      if (!response.ok) throw new Error("Employee not found");

      const result = await response.json();
      setEmployee(result);
      setProduct(null);
      toast.success("Employee found!");
    } catch (error) {
      setEmployeeError("Employee not found.");
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchProduct = async () => {
    setLoading(true);
    setProductError("");
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("Product not found");

      const result = await response.json();
      setProduct(result);
      toast.success("Product found!");
    } catch (error) {
      setProductError("Product not found.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {

    // ✅ Check both statuses
    if (employee.status !== "Active") {
      toast.error("Cannot assign product. Employee is not active.");
      return;
    }

    if (product.status !== "Active") {
      toast.error("Cannot assign product. Product is not active.");
      return;
    }

    const data = {
      employeeId: employee._id,
      employeePf: employee.pf,
      employeeName: employee.name,
      employeeEmail: employee.email,
      employeePhone: employee.phone,
      employeeDepartment: employee.department,
      employeeDesignation: employee.designation,
      employeeOrganization: employee.organization,

      productId: product._id,
      productType: product.product_type || "",
      productModel: product.model || "",
      productSerial: product.serial_number || "",
      productServiceTag: product.service_tag || "",
      productOrganization: product.organization || "",
      productStatus: product.status || "",
      productProcessor: product.processor || "",
      productRam: product.ram || "",
      productHdd: product.hdd || "",
      productSsd: product.ssd || "",
      productGeneration: product.generation || "",
      productDisplaySize: product.display_size || "",
      productTypeDetail: product.type || "",
      status: "Active",
      assignedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        const errorData = await response.json();
        toast.error(errorData.message || "Product already assigned.");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      toast.success("Product assigned successfully!");
      setPf("");
      setId("");
      setEmployee(null);
      setProduct(null);
    } catch (error) {
      toast.error("Failed to assign product. Please try again.");
      console.error("Error submitting user:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8">
      <Heading title="Product Assign To Employee" />

      {/* PF Search */}
      <div className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="pf" className="text-sm font-medium text-gray-700 mb-1">
            Employee Search by PF Number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="pf"
            value={pf}
            onChange={(e) => setPf(e.target.value)}
            className={`block w-full rounded-md border px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              employeeError ? "border-red-500 ring-red-500" : "border-gray-300"
            }`}
            placeholder="Enter PF Number"
          />
          {employeeError && (
            <p className="text-sm text-red-600">{employeeError}</p>
          )}
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleSearchEmployee}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {loading ? "Searching..." : "Search Employee"}
        </button>
      </div>

      {/* Employee Details */}
      {employee && (
        <>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Name:</strong> {employee.name}</div>
              <div><strong>PF Number:</strong> {employee.pf}</div>
              <div><strong>Email:</strong> {employee.email}</div>
              <div><strong>Phone:</strong> {employee.phone}</div>
              <div><strong>Department:</strong> {employee.department}</div>
              <div><strong>Designation:</strong> {employee.designation}</div>
              <div><strong>Organization:</strong> {employee.organization}</div>
              <div><strong>Status:</strong> {employee.status}</div>
            </div>
          </div>

          {/* Product Search */}
          <div className="space-y-6 mt-10">
            <div className="flex flex-col">
              <label htmlFor="id" className="text-sm font-medium text-gray-700 mb-1">
                Product Search By ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className={`block w-full rounded-md border px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  productError ? "border-red-500 ring-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Product ID"
              />
              {productError && (
                <p className="text-sm text-red-600">{productError}</p>
              )}
            </div>

            <button
              type="button"
              disabled={loading || !employee}
              onClick={handleSearchProduct}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              {loading ? "Searching..." : "Search Product"}
            </button>
          </div>
        </>
      )}

      {/* Product Details & Submit */}
      {product && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">📦 Product Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div><strong>Product Type:</strong> {product.product_type || "N/A"}</div>
            <div><strong>Brand:</strong> {product.brand || "N/A"}</div>
            <div><strong>Model:</strong> {product.model || "N/A"}</div>
            <div><strong>Serial Number:</strong> {product.serial_number || "N/A"}</div>
            <div><strong>Service Tag:</strong> {product.service_tag || "N/A"}</div>
            <div><strong>Display Size:</strong> {product.display_size || "N/A"}</div>
            <div><strong>Processor:</strong> {product.processor || "N/A"}</div>
            <div><strong>RAM:</strong> {product.ram || "N/A"}</div>
            <div><strong>HDD:</strong> {product.hdd || "N/A"}</div>
            <div><strong>SSD:</strong> {product.ssd || "N/A"}</div>
            <div><strong>Generation:</strong> {product.generation || "N/A"}</div>
            <div><strong>Organization:</strong> {product.organization || "N/A"}</div>
            <div><strong>Status:</strong> {product.status || "N/A"}</div>
          </div>

          <div className="py-5">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-semibold tracking-wide transition duration-300 ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            >
              {isSubmitting ? "Assigning..." : "Product Assign To Employee"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
