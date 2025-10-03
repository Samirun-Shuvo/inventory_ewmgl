"use client";

import Heading from "@/components/Heading";
import StatusBadge from "@/components/StatusBadge";
import { filterBySearch } from "@/utils/filter";
import { handleDelete } from "@/utils/handleDelete";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleEdit = (id) => {
    console.log("Edit product", id);
  };

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
    <div>
      <Heading title="Product List" length={filteredProducts.length} />

      {/* Search */}

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          href="/dashboard/products/add"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center py-8 text-gray-600">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center py-8 text-gray-600">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-xs w-full text-center">
            <thead className="bg-[#e9d8d8]">
              <tr>
                <th className="min-w-[40px]">#</th>
                <th className="min-w-[180px]">Product ID</th>
                <th className="min-w-[120px]">Product Type</th>
                <th className="min-w-[200px]">Organization</th>
                <th className="min-w-[180px]">Brand</th>
                <th className="min-w-[130px]">Service Tag</th>
                <th className="min-w-[130px]">Serial Number</th>
                <th className="min-w-[130px]">Stored Date</th>
                <th className="min-w-[150px]">Status</th>
                <th className="min-w-[120px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product._id || `${product.serial_number}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{product._id || "-"}</td>
                  <td>{product.product_type || "-"}</td>
                  <td>{product.organization || "-"}</td>
                  <td>{product.brand || "-"}</td>
                  <td>{product.service_tag || "-"}</td>
                  <td>{product.serial_number || "-"}</td>
                  <td>{formatDate(product.createdAt)}</td>
                  <td>
                    <StatusBadge status={product?.status} />
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={{
                          pathname: "/dashboard/products/view",
                          query: { product: JSON.stringify(product) },
                        }}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={{
                          pathname: "/dashboard/products/edit",
                          query: { product: JSON.stringify(product) },
                        }}
                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={18} />
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

export default ProductList;
