import React from "react";
import Image from "next/image";
import Link from "next/link";
import { link } from "fs";
// import BlackCursor from "./BlackCursor";

const Footer = () => {
  const categories = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Sweets",
      link: "/menu/sweets",
    },
    {
      name: "Savouries",
      link: "/menu/savouries",
    },
    {
      name: "Snacks",
      link: "/menu/snacks",
    },
    {
      name: "Vathal",
      link: "/menu/vathal",
    },
    {
      name: "Milk Items",
      link: "/menu/milk_items",
    },
    {
      name: "Poli",
      link: "/menu/poli",
    },
  ];

  return (
    <>
    {/* <BlackCursor /> */}
      <section className="bg-white flex flex-col text-black p-4 md:gap-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="mt-4">
            <Link href="/" className="flex flex-row gap-4 justify-center items-center">
              <Image
                src="/assets/logo.svg"
                width={120}
                height={120}
                alt="Logo"
                className="w-[64px] h-[64px] md:w-[120px] md:h-[120px]"
              />
              <span className="text-[20px] md:text-[25px] lg:text-[28px] font-regular">Sree Hariganesh Sweets</span>
            </Link>
          </div>

          <div className="flex flex-col gap-10 lg:gap-20 lg:flex-row lg:mt-12">
            <div>
              <h2 className="text-xl text-red-700 font-bold mb-2">Content</h2>
              {categories.map((category) => (
                <Link href={category.link} key={category.name}>
                  <h1 className="hover:text-red-600 text-xl font-light transition-all">
                    {category.name}
                  </h1>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-10 lg:mr-10">
              <div className="flex flex-col gap-10 lg:flex-row">
                <div>
                  <h2 className="text-xl text-red-700 font-medium mb-2">
                    Contact
                  </h2>
                  <p className=" font-light text-lg">+91 9789420775</p>
                </div>
                <div>
                  <h2 className="text-xl text-red-700 font-medium mb-2">
                    Email ID
                  </h2>
                  <p className=" font-light text-lg">
                    govindarajsakm@gmail.com
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl text-red-700 font-medium mb-2">  
                  Address
                </h2>
                <p className="font-light text-lg">
                  2/40, 4th Street, S V M Nagar, Palanipet, Arakkonam - 631002.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-[1px] border-gray-300 my-10"/>
        <div className="flex flex-col gap-2 lg:flex-row justify-between">
          <p className="font-light text-lg mb-4">
            Copyright© 2024 SHGS All Rights Reserved.
          </p>
          <p className="font-light text-lg mb-4">
            Powered by{" "}
            <Link href="https://theweekendcoders.vercel.app" className="underline text-red-500">
              theweekendcoders
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
