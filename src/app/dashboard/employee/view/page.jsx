"use client";

import { useSearchParams } from "next/navigation";

const ViewEmployee = () => {
  const searchParams = useSearchParams();
  const empStr = searchParams.get("emp");
  const emp = empStr ? JSON.parse(empStr) : null;

  if (!emp) {
    return <p>No employee data found.</p>;
  }

  return (
    <div className="card w-full max-w-xxl bg-base-100 shadow-sm mx-auto mt-10">
      <div className="card-body">
        <h2 className="card-title text-primary text-2xl font-bold">
          Employee Details
        </h2>
        <p>
          <span className="font-semibold">Name:</span> {emp.name}
        </p>
        <p>
          <span className="font-semibold">PF Number:</span> {emp.pf}
        </p>
        <p>
          <span className="font-semibold">Department:</span> {emp.department}
        </p>
        <p>
          <span className="font-semibold">Designation:</span> {emp.designation}
        </p>
      </div>
    </div>
  );
};

export default ViewEmployee;
