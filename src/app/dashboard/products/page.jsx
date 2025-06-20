"use client";

import Heading from "@/components/Heading";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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

  const handleView = (id) => {
    console.log("View product", id);
  };

  const handleEdit = (id) => {
    console.log("Edit product", id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (res.ok) {
          toast.success("Product deleted successfully!");
          setProducts((prev) => prev.filter((prod) => prod._id !== id));
        } else {
          toast.error(data.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("An error occurred while deleting.");
      }
    }
  };

  // 🔍 Filter products based on searchTerm
  const filteredProducts = products.filter((product) => {
    const lower = searchTerm.toLowerCase();
    return (
      product._id?.toLowerCase().includes(lower) ||
      product.product_type?.toLowerCase().includes(lower) ||
      product.organization?.toLowerCase().includes(lower) ||
      product.brand?.toLowerCase().includes(lower) ||
      product.model?.toLowerCase().includes(lower) ||
      product.processor?.toLowerCase().includes(lower) ||
      product.generation?.toLowerCase().includes(lower) ||
      product.ssd?.toLowerCase().includes(lower) ||
      product.hdd?.toLowerCase().includes(lower) ||
      product.ram?.toLowerCase().includes(lower) ||
      product.service_tag?.toLowerCase().includes(lower) ||
      product.serial_number?.toLowerCase().includes(lower) ||
      product.display_size?.toLowerCase().includes(lower) ||
      product.type?.toLowerCase().includes(lower) ||
      product.status?.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Heading title="Product List" length={filteredProducts.length} />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-600">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center py-8 text-gray-600">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead className="bg-[#e9d8d8] text-center">
              <tr>
                <th>#</th>
                <th>Product ID</th>
                <th>Product Type</th>
                <th>Organization</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Processor</th>
                <th>Generation</th>
                <th>SSD</th>
                <th>HDD</th>
                <th>Ram</th>
                <th>Service Tag</th>
                <th>Serial Number</th>
                <th>Display Size</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product._id || "-"}</td>
                  <td>{product.product_type || "-"}</td>
                  <td>{product.organization || "-"}</td>
                  <td>{product.brand || "-"}</td>
                  <td>{product.model || "-"}</td>
                  <td>{product.processor || "-"}</td>
                  <td>{product.generation || "-"}</td>
                  <td>{product.ssd || "-"}</td>
                  <td>{product.hdd || "-"}</td>
                  <td>{product.ram || "-"}</td>
                  <td>{product.service_tag || "-"}</td>
                  <td>{product.serial_number || "-"}</td>
                  <td>{product.display_size || "-"}</td>
                  <td>{product.type || "-"}</td>
                  <td>
                    <span
                      className={`badge ${
                        product.status?.toLowerCase() === "active"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {product.status}
                    </span>
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
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
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
