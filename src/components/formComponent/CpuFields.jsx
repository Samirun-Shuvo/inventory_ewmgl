import React from "react";

const cpuFields = [
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "processor", label: "Processor" },
  { id: "generation", label: "Generation" },
  { id: "ssd", label: "SSD" },
  { id: "hdd", label: "HDD" },
  { id: "ram", label: "RAM" },
  { id: "st", label: "Service Tag" },
  { id: "sn", label: "Serial Number" },
];

const CpuFields = ({ register }) => {
  return (
    <>
      {cpuFields.map(({ id, label }) => (
        <div key={id} className="md:col-span-1">
          <label htmlFor={id} className="block mb-1 font-medium">
            {label}
          </label>
          <input
            id={id}
            type="text"
            {...register(id)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      ))}
    </>
  );
};

export default CpuFields;
