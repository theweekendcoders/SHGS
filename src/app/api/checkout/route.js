// pages/api/razorpay.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const POST = async(req, res) =>{
  if (req.method === 'POST') {
    const data = await req.json();

    // Initialize Razorpay instance with your key and secret
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create a Razorpay order
    const orderOptions = {
      amount: data.amount * 100, // Amount in paise
      currency: 'INR',
    };

    try {
      const order = await razorpay.orders.create(orderOptions);
      console.log(order);
      return NextResponse.json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      return NextResponse.json(error);
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' });
  }
}
