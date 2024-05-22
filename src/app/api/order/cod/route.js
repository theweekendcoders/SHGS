import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";



export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();
      // console.log(data)
      // Connect to MongoDB
      const client = await connectToDatabase();
      const db = client.db("sweetshop");
      const date = new Date();
      const optionsDate = { month: 'long', day: '2-digit', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', optionsDate);
      const optionsTime = { hour: '2-digit', minute: '2-digit'};
      const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
    
      console.log(data.total)

      const orders = await db.collection("orders").insertOne(
        {
            userID:data.user.userId,
            paymentDetails:["Cash on Delivery"],
            orderedItems:data.cart.cartItems,
            userDetails:data.user,
            orderDate:formattedDate,
            orderTime: formattedTime,
            grandTotal : data.total
        }
      );

      const orderHistory = await db.collection("orderHistory").insertOne({
          userID:data.user.userId,
          paymentDetails:["Cash on Delivery"],
          orderedItems:data.cart.cartItems,
          orderID:"cod",
          orderDate:formattedDate,
          orderTime: formattedTime,
          grandTotal : data.total
      })

      return NextResponse.json({status: 200,},{message: "Order Details Updated",});
    } 
    catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 500 });
  }
};