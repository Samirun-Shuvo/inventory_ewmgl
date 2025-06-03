import React from "react";

const Heading = ({ title = "", length = null }) => {
  return (
    <div className="text-2xl font-bold mb-6">
      {title}
      {length !== null && ` (${length})`}
    </div>
  );
};

export default Heading;
