"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "../context/CartContext";
import { UserAuth } from "../context/AuthContext";

const Cart = () => {
  const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext);
  const { user } = UserAuth();

  // Increment quantity
  const incrementQuantity = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty > 5) return;
    addItemToCart(item);
  };

  // Increment weight
  const incrementWeight = (cartItem) => {
    let newWgt = cartItem?.weight;
    if (
      (cartItem.category === "snacks" && cartItem.name != "Veg Samosa") ||
      cartItem.category === "vathal" ||
      cartItem.category === "savouries"
    ) {
      if (newWgt < 250) {
        newWgt = 250;
      } else if (newWgt < 500) {
        newWgt = 500;
      } else {
        return; // Do not allow weight to exceed 500
      }
    } else {
      if (newWgt < 250) {
        newWgt = 250;
      } else if (newWgt < 500) {
        newWgt = 500;
      } else if (newWgt < 1000) {
        newWgt = 1000;
      } else {
        return; // Do not allow weight to exceed 500
      }
    }
    const item = { ...cartItem, weight: newWgt };
    addItemToCart(item);
  };

  // Decrement quantity
  const decrementQuantity = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty < 1) return;
    addItemToCart(item);
  };

  // Decrement weight
  const decrementWeight = (cartItem) => {
    let newWgt = cartItem?.weight;

    if (
      (cartItem.category === "snacks" && cartItem.name != "Veg Samosa") ||
      cartItem.category === "vathal" ||
      cartItem.category === "savouries"
    ) {
      if (newWgt === 250) {
        newWgt = 100;
      } else if (newWgt === 500) {
        newWgt = 250;
      } else {
        return; // Do not allow weight to exceed 500
      }
    } else {
      if (newWgt === 500) {
        newWgt = 250;
      } else if (newWgt === 1000) {
        newWgt = 500;
      } else {
        return; // Do not allow weight to exceed 500
      }
    }

    if (newWgt < 1) return;
    const item = { ...cartItem, weight: newWgt };
    addItemToCart(item);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart?.cartItems?.forEach((cartItem) => {
      totalPrice +=
        cartItem.price *
        cartItem.quantity *
        (cartItem.weight /
          ((cartItem.category === "snacks" && cartItem.name != "Veg Samosa") ||
          cartItem.category === "vathal" ||
          cartItem.category === "savouries"
            ? 100
            : cartItem.name === "Veg Samosa" || cartItem.category === "poli"
            ? 1
            : 250));
    });
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();
  if (user === null) {
    return (
      <section className="py-5 sm:py-7">
        <div className="flex flex-col justify-center items-center h-[600px] md:h-[700px] gap-4">
          <h1 className="font-medium text-4xl md:text-[64px] text-center">
            Please login to view your cart
          </h1>
          <p className="font-medium md:text-xl md:mt-4 text-center">
            You need to be logged in to access your cart and place orders.
          </p>
          <Link
            href="/login"
            className="font-medium px-16 py-6 bg-black text-center text-white rounded-full md:mt-4"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  if (totalPrice === 0) {
    return (
      <section className="py-5 sm:py-7">
        <div className="flex flex-col justify-center items-center h-[600px] md:h-[700px] gap-4">
          <h1
            className="font-medium font-bold text-3xl md:text-[64px] mb-4 
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative"
          >
            Your cart is empty buddy!
          </h1>
          <p className="font-medium md:text-xl md:mt-4 text-center">
            Add something to the cart and come back.
          </p>
          <Link
            href="/"
            className="font-medium px-16 py-6 bg-black text-center text-white rounded-full md:mt-4"
          >
            Go back
          </Link>
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <main className="md:w-3/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                {cart?.cartItems?.map((cartItem, index) => (
                  <div key={index}>
                    <div className="flex flex-wrap lg:flex-row gap-5 mb-4">
                      <div className="w-full lg:w-2/5 xl:w-2/4">
                        <figure className="flex leading-5">
                          <div>
                            <div className="block w-24 h-24 rounded border border-gray-200 overflow-hidden">
                              <Image
                                src={cartItem.image}
                                width={100}
                                height={100}
                                alt={cartItem.name}
                                className="flex w-[90px] h-[90px] object-cover"
                              />
                            </div>
                          </div>
                          <figcaption className="ml-3 text-center text-xl">
                            <p>{cartItem.name}</p>
                            <p>{cartItem.special}</p>
                          </figcaption>
                        </figure>
                      </div>
                      {/* Weight */}
                      {cartItem.category === "poli" ||
                      cartItem.name === "Veg Samosa" ? (
                        <div className="flex flex-col justify-center items-center w-[100px]">
                          <div className="text-gray-600 hover:text-white hover:bg-red-500 h-10 rounded-l px-2">
                            5 Pieces
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex flex-row h-10 w-[100px] rounded-lg relative bg-transparent mt-1">
                            <button
                              onClick={() => decrementWeight(cartItem)}
                              data-action="decrement"
                              className="bg-gray-300 text-gray-600 hover:text-white hover:bg-red-500 h-full rounded-l px-2"
                            >
                              <span className="m-auto text-2xl font-normal">
                                −
                              </span>
                            </button>
                            <div className="p-2 bg-gray-200">
                              {cartItem.weight}g
                            </div>
                            <button
                              onClick={() => incrementWeight(cartItem)}
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-white hover:bg-green-500 h-full px-2 rounded-r"
                            >
                              <span className="m-auto text-2xl font-normal">
                                +
                              </span>
                            </button>
                          </div>
                          <div className="text-center">
                            {cartItem.weight + " "}Grams
                          </div>
                        </div>
                      )}
                      {/* Quantity */}
                      <div className="w-24">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                          <button
                            onClick={() => decrementQuantity(cartItem)}
                            data-action="decrement"
                            className="bg-gray-300 text-gray-600 hover:text-white hover:bg-red-500 h-full px-2 rounded-l"
                          >
                            <span className="m-auto text-2xl font-normal">
                              −
                            </span>
                          </button>
                          <div className="p-2 bg-gray-200">
                            {cartItem.quantity}
                          </div>
                          <button
                            onClick={() => incrementQuantity(cartItem)}
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-white hover:bg-green-500 h-full px-2 rounded-r"
                          >
                            <span className="m-auto text-2xl font-normal">
                              +
                            </span>
                          </button>
                        </div>

                        <div className="text-center">
                          {cartItem.quantity + " "}Quantity
                        </div>
                      </div>
                      {/* Total per item */}
                      <div>
                        <div className="leading-5">
                          <p className="font-semibold not-italic">
                            ₹{" "}
                            {cartItem.price * //15
                              cartItem.quantity * //1
                              (cartItem.weight /
                                ((cartItem.category === "snacks" &&
                                  cartItem.name != "Veg Samosa") ||
                                cartItem.category === "vathal" ||
                                cartItem.category === "savouries"
                                  ? 100
                                  : cartItem.category === "poli" ||
                                    cartItem.name === "Veg Samosa"
                                  ? 1
                                  : 250))}
                          </p>
                          <small className="text-gray-400">
                            ₹ {cartItem.price} /{" "}
                            {cartItem.category === "vathal" ||
                            cartItem.category === "savouries" ||
                            (cartItem.category === "snacks" &&
                              cartItem.name != "Veg Samosa")
                              ? 100 + "g"
                              : cartItem.category === "poli" ||
                                cartItem.name === "Veg Samosa"
                              ? 5 + " Pieces"
                              : 250 + "g"}
                          </small>
                        </div>
                      </div>
                      {/* Remove */}
                      <div className="flex-auto">
                        <div className="float-right">
                          <a
                            onClick={() =>
                              deleteItemFromCart(cartItem?.product)
                            }
                            className="px-4 py-2 inline-block text-white bg-red-600 shadow-sm border border-gray-200 rounded-md cursor-pointer"
                          >
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </article>
            </main>

            {/* Total price per cart */}
            <aside className="md:w-1/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <ul className="mb-5">
                  <li className="text-lg font-bold flex justify-between pt-3">
                    <span>Total price:</span>
                    <span>₹ {totalPrice}</span>
                  </li>
                </ul>

                {user && user.uid && totalPrice > 300 ? (
                  user.firstName != "" ? (
                    <Link
                      href={`/checkout?userId=${user.uid}`}
                      className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    >
                      Continue
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-3 text-red-600 rounded-md text-center p-2">
                      Please fill your profile first
                      <Link
                        href={`/profile?userId=${user.uid}`}
                        className="p-2 md:p-3 inline-block text-lg w-full text-center font-medium text-white text-center bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                      >
                        Profile
                      </Link>
                    </div>
                  )
                ) : (
                  <div className="text-red-600 rounded-md text-center p-4">
                    Delivery is done for orders above ₹300 !!
                  </div>
                )}

                <Link
                  href="/"
                  className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 mt-4"
                >
                  Back to shop
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
