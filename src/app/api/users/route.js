import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// POST: Assign product to employee
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const user = await request.json();

    // Check if product is already assigned
    const exists = await db.collection("users").findOne({
      productId: user.productId,
    });

    if (exists) {
      return new Response(
        JSON.stringify({ message: "Product is already assigned." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Insert new assignment into users collection
    const result = await db.collection("users").insertOne({
      ...user,
      createdAt: new Date(),
    });

    // Update product status in products collection
    const productId = new ObjectId(user.productId);
    await db.collection("products").updateOne(
      { _id: productId }, 
      { $set: { status: "Assigned" } }
    );

    return new Response(
      JSON.stringify({
        message: "User assigned successfully",
        insertedId: result.insertedId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to add user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET: Return all assigned users
export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const users = await db
      .collection("users")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to get users:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
