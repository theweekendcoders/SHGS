"use client";

import React from "react";
import Image from "next/image";
import CartContext from "../context/CartContext";
import { useContext } from "react";

const SpecialCombos = ({ combos }) => {

  const { addItemToCart } = useContext(CartContext);
  const addToCartHandler = (sweet) => {
    addItemToCart({
      product: sweet._id,
      name: sweet.name,
      // image: sweet.image,
      price: sweet.price,
      quantity: 1,
      weight: 250
    });
    window.location.reload();
    console.log(sweet.name);
    console.log(" successfully added to the Cart!");  
  };
  return (
    <section className="my-14 ">
      <h1 className="text-center font-normal text-3xl">Special Combos</h1>
      <div className="my-14 w-full">
        <div className="grid grid-flow-col gap-10 overflow-x-scroll py-5 lg:overflow-x-auto lg:justify-items-center">
          {combos.map((item, index) => (
            <div
              className="w-[250px] rounded-3xl flex flex-col shadow-xl hover:scale-105 hover:transition-all hover:ease-in"
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
                <h1 className=" font-[400] text-xl">{item.name}</h1>
                <h2 className=" text-lg">Rs.{item.price}</h2>
                <p>/ 250g</p>
                <p className="flex justify-center items-center text-xl text-red-500 mt-4">{item.special} Special</p>
              </div>
              <div className="p-2 flex justify-center items-center ">
              {(item.stock == true || item.stock === "inStock") ? (
                    <button
                      onClick={() => addToCartHandler(item)}
                      className="px-auto py-3 bg-[#F74541] w-[100px] h-[50px] text-center rounded-full text-white font-medium"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-12 py-3 bg-gray-400 rounded-full text-white font-medium"
                    >
                      Out of Stock
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
