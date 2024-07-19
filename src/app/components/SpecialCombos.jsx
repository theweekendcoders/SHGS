"use client";

import React, { useContext } from "react";
import Image from "next/image";
import CartContext from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserAuth } from "../context/AuthContext";
import Link from "next/link";

const SpecialCombos = ({ combos }) => {
  const { addItemToCart } = useContext(CartContext);
  const { user } = UserAuth()

  const addToCartHandler = (sweet) => {
    addItemToCart({
      product: sweet._id,
      name: sweet.name,
      // image: sweet.image,
      price: sweet.price,
      quantity: 1,
      weight: 250
    });
    alert(sweet.name + " added to cart!");
  };

  return (
    <section className="my-32">
      <h1 className="font-bold text-3xl md:text-4xl my-14 text-[#E2725B] 
            capitalize text-center
            drop-shadow-md py-2 px-4
            rounded-lg
            relative">Special Combos</h1>
      <div className="my-14 w-full">
        <div className="grid grid-flow-col gap-10 overflow-x-scroll py-5 lg:overflow-x-auto lg:justify-items-center">
          {combos.map((item, index) => (
            <div
              className="w-[250px] rounded-3xl backdrop-blur-md bg-white/20 flex flex-col shadow-xl hover:scale-105 duration-300 hover:transition-all hover:ease-in"
              key={index}
            >
              <Image
                src="/assets/murukku.jpeg"
                width={1000}
                height={700}
                alt="item"
                className="object-cover rounded-br-none rounded-bl-none rounded-3xl"
              />
              <div className="flex flex-col">
                <div className="p-4">
                  <h1 className="font-[400] text-xl">{item.name}</h1>
                  <h2 className="text-lg">Rs.{item.price}</h2>
                  <p>/ 250g</p>
                  <p className="flex justify-center items-center text-xl text-red-500 mt-4">{item.special} Special</p>
                </div>
                <div className="p-2 flex justify-center items-center">
                {user === null ? (
                      <Link
                        disabled
                        href="/login"
                        className="px-3 py-3 bg-gray-800 rounded-full text-white font-medium animate-pulse"
                      >
                        Login to Buy
                      </Link>
                    ) : (
                      <button
                        onClick={() => addToCartHandler(item)}
                        className="px-auto py-3 bg-[#F74541] w-[200px] md:w-[250px] lg:w-[300px] h-[50px] text-center rounded-full text-white font-medium"
                      >
                        Add
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialCombos;