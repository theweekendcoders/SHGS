"use server"

export const paymentUsingRazorpay = async(amount) => {
  const response = await fetch("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  })

  const data = await response.json();
  return data;
  // console.log("This is from the actions " + data.id)
  
}