import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';

export const POST = async(req, res) =>{
  if (req.method === "POST") {
    try {
      const data = await req.json();
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.mailid;
      const mobile = data.mobile;
      const street = data.street;
      const city = data.city;
      const district = data.district;
      const state = data.state;
      const pincode = data.pincode;
      const userID = data.userId;

      
      // Connect to MongoDB
        const client = await connectToDatabase();
        const db = client.db('sweetshop');

      // Check if user with given UID already exists
      const existingUser = await db.collection("userDetails").findOne({ userId: userID });

      if (existingUser) {
        const update = await db.collection("userDetails").updateOne({
            userId: userID,
        }, {
            $set: {
                firstName,
                lastName,
                email,
                mobile,
                street,
                city,
                district,
                state,
                pincode,
            }
        })
        console.log(update)
        return NextResponse.json({
          status: 409,
          message: "User already exists",
        });
      }

      // Add user data to MongoDB
      const insert = await db.collection("userDetails").insertOne({
        firstName,
        lastName,
        email,
        mobile,
        street,
        city,
        district,
        state,
        pincode,
        userId: userID,
      });
      console.log(insert)

      return NextResponse.json({
        status: 200,
        message: "User added successfully",
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        error: "Internal server error",
      });
    }
  } else {
    return NextResponse.json({
      status: 405,
      error: "Method not allowed",
    });
  }
}
