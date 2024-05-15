"use server";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

//Razorpay
export const orderDetailsUpdation1 = async (
  orderData: any,
  cartItems: any,
  user: any
) => {

  const orderdetails = {
    orderData,
    cartItems,
    user,
  };

  const date = new Date();
  const options:any = { month: 'long', day: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const response = await fetch("http://localhost:3000/api/order/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderData,
      cartItems,
      user,
    }),
  });

  // await resend.emails.send({
  //   from: "Sree Hariganesh Sweets <OrderConfirmation@hariganeshsweets.com>",
  //   to: orderdetails.user.email,
  //   subject: "Order Confirmation",
  //   react: React.createElement(
  //     Receipt, {data: orderdetails, date: formattedDate}
  //   )
  // })

  const data = await response.json();
  return data;
};


//COD
export const orderDetailsUpdation2 = async (
  cart: any,
  user: any
) => {

  console.log("Cart:", cart);

  const response = await fetch("http://localhost:3000/api/order/cod", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart,
      user,
    }),
  });

  const data = await response.json();
  return data;
};
