"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useSearchParams } from "next/navigation";
import UserDetailsForm from "../components/UserDetailsForm";
import Footer from "../components/Footer";

const getData = async (uid: string | null) => {
  const res = await fetch(
    "https://shgs.vercel.app/api/personalDetails/fetchData",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    }
  );
  if (!res.ok) {
    throw new Error("Something Went Wrong");
  }
  return res.json();
};

const page = async () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("userId");
  const details = await getData(uid);
  const user = details.user_details[0];

  return (
    <div className="">
      <Navbar />
      <div className="lg:flex lg:flex-col lg:justify-center lg:items-center md:h-[700px]">
      <h1 className="font-medium font-bold text-3xl md:text-[32px] mb-4 
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative">
            Personal Details
          </h1>
        <div className="lg:max-w-fit">
          <UserDetailsForm data={user} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
