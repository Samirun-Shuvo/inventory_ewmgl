"use client";

import React, { useEffect, useState } from "react";
import { departments } from "@/constants/selectOptions";
import SummaryCard from "@/components/Dashboard/summary/SummaryCard";
import StockBarChart from "@/components/Dashboard/barChart/StockBarChart";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  // Use a single object for stats to keep state clean
  const [stats, setStats] = useState({
    organizations: 0,
    employees: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch the unified dashboard stats
        const res = await fetch(`/api/dashboard`);
        if (!res.ok) throw new Error("Failed to fetch dashboard statistics");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        toast.error("Could not sync real-time statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">
            Analyzing Inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900 tracking-tight">
            Welcome to EWMGL Inventory
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            System overview and live asset tracking.
          </p>
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          Live Update: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <SummaryCard
          count={stats.organizations}
          label="Organizations"
          bgColor="bg-indigo-50 border border-indigo-100"
          textColor="text-indigo-700"
        />
        <SummaryCard
          count={stats.employees}
          label="Total Employees"
          bgColor="bg-emerald-50 border border-emerald-100"
          textColor="text-emerald-700"
        />
        <SummaryCard
          count={stats.products}
          label="Total Assets"
          bgColor="bg-amber-50 border border-amber-100"
          textColor="text-amber-700"
        />
        <SummaryCard
          count={departments.length}
          label="Departments"
          bgColor="bg-rose-50 border border-rose-100"
          textColor="text-rose-700"
        />
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Stock Analysis</h3>
            <p className="text-sm text-gray-500">
              Inventory distribution by category
            </p>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <div className="min-h-[300px]">
          <StockBarChart />
        </div>
      </div>
    </div>
  );
}
