import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const employees = await db.collection("employees").find({}).toArray();
    return Response.json(employees);
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, department, designation, pf, status } =
      body;

    if (
      !organization ||
      !department ||
      !designation ||
      !status
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        {
          status: 400,
        }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection("employees").insertOne(body);

    return new Response(
      JSON.stringify({
        message: "Employee added successfully",
        id: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/employees:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
