"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

const ViewOrganization = () => {
  const { id } = useParams();
  const router = useRouter();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await fetch(`/api/organizations/${id}`);
        if (!res.ok) throw new Error("Organization not found");
        const data = await res.json();
        setOrg(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrg();
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (!org)
    return <div className="p-20 text-center">Organization not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center">
          <button onClick={() => router.back()} className="btn btn-ghost gap-2">
            <FiArrowLeft /> Back
          </button>
          <button
            onClick={() => router.push(`/dashboard/organizations/edit/${id}`)}
            className="btn btn-primary"
          >
            Edit Profile
          </button>
        </div>

        {/* Header Card */}
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="bg-primary h-32 w-full"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 flex items-end justify-between">
              <div className="avatar">
                <div className="w-32 h-32 rounded-xl border-4 border-base-100 bg-white shadow-md">
                  {/* Placeholder for Logo */}
                  <img
                    src={
                      org.logo ||
                      `https://ui-avatars.com/api/?name=${org.name}&background=random`
                    }
                    alt={org.name}
                  />
                </div>
              </div>
              {org.is_verified && (
                <div className="badge badge-success gap-2 p-4 text-white font-semibold">
                  <FiCheckCircle /> Verified
                </div>
              )}
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold">{org.name}</h1>
              <p className="text-gray-500 text-lg">
                {org.legal_name || "No legal name provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="card bg-base-100 shadow p-6 space-y-4">
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest">
                Contact Information
              </h3>
              <div className="flex items-center gap-3">
                <FiMail className="text-primary" />
                <span className="text-sm truncate">{org.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-primary" />
                <span className="text-sm">{org.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiGlobe className="text-primary" />
                <a
                  href={org.website}
                  target="_blank"
                  className="text-sm link link-hover text-blue-600"
                >
                  {org.website || "No website"}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-primary" />
                <span className="text-sm">
                  {org.address?.city}, {org.address?.country}
                </span>
              </div>
            </div>

            <div className="card bg-base-100 shadow p-6">
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-3">
                Company Size
              </h3>
              <div className="badge badge-outline badge-lg">
                {org.employee_size || "Not specified"} employees
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow p-8 h-full">
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-4">
                About Organization
              </h3>
              <div className="flex gap-4 mb-6">
                <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                  <span className="block text-gray-400 text-[10px] font-bold">
                    INDUSTRY
                  </span>
                  <span className="font-semibold">
                    {org.industry || "General"}
                  </span>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                  <span className="block text-gray-400 text-[10px] font-bold">
                    TYPE
                  </span>
                  <span className="font-semibold">{org.type}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                {org.description ||
                  "No description provided for this organization."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrganization;
