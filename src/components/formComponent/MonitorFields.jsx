import React from "react";

const MonitorFields = ({ register }) => {
  return (
    <>
      <div className="md:col-span-1">
        <label htmlFor="brand" className="block mb-1 font-medium">
          Brand
        </label>
        <input
          id="brand"
          type="text"
          {...register("brand")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="model" className="block mb-1 font-medium">
          Model
        </label>
        <input
          id="model"
          type="text"
          {...register("model")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="st" className="block mb-1 font-medium">
          Service Tag
        </label>
        <input
          id="service_tag"
          type="text"
          {...register("service_tag")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="sn" className="block mb-1 font-medium">
          Serial Number
        </label>
        <input
          id="serial_number"
          type="text"
          {...register("serial_number")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="md:col-span-1">
        <label htmlFor="size" className="block mb-1 font-medium">
          Display Size
        </label>
        <input
          id="display_size"
          type="text"
          {...register("display_size")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
    </>
  );
};

export default MonitorFields;
