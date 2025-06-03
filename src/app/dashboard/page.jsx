'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const barData = [
  { name: 'Jan', stock: 400 },
  { name: 'Feb', stock: 300 },
  { name: 'Mar', stock: 500 },
  { name: 'Apr', stock: 200 },
  { name: 'May', stock: 600 },
];

const pieData = [
  { name: 'Electronics', value: 40 },
  { name: 'Furniture', value: 25 },
  { name: 'Clothing', value: 20 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  return (
    <div className="bg-white p-6 rounded shadow space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-2">Welcome to EWMGL Inventory</h2>
        <p className="text-gray-600">Here is your dashboard overview.</p>
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
