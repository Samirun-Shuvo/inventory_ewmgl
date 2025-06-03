import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const products = await db.collection("products").find({}).toArray();
    return Response.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const product = await request.json();

    if (!product.product_type) {
      return new Response(
        JSON.stringify({ error: "Product type is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await db.collection("products").insertOne({
      ...product,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        message: "Product added successfully",
        insertedId: result.insertedId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to add product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
