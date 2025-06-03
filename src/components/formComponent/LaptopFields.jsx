import React from "react";

const fields = [
  { id: "brand", label: "Brand" },
  { id: "model", label: "Model" },
  { id: "processor", label: "Processor" },
  { id: "generation", label: "Generation" },
  { id: "serial_number", label: "Serial Number" },
  { id: "service_tag", label: "Service Tag" },
  { id: "ssd", label: "SSD" },
  { id: "hdd", label: "HDD" },
  { id: "ram", label: "RAM" },
  { id: "display_size", label: "Display Size" },
];

const LaptopFields = ({ register }) => {
  return (
    <>
      {fields.map(({ id, label }) => (
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

export default LaptopFields;
