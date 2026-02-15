import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Run counts in parallel for better performance
    const [orgCount, employeeCount, productCount] = await Promise.all([
      db.collection("organizations").countDocuments(),
      db.collection("employees").countDocuments(),
      db.collection("products").countDocuments(),
    ]);

    return NextResponse.json({
      organizations: orgCount,
      employees: employeeCount,
      products: productCount,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}