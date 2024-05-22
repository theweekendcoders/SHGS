"use client";

import React, { useContext } from "react";
import Image from "next/image";
import UserDetailsForm from "../components/UserDetailsForm";
import { paymentUsingRazorpay } from "@/app/actions/payment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CartContext from "../context/CartContext";
import { orderDetailsUpdation1, orderDetailsUpdation2 } from "../actions/orderDetailsUpdation";

const CheckoutPage = (user) => {
  const { cart } = useContext(CartContext);
  const router = useRouter();

  let deliveryCharge = 60;
  console.log(user.user.city);

  if(user.user.city ==="Arakkonam" | user.user.city ==="Arakonam"){
    deliveryCharge = 0
  }

  const calculateTotal = () => {
    return cart?.cartItems?.reduce((total, item) => {
      return total + item.quantity * item.price * (item.weight / 250); // Add 60 for delivery charge
    }, 0);
  };
  const amount = calculateTotal();
  const grandTotal = (amount + deliveryCharge);

  const loadRazorpayScript = async () => {
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    } catch (e) {
      console.error("Failed to load Razorpay Script ", e);
    } 
  };

  const handlePayment = async (method) => {
    if(method ==="razorpay"){
      handleRazorpay();
    }
    else if(method === "cod"){
      handleCOD();
    } 
  }

  const handleCOD = async () => {
    try {
      console.log(cart.cartItems)
      console.log(user.user)
      orderDetailsUpdation2(cart, user.user, grandTotal);
      router.push('/ordered');
      // Additional logic if needed with the options object
    } catch (error) {
      console.error("Failed to handle COD", error);
      alert("COD Initialization Failed");
    }
  };

  const handleRazorpay = async () => {
    try {
      await loadRazorpayScript();
      const payment = await paymentUsingRazorpay(grandTotal);
      console.log(payment.id);
      const options = {
        key: process.env.RAZORPAY_KEY,
        amount: grandTotal,
        currency: "INR",
        name: "Sree Hariganesh Sweets",
        description: "Purchase of Sweets & Snacks",
        order_id: payment.id,
        image: "Your Business Logo",
        handler: async function (response) {
          try {
            if (response.razorpay_payment_id) {
              // Payment successful, handle it accordingly
              toast.success("Payment Successful", {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              orderDetailsUpdation1(response, cart, user.user, grandTotal);
              router.push("/ordered");
            } else {
              // Payment failed or was canceled
              toast.error("Payment Failed", {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          } catch (error) {
            console.error("Error while redirecting:", error);
          }
        },
        prefill: {
          name: user.user.firstName + user.user.lastName,
          email: user.user.email,
          contact: user.user.mobile,
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Failed to handle payment", error);
      alert("Payment Initialization Failed");
    }
  };

  return (
    <>
      <div className="m-2 pb-2 lg:flex lg:flex-row lg:gap-2 lg:justify-between max-w-screen-2xl 2xl:mx-auto">
        <div className="flex flex-col gap-4 lg:order-2">
          <div className="bg-white text-black p-4 flex flex-col gap-4 h-fit rounded lg:max-w-[400px] xl:max-w-[450px]">
            <h1 className="font-medium text-xl">Your Order</h1>

            <hr />

            <div className="flex flex-col gap-6">
              {cart?.cartItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-start"
                >
                  <p>
                    {item.weight}g x {item.quantity}
                  </p>
                  <p className="max-w-[200px]">{item.name}</p>
                  <p className="">₹ {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <hr />

            <div className="flex flex-row justify-between">
              <p>Amount</p>
              <p className="font-bold">₹ {calculateTotal()}</p>
            </div>

            <div className="flex flex-row justify-between">
              <p>Delivery Charge</p>
              <p className="font-bold">₹ {deliveryCharge}</p>
            </div>

            <hr />

            <div className="flex flex-row justify-between">
              <p>Grand Total</p>
              <p className="font-bold text-2xl">₹ {grandTotal}</p>
            </div>

            <div className="flex justify-center ">
              <button
                className="bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium hover:bg-indigo-600 transition-colors duration-300"
                onClick={() => {
                  handlePayment("razorpay");
                }}
              >
                Pay Online
              </button>
            </div>
            <div className="flex justify-center ">
              <button
                className="bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium hover:bg-indigo-600 transition-colors duration-300"
                onClick={() => {
                  handlePayment("cod");
                }}
              >
                Cash on Delivery
              </button>
            </div>
          </div>

          <div className="bg-slate-800 text-white p-4 flex flex-col gap-4 rounded lg:w-[400px]">
            <h1 className="font-medium text-xl">Delivery Through</h1>

            <hr />
            <div>
                <span className="text-gray-400">Via </span>
                <span>Own Delivery Service</span>
            </div>
            <div>
              <span className="text-gray-400">Deliver to</span>
              <span className="ml-2">{user.user.city}</span>
            </div>
          </div>
        </div>

        <div className="grow border-2 border-black rounded-sm p-4 flex flex-col">
          <h1 className="text-2xl font-semibold">1. Delivery Details</h1>
          <div className="m-4">
            <UserDetailsForm data={user.user}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;