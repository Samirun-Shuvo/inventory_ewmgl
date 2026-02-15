import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * GET: Fetch a single organization by its ID
 * Path: /api/organizations/[id]
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // 1. Validate the ID format to prevent MongoDB driver from throwing an error
    // MongoDB ObjectIds must be a string of 12 bytes or a string of 24 hex characters
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid Organization ID format" }),
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // 2. Query the 'organizations' collection for a matching document
    const organization = await db
      .collection("organizations")
      .findOne({ _id: new ObjectId(id) });

    // 3. If no document is found, return a 404 Not Found
    if (!organization) {
      return new Response(
        JSON.stringify({ message: "Organization not found" }),
        { status: 404 }
      );
    }

    // 4. Return the found organization as JSON
    return Response.json(organization);
  } catch (error) {
    console.error("GET_ORGANIZATION_ERROR:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

/**
 * PUT: Update an existing organization's details
 * Path: /api/organizations/[id]
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate ID before proceeding to DB connection
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
      });
    }

    const { db } = await connectToDatabase();

    // Destructure to extract _id (if sent) to prevent trying to overwrite MongoDB's immutable primary key
    const { _id, ...updateData } = body;

    // Perform the update using the $set operator and add/update a timestamp
    const result = await db
      .collection("organizations")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updated_at: new Date() } }
      );

    // matchedCount is 0 if no document was found with that ID
    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Organization not found" }),
        { status: 404 }
      );
    }

    return Response.json({ message: "Organization updated successfully" });
  } catch (error) {
    console.error("UPDATE_ORGANIZATION_ERROR:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

/**
 * DELETE: Remove an organization from the database
 * Path: /api/organizations/[id]
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
      });
    }

    const { db } = await connectToDatabase();

    // Attempt to delete the specific document
    const result = await db.collection("organizations").deleteOne({
      _id: new ObjectId(id),
    });

    // deletedCount will be 0 if the ID didn't match any document
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Organization not found" }),
        { status: 404 }
      );
    }

    return Response.json({ message: "Organization deleted successfully" });
  } catch (error) {
    console.error("DELETE_ORGANIZATION_ERROR:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}