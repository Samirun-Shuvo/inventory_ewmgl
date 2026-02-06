'use client';

import React, { useEffect, useState } from 'react';
import { departments, designations, productTypes } from "@/constants/selectOptions";
import SummaryCard from '@/components/Dashboard/summary/SummaryCard';
import StockBarChart from '@/components/Dashboard/barChart/StockBarChart';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [orgCount, setOrgCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock employee count calculation
  const employeeCount = designations.length * 10;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetching all organizations to get the length
        const res = await fetch(`/api/organizations`);
        if (!res.ok) throw new Error("Failed to fetch statistics");
        const data = await res.json();
        
        // If data is an array, set the count
        setOrgCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900">
          Welcome to EWMGL Inventory
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Here is your dashboard overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <SummaryCard 
          count={orgCount} 
          label="Companies" 
          bgColor="bg-indigo-100" 
          textColor="text-indigo-700" 
        />
        <SummaryCard 
          count={employeeCount} 
          label="Employees" 
          bgColor="bg-green-100" 
          textColor="text-green-700" 
        />
        <SummaryCard 
          count={departments.length} 
          label="Departments" 
          bgColor="bg-yellow-100" 
          textColor="text-yellow-700" 
        />
        <SummaryCard 
          count={productTypes.length} 
          label="Product Types" 
          bgColor="bg-pink-100" 
          textColor="text-pink-700" 
        />
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6">Stock Analysis</h3>
        <StockBarChart />
      </div>
    </div>
  );
}