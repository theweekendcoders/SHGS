import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";
import { log } from "console";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();
      console.log(data);

      // Convert orderData to an array of objects
      const paymentDetailsArray = Object.keys(data.orderData).map(key => {
        return { [key]: data.orderData[key] };
      });

      // Connect to MongoDB
      const client = await connectToDatabase();
      const db = client.db("sweetshop");
      const date = new Date();
      const optionsDate = { month: 'long', day: '2-digit', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', optionsDate);
      const optionsTime = { hour: '2-digit', minute: '2-digit' };
      const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

      console.log(data.user.userId);
      console.log(paymentDetailsArray);
      console.log(data.cartItems);
      console.log(data.total);
      console.log(data.user);

      const orders = await db.collection("orders").insertOne({
        userID: data.user.userId,
        paymentDetails: paymentDetailsArray,
        orderedItems: data.cartItems.cartItems,
        userDetails: data.user,
        orderDate: formattedDate,
        orderTime: formattedTime,
        grandTotal: data.total
      });

      const orderHistory = await db.collection("orderHistory").insertOne({
        userID: data.user.userId,
        paymentDetails: paymentDetailsArray,
        orderedItems: data.cartItems,
        orderID: data.orderData.razorpay_order_id,
        orderDate: formattedDate,
        orderTime: formattedTime,
        grandTotal: data.total
      });

      return NextResponse.json({ status: 200, message: "Order Details Updated" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 500 });
  }
};
