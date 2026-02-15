"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Monitor,
  Cpu,
  HardDrive,
  Calendar,
  FileText,
  StickyNote,
  User, // Added
  Mail, // Added
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok)
          throw new Error("Product specifications could not be loaded.");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-400 font-medium animate-pulse">
          Syncing asset data...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto mt-10 md:mt-20 text-center p-6 md:p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Monitor className="text-red-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Asset Not Found</h3>
        <p className="text-gray-500 mt-2 mb-8">
          {error || "This ID does not exist in our inventory."}
        </p>
        <button
          onClick={() => router.back()}
          className="btn btn-primary w-full md:w-auto"
        >
          Return to List
        </button>
      </div>
    );
  }

  const specs = [
    {
      label: "Product Type",
      value: product.product_type,
      icon: <Monitor size={14} />,
    },
    { label: "Category", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model },
    { label: "Processor", value: product.processor, icon: <Cpu size={14} /> },
    { label: "Generation", value: product.generation },
    { label: "RAM", value: product.ram },
    {
      label: "Storage (HDD)",
      value: product.hdd,
      icon: <HardDrive size={14} />,
    },
    {
      label: "Storage (SSD)",
      value: product.ssd,
      icon: <HardDrive size={14} />,
    },
    { label: "Display Size", value: product.display_size },
    { label: "Serial Number", value: product.serial_number },
    { label: "Service Tag", value: product.service_tag },
    { label: "Organization", value: product.organization },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-4 md:mt-8 px-4 pb-12 md:pb-20">
      {/* Navigation Header */}
      <Link
        href="/dashboard/products"
        className="group inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-all mb-4 md:mb-6"
      >
        <ArrowLeft
          size={18}
          className="mr-2 group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Inventory</span>
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 w-full md:w-auto">
            <span className="text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
              Asset Profile
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight break-words">
              {product.brand}{" "}
              <span className="text-gray-400">{product.model}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-400 text-xs md:text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={14} />{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
              <span className="hidden xs:inline h-4 w-[1px] bg-gray-700"></span>
              <span className="break-all font-mono">
                SN: {product.serial_number || "N/A"}
              </span>
            </div>
          </div>
          <div className="md:scale-125 md:origin-right">
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* 1. User Assignment Section */}
        <div className="p-6 md:p-10 border-b border-gray-100 bg-blue-50/30">
          <h3 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-4 flex items-center gap-2">
            <User size={16} /> Current Assignment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">
                  User Information
                </p>
                <p className="text-base font-bold text-gray-800">
                  {product.user_information || ""}
                </p>
              </div>
            </div>
            {/* If you have a user email field, you can add it here too */}
          </div>
        </div>

        {/* 2. Hardware Technical Grid */}
        <div className="p-6 md:p-10">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Cpu size={16} /> Hardware Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {specs.map((item) => (
              <div key={item.label} className="flex flex-col group">
                <dt className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-1 md:mb-2 group-hover:text-blue-500 transition-colors">
                  {item.icon} {item.label}
                </dt>
                <dd className="text-sm md:text-base font-semibold text-gray-800 border-b border-gray-50 pb-2 break-words">
                  {item.value || "—"}
                </dd>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Descriptive Content Section */}
        <div className="border-t border-gray-100 bg-gray-50/50 p-6 md:p-10 space-y-8">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <FileText size={14} /> Extended Description
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 text-sm text-gray-700 leading-relaxed shadow-sm">
              {product.specifications ? (
                <p className="whitespace-pre-line">{product.specifications}</p>
              ) : (
                <p className="text-gray-400 italic">
                  No extended specifications provided.
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <StickyNote size={14} /> Administrative Notes
            </h3>
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 md:p-6 text-sm text-amber-900 leading-relaxed">
              {product.note ? (
                <p className="whitespace-pre-line font-medium">
                  {product.note}
                </p>
              ) : (
                <p className="text-amber-400/60 italic">
                  No administrative notes recorded.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewProduct = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Booting interface...
      </div>
    }
  >
    <ProductDetails />
  </Suspense>
);

export default ViewProduct;
