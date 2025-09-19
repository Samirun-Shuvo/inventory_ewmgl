'use client';
import React from 'react';

export default function SummaryCard({ count, label, bgColor, textColor }) {
  return (
    <div className={`${bgColor} p-6 rounded-xl shadow-lg text-center transition transform hover:-translate-y-1 hover:shadow-2xl`}>
      <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
      <p className="text-gray-700 mt-1">{label}</p>
    </div>
  );
}
