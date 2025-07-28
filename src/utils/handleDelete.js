// utils/handleDelete.js
import { toast } from "react-hot-toast";

export const handleDelete = async ({ id, resource, setState, itemName = "item" }) => {
  const confirmed = confirm(`Are you sure you want to delete this ${itemName}?`);
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/${resource}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(`${itemName[0].toUpperCase() + itemName.slice(1)} deleted successfully!`);
      setState((prev) => prev.filter((item) => item._id !== id));
    } else {
      toast.error(data.message || `Failed to delete ${itemName}`);
    }
  } catch (error) {
    console.error(`Delete ${itemName} failed:`, error);
    toast.error("An unexpected error occurred");
  }
};
