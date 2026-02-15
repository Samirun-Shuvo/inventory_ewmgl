"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Hash,
  Building2,
  Briefcase,
  Calendar,
  PhoneForwarded,
} from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

const ViewEmployee = () => {
  const { id } = useParams();
  const router = useRouter();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${id}`);
        if (!res.ok) throw new Error("Employee not found");
        const data = await res.json();
        setEmp(data);
      } catch (err) {
        console.error(err);
        router.push("/dashboard/employee");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEmployee();
  }, [id, router]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 md:p-0">
      {/* Navigation */}
      <Link
        href="/dashboard/employee"
        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Back</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Profile Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-3xl font-bold">
                <img
                  src={`https://ui-avatars.com/api/?name=${emp.name}&background=fff&color=4f46e5&size=128`}
                  alt="profile"
                />
              </div>
            </div>
            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl font-extrabold">{emp.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center opacity-90">
                <span className="flex items-center gap-1">
                  <Briefcase size={16} /> {emp.designation}
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  <Building2 size={16} /> {emp.department}
                </span>
              </div>
              <div className="pt-2">
                <StatusBadge status={emp.status} type="employee" />
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              Contact Information
            </h3>
            <DetailItem
              icon={<Mail size={18} />}
              label="Email Address"
              value={emp.email}
              isCopyable
            />
            <DetailItem
              icon={<Phone size={18} />}
              label="Phone Number"
              value={emp.phone}
            />
            <DetailItem
              icon={<PhoneForwarded size={18} />}
              label="IP Extension"
              value={emp.ip_extention_no}
            />
          </div>

          {/* Employment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              Employment Details
            </h3>
            <DetailItem
              icon={<Hash size={18} />}
              label="PF Number"
              value={emp.pf}
            />
            <DetailItem
              icon={<Hash size={18} />}
              label="Employee ID"
              value={emp.employee_id}
            />
            <DetailItem
              icon={<Calendar size={18} />}
              label="Date of Birth"
              value={formatDate(emp.dob)}
            />
            <DetailItem
              icon={<Building2 size={18} />}
              label="Organization"
              value={emp.organization}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end gap-3">
          <Link
            href={`/dashboard/employee/edit/${emp._id}`}
            className="btn btn-warning btn-sm text-white"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper component for detail rows
const DetailItem = ({ icon, label, value, isCopyable }) => (
  <div className="flex items-start gap-3 group">
    <div className="mt-1 text-gray-400 group-hover:text-primary transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
        {label}
      </p>
      <p className="text-gray-700 font-medium">{value || "N/A"}</p>
    </div>
  </div>
);

export default ViewEmployee;
