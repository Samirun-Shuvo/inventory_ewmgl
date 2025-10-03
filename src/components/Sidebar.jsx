"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { navItems } from "@/constants/navItems";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 px-4 py-3 shadow-md flex items-center justify-between z-50">
        <h2 className="text-lg font-semibold text-white tracking-wide">
          EWMGL
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-gray-200 hover:text-white transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 shadow-lg px-6 py-5 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Link href="/dashboard" className="block">
          <h2 className="text-2xl font-bold text-white mb-10 tracking-tight cursor-pointer hover:text-blue-400 transition-colors">
            EWMGL Inventory
          </h2>
        </Link>

        <nav className="space-y-2" aria-label="Main menu">
          {navItems.map((item) => (
            <div key={item.name}>
              {!item.submenu ? (
                <Link
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-blue-600 transition-colors focus:outline-none"
                    aria-expanded={openSubmenu === item.name}
                    aria-controls={`${item.name}-submenu`}
                  >
                    <span>{item.name}</span>
                    {openSubmenu === item.name ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  {openSubmenu === item.name && (
                    <div
                      id={`${item.name}-submenu`}
                      className="pl-5 mt-1 space-y-1"
                      role="region"
                      aria-label={`${item.name} submenu`}
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-3 py-1.5 rounded-md text-gray-400 hover:text-white hover:bg-blue-500 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
          aria-hidden="true"
        />
      )}

      {/* Content padding for mobile header */}
      <div className="md:hidden pt-14" />
    </>
  );
};

export default Sidebar;
