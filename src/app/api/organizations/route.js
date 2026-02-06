import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/* =========================
   GET: All Organizations
========================= */
export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const organizations = await db
      .collection("organizations")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return Response.json(organizations);
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

/* =========================
   POST: Add Organization
========================= */
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      legal_name = "",
      type = "",
      industry = "",
      email = "",
      phone = "",
      website = "",
      address = {},
      description = "",
      employee_size = "",
      owner_id = null,
      is_verified = false,
    } = body;

    // ✅ Minimal required validation
    if (!name) {
      return new Response(
        JSON.stringify({ message: "Organization name is required" }),
        { status: 400 },
      );
    }

    const organizationDoc = {
      name,
      legal_name,
      type,
      industry,
      email,
      phone,
      website,
      address: {
        city: address.city || "",
        country: address.country || "",
      },
      description,
      employee_size,
      owner_id,
      is_verified,
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const { db } = await connectToDatabase();
    const result = await db
      .collection("organizations")
      .insertOne(organizationDoc);

    return new Response(
      JSON.stringify({
        message: "Organization added successfully",
        id: result.insertedId,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating organization:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
