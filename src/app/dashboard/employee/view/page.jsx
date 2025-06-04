'use client';

import { useSearchParams } from 'next/navigation';

const ViewEmployee = () => {
  const searchParams = useSearchParams();
  const empStr = searchParams.get('emp');
  const emp = empStr ? JSON.parse(empStr) : null;

  if (!emp) {
    return <p>No employee data found.</p>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <p>Name: {emp.name}</p>
      <p>PF Number: {emp.pf}</p>
      <p>Department: {emp.department}</p>
      <p>Designation: {emp.designation}</p>
    </div>
  );
};

export default ViewEmployee;
