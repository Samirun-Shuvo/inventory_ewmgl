export const filterBySearch = (items, searchTerm, fields) => {
  const lower = searchTerm.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = field.includes(".")
        ? field.split(".").reduce((obj, key) => obj?.[key], item)
        : item?.[field];

      return value?.toString().toLowerCase().includes(lower);
    })
  );
};
