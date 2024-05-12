"use client"

import React, {useEffect} from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { UserAuth } from '../context/AuthContext'
import { useRouter } from "next/navigation";

const page = () => {
    const { user, googleSignIn, logOut } = UserAuth()
    const router = useRouter();

    const handleSignIn = async() => {
        try{
            await googleSignIn()
            router.push('/')
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='my-14'>
            <h1 className='text-2xl font-medium text-center my-14'>Login</h1>
            <div className='flex justify-center height-[60%]' >
                <div className='border-2 border-gray-100 p-4 lg:p-10 rounded-lg flex flex-col gap-6'>
                    <button className='shadow-[0_5px_60px_-15px_rgba(0,0,0,0.3)] px-14 py-4 flex justify-center items-center gap-5 rounded-full hover:scale-105 duration-200' onClick={handleSignIn}>
                        <Image
                            src='/assets/google.png'
                            width={32}
                            height={32}
                            alt="hero image"
                            className=""
                        />
                        <p className='font-medium'>Continue With Google</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page
