"use client";

import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Search, Plus, Package } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { filterBySearch } from "@/utils/filter";
import { handleDelete } from "@/utils/handleDelete";
import { getProductStatusStyles } from "@/utils/getStatusDesign";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
      Fetch Products
  ========================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
      Search filter
  ========================= */
  const filteredProducts = filterBySearch(products, searchTerm, [
    "_id",
    "product_type",
    "organization",
    "brand",
    "model",
    "processor",
    "generation",
    "ssd",
    "hdd",
    "ram",
    "service_tag",
    "serial_number",
    "display_size",
    "type",
    "status",
  ]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Products
          </h2>
          <p className="text-sm text-gray-500">
            Managing {filteredProducts.length} total inventory items
          </p>
        </div>
        <Link
          href="/dashboard/products/add"
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by ID, Brand, SN or Type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        {loading ? (
          <div className="p-10 text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center text-gray-500 italic">
            No products found matching your search.
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 font-semibold">
              <tr>
                <th className="w-12">#</th>
                <th>Product Info</th>
                <th>Brand & Model</th>
                <th>Identifiers</th>
                <th>Organization</th>
                <th>Date Added</th>
                <th>User Information</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product._id} className="hover transition-colors">
                  <td className="text-xs opacity-50 font-mono">{index + 1}</td>

                  {/* Product Type Icon & ID */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-bold">
                          {product.product_type || "N/A"}
                        </div>
                        <div className="text-[10px] font-mono opacity-50">
                          {product._id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-sm">
                    <div className="font-medium text-gray-700">
                      {product.brand || "-"}
                    </div>
                    <div className="text-xs opacity-60">
                      {product.model || "-"}
                    </div>
                  </td>

                  <td className="text-sm">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-400 uppercase font-semibold">
                        S/N:
                      </span>
                      <span>{product.serial_number || "-"}</span>
                      <span className="text-[11px] text-gray-400 uppercase font-semibold mt-1">
                        Tag:
                      </span>
                      <span>{product.service_tag || "-"}</span>
                    </div>
                  </td>

                  <td className="text-sm">
                    <div className="font-medium">
                      {product.organization || "-"}
                    </div>
                    <div className="text-xs opacity-60">
                      {product.department || "-"}
                    </div>
                  </td>

                  <td className="text-sm">{formatDate(product.createdAt)}</td>
                  <td className="text-sm">{product.user_information || "-"}</td>
                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge badge-sm font-semibold capitalize ${getProductStatusStyles(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td>
                    <div className="flex justify-center gap-1">
                      <Link
                        href={`/dashboard/products/view/${product._id}`}
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="View Details"
                      >
                        <Eye size={18} className="text-info" />
                      </Link>

                      <Link
                        href={`/dashboard/products/edit/${product._id}`}
                        className="btn btn-square btn-ghost btn-sm tooltip"
                        data-tip="Edit Product"
                      >
                        <Pencil size={18} className="text-warning" />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete({
                            id: product._id,
                            resource: "products",
                            setState: setProducts,
                            itemName: "product",
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

export default ProductList;
