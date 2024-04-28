import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";

const Products = ({ products, item_name }) => {
  const groupedSweets = {};

  // Group the sweets by category
  products.forEach((sweet) => {
    const category = sweet.category;
    if (!groupedSweets[category]) {
      groupedSweets[category] = [];
    }
    groupedSweets[category].push(sweet);
  });

  return (
    <div>
      <Navbar></Navbar>
      {Object.keys(groupedSweets).map((category) => (
        <div key={category} className="my-10">
          <h2 className="font-normal text-3xl my-14 capitalize">
            {category === "undefined" ? item_name : category}
          </h2>
          <div className="flex flex-col md:gap-10 lg:gap-20 md:flex-row flex-wrap">
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
                    <p>Price: {sweet.price}</p>
                  </div>
                  <button className="px-12 py-3 bg-[#F74541] rounded-full text-white font-medium">
                    Add
                  </button>
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
