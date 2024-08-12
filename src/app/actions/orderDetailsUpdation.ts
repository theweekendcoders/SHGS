"use server";
import React from "react";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

//Razorpay
export const orderDetailsUpdation1 = async (
  orderData: any,
  cartItems: any,
  user: any,
  total:any
) => {

  const orderdetails = {
    orderData,
    cartItems,
    user,
    total
  };

  const date = new Date();
  const options:any = { month: 'long', day: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const response = await fetch("https://shgs.vercel.app/api/order/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderData,
      cartItems,
      user,
      total
    }),
  });

  const data = await response.json();
  return data;
};


//COD
export const orderDetailsUpdation2 = async (
  cart: any,
  user: any,
  total:any
) => {

  console.log("Cart:", cart);

  const response = await fetch("https://shgs.vercel.app/api/order/cod", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart,
      user,
      total
    }),
  });

  const data = await response.json();
  return data;
};
