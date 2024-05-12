import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';

export const POST = async (req, res) => {

    if (req.method === "POST") {
        try{
            const data = await req.json();
            const userId = data.uid;

            const client = await connectToDatabase();
            const db = client.db("sweetshop");
            const user_details = await db.collection("userDetails").find({ userId }).toArray();

            return NextResponse.json({ user_details})
        }catch(error){
            return NextResponse.json({ status: 500, error: "Internal Server Error" });
        }
    }
          
}