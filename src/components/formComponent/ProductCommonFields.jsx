"use client";
import React from "react";

const fields = [
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
];

const ProductCommonFields = ({ register, errors }) => {
  return (
    <>
      {fields.map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {field.replace("_", " ")}
          </label>
          <input
            type="text"
            {...register(field)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
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
