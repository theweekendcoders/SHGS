"use client"
import React from 'react'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'next/navigation'
import  UserDetailsForm from '../components/UserDetailsForm'

const getData = async (uid: string | null) => {
    const res = await fetch("http://localhost:3000/api/personalDetails/fetchData", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uid })
     });
    if(!res.ok){
        throw new Error("Something Went Wrong")
    }
    return res.json();

}

const page = async() => {
    const searchParams = useSearchParams()
    const uid = searchParams.get('userId')
    const details = await getData(uid)
    const user = details.user_details[0]

    
    return (
        <div className=''>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-[800px]'>
                <div className='lg:max-w-fit'>
                    <h1 className='m-2 text-2xl font-medium'>Personal Details</h1>
                    <UserDetailsForm data={user}/>
                </div>
            </div>
        </div>
    )
}

export default page
