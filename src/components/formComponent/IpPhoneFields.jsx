import React from "react";

const IpPhoneFields = ({ register }) => {
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
          id="st"
          type="text"
          {...register("st")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="sn" className="block mb-1 font-medium">
          Serial Number
        </label>
        <input
          id="sn"
          type="text"
          {...register("sn")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
    </>
  );
};

export default IpPhoneFields;
