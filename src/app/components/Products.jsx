"use client";
import React, { useContext } from "react";
import Image from "next/image";
import CartContext from "../context/CartContext";
import { toast } from "react-toastify";
import { UserAuth } from "../context/AuthContext";
import Link from "next/link";

const Products = ({ products, item_name }) => {
  const groupedSweets = {};
  const { user } = UserAuth();

  const { addItemToCart } = useContext(CartContext);

  // Group the sweets by category
  products.forEach((sweet) => {
    const type = sweet.type;
    if (!groupedSweets[type]) {
      groupedSweets[type] = [];
    }
    groupedSweets[type].push(sweet);
  });

  const addToCartHandler = (sweet) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"))?.cartItems || [];
    const isItemInCart = cartItems.some((item) => item.product === sweet._id);

    if (isItemInCart) {
      toast.info(`${sweet.name} is already in the cart`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      addItemToCart({
        product: sweet._id,
        name: sweet.name,
        image: sweet.image,
        category: sweet.category,
        price: sweet.price,
        quantity: 1,
        weight : (sweet.category === 'vathal' || sweet.category === 'savouries' || (sweet.category === 'snacks' && sweet.name !== 'Veg Samosa')) ? 100 : (sweet.category === 'poli' || sweet.name === 'Veg Samosa') ? 1 : 250,
      });

      toast.success(`${sweet.name} successfully added to the cart!`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // window.location.reload();
      console.log(sweet.name+" successfully added to the Cart!");
    }
  };
  return (
    <div>
      {Object.keys(groupedSweets).map((type) => (
        <div key={type} className="my-10">
          <h2
            className="font-bold text-3xl md:text-4xl my-14 
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative"
          >
            <span className="relative inline-block">
              {type === "undefined" ? item_name : type}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </h2>
          <div className="flex flex-col gap-10 md:gap-10 lg:gap-20 md:flex-row flex-wrap items-center justify-center">
            {groupedSweets[type].map((sweet) => (
              <div
                key={sweet._id}
                className="flex flex-col gap-6 justify-center items-center md:w-[300px] lg:w-[350px] shadow-xl rounded-lg backdrop-blur-xl bg-[#8A9A5B]/20 p-4"
              >
                <Image
                  src={sweet.image}
                  width={300}
                  height={300}
                  alt={sweet.name}
                  className="flex object-cover w-[250px] h-[250px] mt-4 rounded-3xl"
                />
                <div className="flex flex-col gap-10 justify-between items-center w-full">
                  <div className="flex-shrink-0 text-center">
                    <h3 className="text-xl">{sweet.name}</h3>
                    <p className="text-green-600">Price: ₹{sweet.price}</p>
                    {sweet.name === "Veg Samosa" || sweet.category === "poli" ? (
                      <p>/ 5 pieces</p>
                    ) : (sweet.category === "savouries" || sweet.category === "vathal" || sweet.category === "snacks") ? (
                      <p>/ 100g</p>
                    ) : (
                      <p>/ 250g</p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {user === null ? (
                      <Link
                        disabled
                        href="/login"
                        className="px-3 py-3 bg-gray-800 rounded-full text-white font-medium animate-pulse"
                      >
                        Login to Buy
                      </Link>
                    ) : sweet.stock === true || sweet.stock === "inStock" ? (
                      <button
                        onClick={() => addToCartHandler(sweet)}
                        className="px-auto py-3 bg-[#006400] w-[200px] md:w-[250px] lg:w-[300px] h-[50px] text-center rounded-full text-white font-medium hover:scale-105 duration-300"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-12 py-3 bg-gray-400 rounded-full w-full text-white font-medium"
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
      ))}
    </div>
  );
};

export default Products;
