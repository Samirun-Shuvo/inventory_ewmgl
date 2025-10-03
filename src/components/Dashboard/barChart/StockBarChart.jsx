'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const barData = [
  { name: 'Jan', stock: 400 },
  { name: 'Feb', stock: 300 },
  { name: 'Mar', stock: 500 },
  { name: 'Apr', stock: 200 },
  { name: 'May', stock: 600 },
];

export default function StockBarChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Monthly Stock Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 12 }} />
          <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px', border: 'none' }}
            itemStyle={{ color: '#1f2937' }}
          />
          <Bar dataKey="stock" fill="#6366f1" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="stock" position="top" fill="#111827" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
