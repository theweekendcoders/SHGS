"use server"

import { NextRequest } from "next/server"

export const personalDetails = async(formdata: FormData, userId: string|null) => {
    // console.log(formdata)

    // console.log(userId)
    
    const firstName = formdata.get("firstName")
    const lastName = formdata.get("lastName")
    const mailid = formdata.get("email")
    const mobile = formdata.get("mobile")
    const street = formdata.get("street")
    const city = formdata.get("city")
    const district = formdata.get("district")
    const state = formdata.get("state")
    const pincode = formdata.get("pincode")

    const res = await fetch("http://localhost:3000/api/personalDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            mailid,
            mobile,
            street,
            city,
            district,
            state,
            pincode,
            userId
        })
    })

    const data = await res.json()
    console.log(data)
    return data
}