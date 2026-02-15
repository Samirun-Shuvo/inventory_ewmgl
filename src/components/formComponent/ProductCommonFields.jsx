"use client";
import React from "react";

const ProductCommonFields = ({ register, errors, productType }) => {
  const getFieldsByProductType = (type) => {
    switch (type) {
      case "Monitor":
        return [
          "brand",
          "model",
          "processor",
          "generation",
          "serial_number",
          "service_tag",
          "display_size",
          "specifications",
          "note",
          "user_information",
        ];
      case "Laptop":
      case "CPU":
        return [
          "brand",
          "model",
          "processor",
          "generation",
          "serial_number",
          "service_tag",
          "ssd",
          "hdd",
          "ram",
          "display_size",
          "specifications",
          "note",
          "user_information",
        ];
      default:
        return [
          "brand",
          "model",
          "serial_number",
          "service_tag",
          "specifications",
          "note",
          "user_information", 
        ];
    }
  };

  const fields = getFieldsByProductType(productType);

  return (
    <>
      {fields.map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase mb-1">
            {field.replace(/_/g, " ").toUpperCase()}
          </label>
          <input
            type="text"
            {...register(field)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors?.[field] && (
            <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>
          )}
        </div>
      ))}
    </>
  );
};

export default ProductCommonFields;
