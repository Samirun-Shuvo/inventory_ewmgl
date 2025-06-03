import React from "react";

const KeyboardFields = ({ register }) => {
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
        <label htmlFor="type" className="block mb-1 font-medium">
          Type
        </label>
        <input
          id="type"
          type="text"
          {...register("type")}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
    </>
  );
};

export default KeyboardFields;
