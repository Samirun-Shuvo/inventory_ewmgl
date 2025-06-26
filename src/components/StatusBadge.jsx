// components/StatusBadge.jsx
import React from "react";

const StatusBadge = ({ status = "" }) => {
  const lowerStatus = status.toLowerCase();

  const badgeStyle = {
    active: "bg-green-100 text-green-800 border border-green-300",
    inactive: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    pending: "bg-blue-100 text-blue-800 border border-blue-300",
    default: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  const appliedStyle = badgeStyle[lowerStatus] || badgeStyle.default;

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${appliedStyle}`}
    >
      {status || "-"}
    </span>
  );
};

export default StatusBadge;
