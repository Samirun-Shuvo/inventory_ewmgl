'use client';

import { useState } from "react";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <Sidebar className="relative z-50 w-64 bg-gray-800 h-full" />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="">
          <div className="">
            <BackButton />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
