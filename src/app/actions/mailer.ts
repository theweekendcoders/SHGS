"use server"

export const Mailer1 = async (
    response: any,
    cart: any,
    user: any,
    grandTotal: any
) => {
    console.log("Mailer1 is called");
    const Response = response as String;
    const Cart = cart as String;
    const User = user as String;
    const GrandTotal = grandTotal as String;
    
    const res = await fetch("https://shgs.vercel.app/api/mail", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Response,
            Cart,
            User,
            GrandTotal
        })
    })

    return res.json();
}

export const Mailer2 = async (
    cart: any,
    user: any,
    grandTotal: any
) => {
    console.log("Mailer2 is called");
    const Cart = cart as String ;
    const User = user as String;
    const GrandTotal = grandTotal as String;
    
    const res = await fetch("https://shgs.vercel.app/api/mail", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Cart,
            User,
            GrandTotal
        })
    })

    return res.json();
}
