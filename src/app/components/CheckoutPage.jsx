"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import UserDetailsForm from "../components/UserDetailsForm";
import { paymentUsingRazorpay } from "@/app/actions/payment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CartContext from "../context/CartContext";
import {
  orderDetailsUpdation1,
  orderDetailsUpdation2,
} from "../actions/orderDetailsUpdation";
import { Mailer1, Mailer2 } from "../actions/mailer";
import { UserAuth } from "../context/AuthContext";

const CheckoutPage = ({ User }) => {
  const { cart } = useContext(CartContext);
  const router = useRouter();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isProcessingOn, setIsProcessingOn] = useState(false);
  const [isProcessingCOD, setIsProcessingCOD] = useState(false);
  const { user } =  UserAuth();

  let deliveryCharge = 60;
  console.log(User.city);
  var isAuthenticated = false;

  useEffect(() => {
    isAuthenticated = !user
  }, [user])

  if (["Arakkonam"].includes(User.city)) {
    deliveryCharge = 0;
  }

  const handleProceed = () => {
    setShowPaymentOptions(true);
  };

  const calculateTotal = () => {
    return cart?.cartItems?.reduce((total, item) => {
      return (
        total +
        item.quantity *
          item.price *
          (item.weight /
            ((item.category === "snacks" && item.name != "Veg Samosa") ||
            item.category === "vathal" ||
            item.category === "savouries"
              ? 100
              : item.name === "Veg Samosa" || item.category === "poli"
              ? 1
              : 250))
      ); // Assuming weight is in grams and price per 250g
    }, 0);
  };

  const amount = calculateTotal();
  const grandTotal = amount + deliveryCharge;

  const loadRazorpayScript = async () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    // setCart({ cartItems: [] }); // Update cart context to clear items
  };

  const handlePayment = async (method) => {
    try {
      if (method === "razorpay") {
        await handleRazorpay();
      } else if (method === "cod") {
        await handleCOD();
      }
    } catch (error) {
      console.error("Payment Initialization Failed", error);
      toast.error("Payment Initialization Failed", {
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
  };

  const handleCOD = async () => {
    setIsProcessingCOD(true);
    try {
      await orderDetailsUpdation2(cart, User, grandTotal);
      await Mailer2(cart, User, grandTotal);
      clearCart();
      router.push("/ordered");
      toast.success("Order placed successfully via COD", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Failed to handle COD", error);
    }
  };

  const handleRazorpay = async () => {
    setIsProcessingOn(true);
    try {
      await loadRazorpayScript();
      const payment = await paymentUsingRazorpay(grandTotal);
      console.log(payment.id);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Use NEXT_PUBLIC_ for client-side environment variables in Next.js
        amount: grandTotal * 100, // Convert to paise
        currency: "INR",
        name: "Sree Hariganesh Sweets",
        description: "Purchase of Sweets & Snacks",
        order_id: payment.id,
        image: "Your Business Logo",
        handler: async function (response) {
          try {
            if (response.razorpay_payment_id) {
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
              await orderDetailsUpdation1(response, cart, User, grandTotal);
              await Mailer1(response, cart, User, grandTotal);
              router.push("/ordered");
              clearCart();
            } else {
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
          name: `${User.firstName} ${User.lastName}`,
          email: User.email,
          contact: User.mobile,
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Failed to handle payment", error);
      toast.error("Payment Initialization Failed", {
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
  };

  console.log(user)
  if(user === null){
    return(
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-medium font-bold text-4xl md:text-[64px] mb-4 
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative">
            You are not logged in
          </h1>
          <p className="font-medium md:text-xl md:mt-4 text-center">
            Please login to continue
          </p>
          <Link
            href="/login"
            className="font-medium px-16 py-6 bg-black text-center text-white rounded-full md:mt-4"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }
  if(grandTotal === null){
    return(
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-medium font-bold text-4xl md:text-[64px] mb-4
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative">
            Your cart is empty
          </h1>
          <p className="font-medium md:text-xl md:mt-4 text-center">
            Please add something to the cart
          </p>
          <Link
            href="/"
            className="font-medium px-16 py-6 bg-black text-center text-white rounded-full md:mt-4"
          >
            Go back
          </Link>
        </div>
      </div>
    )
  }
  return (
    <>
      {cart?.cartItems?.length === 0 ? (
        <div>
          <div className="flex flex-col justify-center items-center h-[600px] md:h-[700px] gap-4">
            <h1 className="font-medium text-4xl md:text-[64px] text-center">
              Checking out with an empty cart?
            </h1>
            <p className="font-medium md:text-xl md:mt-4 text-center">
              Add something to the cart silly.
            </p>
            <Link
              href="/"
              className="font-medium px-16 py-6 bg-black text-center text-white rounded-full md:mt-4"
            >
              Go back
            </Link>
          </div>
        </div>
      ) : (
        <div className="m-2 pb-2 lg:flex lg:flex-col xl:flex-row lg:gap-2 lg:justify-between max-w-screen-2xl 2xl:mx-auto">
          <div className="flex flex-col w-full lg:flex-col xl:flex-col gap-4 lg:order-2">
            <div className="bg-white text-black p-4 flex flex-col gap-4 h-fit rounded xl:max-w-[450px]">
              <h1 className="font-medium text-xl">Your Order</h1>

              <hr />

              <div className="flex flex-col gap-6">
                {cart?.cartItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-start"
                  >
                    {(item.name === "Veg Samosa" || item.category === "poli") ? (
                      <p>5p x {item.quantity}</p>
                    ) : (
                      <p>
                        {item.weight}g x {item.quantity}
                      </p>
                    )}
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

              <div className="flex justify-center">
                <button
                  className="bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium hover:bg-indigo-600 transition-colors duration-300"
                  onClick={() => {
                    handlePayment("razorpay");
                  }}
                >
                  {isProcessingOn ? "Processing..." : "Pay with Razorpay"}
                </button>
              </div>

              {User.city === "Arakkonam" && (
                <div className="flex justify-center">
                  <button
                    className="bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium hover:bg-indigo-600 transition-colors duration-300"
                    onClick={() => {
                      handlePayment("cod");
                    }}
                    disabled={User.city !== "Arakkonam"}
                  >
                    {isProcessingCOD ? "Processing..." : "Cash on Delivery"}
                  </button>
                </div>
              )}
              
            </div>

            <div className="bg-slate-800 text-white p-4 max-h-[200px] flex flex-col gap-4 rounded xl:max-w-[450px]">
              <h1 className="font-medium text-xl">Delivery</h1>

              <hr />
              <div>
                <span className="text-gray-400">Via </span>
                <span>Own Delivery Service</span>
              </div>
              <div>
                <span className="text-gray-400">Deliver to</span>
                <span className="ml-2">{User.city}</span>
              </div>
            </div>
          </div>

          <div className="grow border-2 border-black rounded-sm p-4 flex flex-col backdrop-blur-sm bg-white/20">
            <h1 className="text-2xl font-semibold">Delivery Details</h1>
            <div className="m-4">
              <UserDetailsForm data={User} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
