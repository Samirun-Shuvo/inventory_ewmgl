"use client";

import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Heading from "@/components/Heading";
import Link from "next/link";
import { filterBySearch } from "@/utils/filter";
import { handleDelete } from "@/utils/handleDelete";
import StatusBadge from "@/components/StatusBadge";

const OrganizationsList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     Fetch organizations
  ========================= */
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch("/api/organizations");
        if (!res.ok) throw new Error("Failed to fetch organizations");
        const data = await res.json();
        setOrganizations(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch organizations");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  /* =========================
     Search filter
  ========================= */
  const filteredOrganizations = filterBySearch(
    organizations,
    searchTerm,
    [
      "name",
      "legal_name",
      "industry",
      "type",
      "employee_size",
      "email",
      "phone",
      "status",
    ]
  );

  return (
    <div>
      <Heading
        title="Organization List"
        length={filteredOrganizations.length}
      />

      {/* Search + Add */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Link
          href="/dashboard/organizations/add"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Organization
        </Link>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredOrganizations.length === 0 ? (
        <p className="text-center">No organization found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-xs w-full text-center">
            <thead className="bg-[#e9d8d8]">
              <tr>
                <th className="min-w-[40px]">#</th>
                <th className="min-w-[200px]">Name</th>
                <th className="min-w-[180px]">Legal Name</th>
                <th className="min-w-[140px]">Industry</th>
                <th className="min-w-[120px]">Type</th>
                <th className="min-w-[120px]">Employee Size</th>
                <th className="min-w-[100px]">Status</th>
                <th className="min-w-[140px] text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrganizations.map((org, index) => (
                <tr key={org._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>

                  <td className="font-medium">
                    {org.name || "-"}
                  </td>

                  <td>{org.legal_name || "-"}</td>
                  <td>{org.industry || "-"}</td>
                  <td>{org.type || "-"}</td>
                  <td>{org.employee_size || "-"}</td>

                  <td>
                    <StatusBadge
                      status={org.is_verified ? "active" : "pending"}
                    />
                  </td>

                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={`/dashboard/organizations/view/${org._id}`}
                        className="text-blue-500 hover:text-blue-700"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/dashboard/organizations/edit/${org._id}`}
                        className="text-yellow-500 hover:text-yellow-600"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete({
                            id: org._id,
                            resource: "organizations",
                            setState: setOrganizations,
                            itemName: "organization",
                          })
                        }
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrganizationsList;
