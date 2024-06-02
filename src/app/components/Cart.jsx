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
    const newWgt = cartItem?.weight + 250;
    const item = { ...cartItem, weight: newWgt };
    if (newWgt > 1000) return;
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
    const newWgt = cartItem?.weight - 250;
    const item = { ...cartItem, weight: newWgt };
    if (newWgt < 250) return;
    addItemToCart(item);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart?.cartItems?.forEach((cartItem) => {
      totalPrice += cartItem.price * cartItem.quantity * (cartItem.weight / 250);
    });
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <>
      {cart?.cartItems?.length < 1 ? (
        <section className="py-5 sm:py-7">
          <div>
            <div className="flex flex-col justify-center items-center h-[600px] md:h-[700px] gap-4">
              <h1 className="font-medium text-4xl md:text-[64px] text-center">
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
          </div>
        </section>
      ) : (
        <>
          <section className="py-5 sm:py-7 bg-blue-100">
            <div className="container max-w-screen-xl mx-auto px-4">
              <h2 className="text-3xl font-semibold mb-2">
                {cart?.cartItems?.length || 0} Item(s) in Cart
              </h2>
            </div>
          </section>
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
                                <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                  <Image
                                    src={cartItem.image}
                                    width={300}
                                    height={300}
                                    alt={cartItem.name}
                                    className="flex w-[70px] h-[70px] object-cover"
                                  />
                                </div>
                              </div>
                              <figcaption className="ml-3">
                                <p>{cartItem.name}</p>
                                <p>{cartItem.special}</p>
                              </figcaption>
                            </figure>
                          </div>

                          {/* Weight */}
                          <div className="flex flex-col">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
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
                                {cartItem.weight}
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
                          <div>
                            <div className="leading-5">
                              <p className="font-semibold not-italic">
                                ₹{" "}
                                {cartItem.price *
                                  cartItem.quantity *
                                  (cartItem.weight / 250)}
                              </p>
                              <small className="text-gray-400">
                                ₹ {cartItem.price} / 250g
                              </small>
                            </div>
                          </div>
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
                <aside className="md:w-1/4">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    <ul className="mb-5">
                      <li className="text-lg font-bold flex justify-between pt-3">
                        <span>Total price:</span>
                        <span>₹ {totalPrice}</span>
                      </li>
                    </ul>

                    {user && user.uid && totalPrice > 300 ? (
                      <Link
                        href={`/checkout?userId=${user.uid}`}
                        className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                      >
                        Continue
                      </Link>
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
      )}
    </>
  );
};

export default Cart;
