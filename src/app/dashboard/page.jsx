'use client';
import React from 'react';
import {
  organizations,
  departments,
  designations,
  productTypes,
} from "@/constants/selectOptions"; // Adjust path as needed
import SummaryCard from '@/components/Dashboard/summary/SummaryCard';
import StockBarChart from '@/components/Dashboard/barChart/StockBarChart';

const employeeCount = designations.length * 10; // Mock employee count

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900">Welcome to EWMGL Inventory</h2>
        <p className="text-gray-600 text-sm sm:text-base">Here is your dashboard overview.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <SummaryCard count={organizations.length} label="Companies" bgColor="bg-indigo-100" textColor="text-indigo-700" />
        <SummaryCard count={employeeCount} label="Employees" bgColor="bg-green-100" textColor="text-green-700" />
        <SummaryCard count={departments.length} label="Departments" bgColor="bg-yellow-100" textColor="text-yellow-700" />
        <SummaryCard count={productTypes.length} label="Product Types" bgColor="bg-pink-100" textColor="text-pink-700" />
      </div>

      {/* Stock Bar Chart */}
      <StockBarChart />
    </div>
  );
}
