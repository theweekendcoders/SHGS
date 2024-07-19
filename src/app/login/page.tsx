"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-14 flex flex-col items-center justify-center">
      <h1
        className="my-8 font-bold text-3xl md:text-4xl my-14 
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative"
      >
        Login to proceed
      </h1>
      <div className="flex items-center justify-center">
        <div className="rounded-lg flex flex-col gap-6">
          <button
            className="shadow-[0_5px_60px_-15px_rgba(0,0,0,0.3)] bg-white px-14 py-4 flex justify-center items-center gap-5 rounded-full hover:scale-105 duration-200"
            onClick={handleSignIn}
          >
            <Image
              src="/assets/google.png"
              width={32}
              height={32}
              alt="hero image"
              className=""
            />
            <p className="font-medium">Continue With Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
