'use client';
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CheckoutPage from "../components/CheckoutPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const getData = async (uid: string | null) => {
  const res = await fetch(
    "http://localhost:3000/api/personalDetails/fetchData",
    {
      cache: "no-store",
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

const Page = () => {
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();
  const uid = searchParams.get("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getData(uid);
        if (details && details.user_details && details.user_details.length > 0) {
          setUser(details.user_details[0]);
        } else {
          console.error("User details not found or invalid data structure:", details);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid]);

  return (
    <div className="">
      <Navbar/>
      {user && <CheckoutPage User={user} />}
      <Footer />
    </div>
  );
};

export default Page;
