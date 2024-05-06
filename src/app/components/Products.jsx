"use client";
import React, { useContext } from "react";
import Image from "next/image";
import CartContext from "../context/CartContext";

const Products = ({ products, item_name }) => {
  const groupedSweets = {};

  const { addItemToCart } = useContext(CartContext);

  // Group the sweets by category
  products.forEach((sweet) => {
    const category = sweet.category;
    if (!groupedSweets[category]) {
      groupedSweets[category] = [];
    }
    groupedSweets[category].push(sweet);
  });

  const addToCartHandler = (sweet) => {
    addItemToCart({
      product: sweet._id,
      name: sweet.name,
      image: sweet.image,
      price: sweet.price,
      quantity: 1,
      weight: 250
    });
    console.log(sweet.name);
    console.log(" successfully added to the Cart!");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const combinedHandler = (sweet) => {
    addToCartHandler(sweet);
    refreshPage();
  };

  return (
    <div>
      {Object.keys(groupedSweets).map((category) => (
        <div key={category} className="my-10">
          <h2 className="font-normal text-3xl my-14 capitalize">
            {category === "undefined" ? item_name : category}
          </h2>
          <div className="flex flex-col gap-10 md:gap-10 lg:gap-20 md:flex-row flex-wrap">
            {groupedSweets[category].map((sweet) => (
              <div
                key={sweet._id}
                className="md:w-[300px] lg:w-[350px] border border-black rounded-lg bg-white p-4"
              >
                {/* <Image
                    src={sweet.image}
                    width={300}
                    height={300}
                    alt={sweet.name}
                /> */}
                <div className="flex flex-row justify-between">
                  <div>
                    <h3>{sweet.name}</h3>
                    <p>Price: ₹{sweet.price}</p>
                  </div>
                  {sweet.stock ? (
                    <button
                      onClick={() => combinedHandler(sweet)}
                      className="px-12 py-3 bg-[#F74541] rounded-full text-white font-medium"
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
