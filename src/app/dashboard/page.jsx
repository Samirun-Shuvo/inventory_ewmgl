'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  organizations,
  departments,
  designations,
  productTypes,
} from "@/constants/selectOptions"; // Adjust path as needed

const barData = [
  { name: 'Jan', stock: 400 },
  { name: 'Feb', stock: 300 },
  { name: 'Mar', stock: 500 },
  { name: 'Apr', stock: 200 },
  { name: 'May', stock: 600 },
];

// Mock employee count based on designations
const employeeCount = designations.length * 10; // Assume 10 per designation

export default function DashboardPage() {
  return (
    <div className="bg-white p-6 rounded shadow space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Welcome to EWMGL Inventory</h2>
        <p className="text-gray-600">Here is your dashboard overview.</p>
      </div>

      {/* Static Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-100 p-4 rounded shadow text-center">
          <p className="text-lg font-bold text-indigo-700">{organizations.length}</p>
          <p className="text-gray-700">Companies</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-lg font-bold text-green-700">{employeeCount}</p>
          <p className="text-gray-700">Employees</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-lg font-bold text-yellow-700">{departments.length}</p>
          <p className="text-gray-700">Departments</p>
        </div>
        <div className="bg-pink-100 p-4 rounded shadow text-center">
          <p className="text-lg font-bold text-pink-700">{productTypes.length}</p>
          <p className="text-gray-700">Product Types</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Monthly Stock Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
