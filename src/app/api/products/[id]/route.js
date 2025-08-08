import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET Product by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const { db } = await connectToDatabase();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ message: "product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE Product by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const { db } = await connectToDatabase();

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "product deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


// UPDATE Product by ID (PUT)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { db } = await connectToDatabase();

    const updateFields = {
      product_type: body.product_type || "",
      organization: body.organization || "",
      brand: body.brand || "",
      model: body.model || "",
      display_size: body.display_size || "",
      type: body.type || "",
      service_tag: body.service_tag || "",
      serial_number: body.serial_number || "",
      processor: body.processor || "",
      generation: body.generation || "",
      ssd: body.ssd || "",
      hdd: body.hdd || "",
      ram: body.ram || "",
      status: body.status || "Not Assigned",
    };

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updateFields,
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Product updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}