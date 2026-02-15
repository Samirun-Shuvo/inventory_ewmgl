export const getOrganizationStatusColor = (status) => {
  const s = status?.toLowerCase();
  switch (s) {
    case "active":
    case "verified":
      return "badge-success text-white"; // Green

    case "pending":
    case "review":
      return "badge-warning text-white"; // Yellow/Orange

    case "inactive":
    case "deactivated":
      return "badge-ghost opacity-60"; // Grey

    case "suspended":
    case "blocked":
      return "badge-error text-white"; // Red

    default:
      return "badge-outline opacity-50"; // Default Bordered
  }
};

export const getEmployeeStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "badge-success text-white";
    case "inactive":
      return "badge-ghost opacity-60";
    case "resigned":
      return "badge-warning text-white";
    case "terminated":
    case "sack": // in case your old data uses 'sack'
      return "badge-error text-white";
    case "on leave":
      return "badge-info text-white";
    default:
      return "badge-ghost";
  }
};

export const getProductStatusStyles = (status) => {
  switch (status) {
    case "Available":
      return "badge-success text-white";
    case "Assigned":
      return "badge-info text-white";
    case "In Maintenance":
      return "badge-warning text-white";
    case "Damaged":
    case "Lost":
      return "badge-error text-white";
    case "Reserved":
      return "badge-primary text-white";
    default:
      return "badge-ghost opacity-70";
  }
};
