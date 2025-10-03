// src/app/api/login/route.js
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await db.collection("authusers").findOne({ email });

    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
