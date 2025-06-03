"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="btn btn-secondary flex items-center gap-1 btn-xs mb-4"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
};

export default BackButton;
