import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();


      const client = await connectToDatabase();
      const db = client.db("sweetshop");

        const existingUser = await db.collection("users").findOne({ uid: data.uid });

        if (existingUser) {
          return new NextResponse({
            status: 409,
            body: { error: "User already exists in the database" },
          });
        }

        await db.collection("users").insertOne({
          uid:data.uid,
          email:data.email,
          displayName:data.displayName,
          mobile: data.mobile,
          photo: data.photo
        });

      return new NextResponse({
        status: 200,
        body: { success: true },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse({
        status: 500,
        body: { error: "Internal Server Error" },
      });
    }
  } else {
    return new NextResponse({
      status: 405,
      body: { error: "Method Not Allowed" },
    });
  }
};
