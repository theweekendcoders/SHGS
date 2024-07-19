'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center h-[600px] md:h-[700px] gap-4'>
        <h1 className='font-medium text-4xl md:text-[64px] text-center'>Thank You For Ordering!</h1>
        <p className='font-medium md:text-xl md:mt-4 text-center'>Your Order Details Will Be Shared In The Mail Soon.</p>
        <button onClick={()=> window.location.reload()} className='font-medium px-16 py-6 bg-black text-center text-white rounded-full md:mt-4'>
          Refresh the Page
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
