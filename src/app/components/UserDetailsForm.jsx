"use client"

import React, { useState } from 'react'
import { toast } from 'react-toastify'

const UserDetailsForm = () => {

    const [formValues, setFormValues] = useState({
        firstName: "Mahesh Kumar",
        lastName: "Venkatesan",
        email: "maheshkumarvenkatesan03@gmail.com",
        mobile: "9789260864",
        street: "No.92m 1st West Street, Periyar Nagar",
        city: "Tiruttani",
        district: "Thiruvallur",
        state: "Tamil Nadu",
        pincode: "631209",
    });

    // const [formValues, setFormValues] = useState({
    //     firstName: '',
    //     lastName: '',
    //     mailid: '',
    //     mobile: '',
    //     street: '',
    //     city: '',
    //     district:'',
    //     state:'',
    //     pincode:'',
    // });


    return (
        <form action={async (formData) => {
            const data = await personalDetails(formData, uid)
            if(data.status === 200 || data.status === 409){
                toast.success('Updated Successfully',{
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  })
            }
        }}>
            <div className='m-2 flex flex-col gap-4'>
                <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                    <div>
                        <label htmlFor="firstName" className='block font-medium'>First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="Enter your first name" value={formValues.firstName} required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                    <div>
                        <label htmlFor="lastName" className='block font-medium'>Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Enter your last name" value={formValues.lastName} required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                    <div>
                        <label htmlFor="mailid" className='block font-medium'>Email ID</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email ID" value={formValues.email} required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                    <div>
                        <label htmlFor="mobile" className='block font-medium'>Mobile Number</label>
                        <input type="tel" name="mobile" id="mobile" placeholder="Enter your mobile number" value={formValues.mobile} required maxLength={10} className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                </div>
            </div>
            <h1 className='m-2 mt-4 text-2xl font-medium'>Address</h1>
            <div className='m-2 flex flex-col gap-4'>
                <div>
                    <label htmlFor="street" className='block font-medium'>Street Name</label>
                    <input type="text" name="street" id="street" placeholder="Enter your street name" value={formValues.street} required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[965px]' />
                </div>
                <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                    <div>
                        <label htmlFor="city" className='block font-medium'>City / Town</label>
                        <input type="text" name="city" id="city" placeholder="Enter your city name" value={formValues.city} required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                    <div>
                        <label htmlFor="district" className='block font-medium'>District</label>
                        <input type="text" name="district" id="district" placeholder="Enter your district name" value={formValues.district} required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                    <div>
                        <label htmlFor="state" className='block font-medium'>State</label>
                        <input type="text" name="state" id="state" placeholder="Enter your state name" value={formValues.state} required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                    <div >
                        <label htmlFor="pincode" className='block font-medium'>Pincode</label>
                        <input type="text" name="pincode" id="pincode" placeholder="Enter your pincode" value={formValues.pincode} required maxLength={6} className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                    </div>
                </div>
                <input type="submit" className='w-full p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]' value='Save' />
            </div>
        </form>

    )
}

export default UserDetailsForm
