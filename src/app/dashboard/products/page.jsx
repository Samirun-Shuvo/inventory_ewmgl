"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products"); // Adjust this if needed
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
    // Add view logic here
  };

  const handleEdit = (id) => {
    console.log("Edit product", id);
    // Add edit logic here
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

  if (loading)
    return (
      <p className="text-center py-8 text-gray-600">Loading products...</p>
    );

  if (!products.length)
    return <p className="text-center py-8 text-gray-600">No products found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Product List ({products.length})
      </h1>

      <div className="overflow-x-auto border border-gray-200 shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-[#d8e0ec] text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="border p-3">#</th>
              <th className="border p-3">Product Type</th>
              <th className="border p-3">Organization</th>
              <th className="border p-3">Brand</th>
              <th className="border p-3">Model</th>
              <th className="border p-3">Processor</th>
              <th className="border p-3">Generation</th>
              <th className="border p-3">SSD</th>
              <th className="border p-3">HDD</th>
              <th className="border p-3">Ram</th>
              <th className="border p-3">Service Tag</th>
              <th className="border p-3">Serial Number</th>
              <th className="border p-3">Display Size</th>
              <th className="border p-3">Type</th>
              <th className="border p-3">Status</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="border p-3">{index + 1}</td>
                <td className="border p-3">{product.product_type || "-"}</td>
                <td className="border p-3">{product.organization || "-"}</td>
                <td className="border p-3">{product.brand || "-"}</td>
                <td className="border p-3">{product.model || "-"}</td>
                <td className="border p-3">{product.processor || "-"}</td>
                <td className="border p-3">{product.generation || "-"}</td>
                <td className="border p-3">{product.ssd || "-"}</td>
                <td className="border p-3">{product.hdd || "-"}</td>
                <td className="border p-3">{product.ram || "-"}</td>
                <td className="border p-3">{product.service_tag || "-"}</td>
                <td className="border p-3">{product.serial_number || "-"}</td>
                <td className="border p-3">{product.display_size || "-"}</td>
                <td className="border p-3">{product.type || "-"}</td>

                <td className="border p-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="border p-3 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleView(product._id)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
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
    </div>
  );
};

export default ProductList;
