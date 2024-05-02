"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const Links = [
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

  const [selectMenu, setSelectMenu] = useState(false);

  const toggleSelectMenu = () => {
    setSelectMenu(!selectMenu);
  };

  return (
    <div className="flex flex-row bg-gray-100 p-4 justify-between items-center">
      <Link href="/">
      <div className="flex flex-row gap-1 items-center">
        <Image src="/assets/logo.svg" width={60} height={60} alt="menu" />
        <h1 className="text-[20px] font-medium hidden sm:block md:block lg:block">Sree Hariganesh Sweets</h1>
      </div>
      </Link>
      <Image
        src="/assets/menu.svg"
        width={32}
        height={32}
        alt="menu"
        className="flex xl:hidden"
        onClick={toggleSelectMenu}
      />
      {selectMenu && (
        <div
          className={
            selectMenu
              ? "absolute bottom-0 right-0 top-0 z-10 h-[100%] flex flex-col gap-4 text-white backdrop-blur-2xl bg-black/40 w-[300px] pr-4 pt-14 ease-in duration-200"
              : "absolute bottom-0 right-0 hidden top-0 z-10 h-screen flex-col gap-4 text-white backdrop-blur-2xl bg-black/40 w-[300px] pr-4 pt-14 ease-in duration-200"
          }
        >
          <div className="flex flex-col justify-end items-end gap-10 w-full">
            <Image
              src="/assets/close.svg"
              width={30}
              height={30}
              alt="close"
              onClick={toggleSelectMenu}
              className=" w-[32px] h-[32px] ml-8 xl:hidden"
            />
            <div className="flex flex-col gap-8 items-end">
              {Links.map((link, index) => (
                <Link
                  href={link.link}
                  key={index}
                  className={`relative font-medium text-2xl ${
                    pathname === link.link
                      ? `underline decoration-wavy underline-offset-8`
                      : ` underline-offset-8 after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 after:top-7 hover:after:w-full after:transition-all after:duration-300 cursor-pointer`
                  }`}
                  onClick={toggleSelectMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link href='/'>
                <h1 className="absolute font-medium text-2xl bottom-10 right-8">Login</h1>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="hidden xl:flex lg:flex-row lg:justify-between lg:items-center text-black text-lg gap-10 font-normal tracking-tight">
        {Links.map((link, index) => (
          <Link
            href={link.link}
            key={index}
            className={`relative font-normal ${
              pathname === link.link
                ? `underline underline-offset-8`
                : ` underline-offset-8 after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 after:top-7 hover:after:w-full after:transition-all after:duration-300 cursor-pointer`
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link href='/'>
        <Image
              src="/assets/cart.png"
              width={48}
              height={48}
              alt="close"
              onClick={toggleSelectMenu}
              className=" w-[32px] h-[32px]"
            />
        </Link>
        <Link href='/'>
        <Image
              src="/assets/profile.png"
              width={48}
              height={48}
              alt="close"
              onClick={toggleSelectMenu}
              className=" w-[32px] h-[32px]"
            />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
