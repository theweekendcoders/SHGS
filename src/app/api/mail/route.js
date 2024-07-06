const nodemailer = require("nodemailer");

import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();
      const cart = data.Cart.cartItems;
      const user = data.User;
      const grandTotal = data.GrandTotal;
      console.log(cart, user.email, grandTotal);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hariganeshsweets@gmail.com",
          pass: "vrfw izpn pxem sqec", // changed2
        },
      });

      const AdminEmail = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Order Confirmation</title>
            <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  h1 { color: #e74c3c; text-align: center; }
                  th { text-align: left; margin-bottom: 10px;  }
                  table { border-collapse: collapse; width: 100%; }
                  .order-details { background-color: #f9f9f9; text-align: start; padding: 15px; border-radius: 5px; border: 2px solid black; }
                  .item { margin-bottom: 10px; }
                  tr { border-bottom: 1px solid #cccc; }
                  .customer-info { margin-top: 20px; background-color: #f9f9f9; text-align: start; padding: 15px; border-radius: 5px; border: 2px solid black;}
                  .total { font-weight: bold; margin-top: 20px; text-align: right; }
            </style>
        </head>
        <body>
            <div class="container">
            <h1>🎉 New Order Received! 🎉</h1>
        
            <div class="order-details">
            <h2>Ordered Items:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr class="item">
                            <td><strong>${item.name}</strong></td>
                            <td>${item.quantity}</td>
                            <td>${item.weight}g</td>
                            <td>₹${item.price} x ${item.quantity}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        
            <div class="customer-info">
              <h2>Customer Details:</h2>
              <p><strong>Name:</strong> ${user.firstName}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Number:</strong> ${user.mobile}</p>
              <p><strong>Address:</strong> ${user.street}, ${user.city}, ${user.state}</p>
            </div>
        
            <div class="total">
              <h2>Grand Total: ₹${grandTotal}</h2>
            </div>
            </div>
        </body>
        </html>
        `;
      const CustomerEmailTemplate = `
          <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SHGS order receipt</title>
            <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  h1 { color: #e74c3c; text-align: center; }
                  th { text-align: left; margin-bottom: 10px;  }
                  button { text-color: #ffffff; padding: 10px; background-color: #d65745; border-radius: 5px; margin-bottom:10px; display:flex; justify-content: center; align-items: center; width: 150px; height: 40px; text-align: center; }
                  table { border-collapse: collapse; width: 100%; }
                  .order-details { background-color: #f9f9f9; text-align: start; padding: 15px; border-radius: 5px; border: 2px solid black; }
                  .item { margin-bottom: 10px; }
                  tr { border-bottom: 1px solid #cccc; }
                  .customer-info { margin-top: 20px; background-color: #f9f9f9; text-align: start; padding: 15px; border-radius: 5px; border: 2px solid black;}
                  .total { font-weight: bold; margin-top: 20px; text-align: right; }
            </style>
        </head>
        <body>
            <div class="container">
            <h1>🎉 Thank you for ordering from SHGS! 🎉</h1>
            <a href="www.hariganeshsweets.com">Visit our site to order more!</a>
            <div class="order-details">
            <h2>Ordered Items:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr class="item">
                            <td><strong>${item.name}</strong></td>
                            <td>${item.quantity}</td>
                            <td>${item.weight}g</td>
                            <td>₹${item.price} x ${item.quantity}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
            <div class="total">
              <h2>Grand Total: ₹${grandTotal}</h2>
            </div>
            </div>
        </body>
        </html>
        `;

      const customerMailOptions = {
        from: "hariganeshsweets@gmail.com", // Replace with your email
        to: user.email,
        subject: `Thank you for contacting us ${user.firstName}`,
        html: CustomerEmailTemplate,
      };

      await new Promise((resolve, reject) => {
        transporter.sendMail(customerMailOptions, (error, info) => {
          if (error) {
            console.error(
              "Error sending acknowledgment email to the customer:",
              error
            );
            reject(error);
          } else {
            console.log("Acknowledgment email sent to the customer");
            resolve(info);
          }
        });
      });

      // Send form submission email to the admin
      const adminMailOptions = {
        from: "hariganeshsweets@gmail.com", // Replace with your email
        to: "hariganeshsweets@gmail.com", // Replace with admin email
        subject: "There's an Order!!",
        html: AdminEmail,
      };

      await new Promise((resolve, reject) => {
        transporter.sendMail(adminMailOptions, (error, info) => {
          if (error) {
            console.error(
              "Error sending form submission email to the admin:",
              error
            );
            reject(error);
          } else {
            console.log("Form submission email sent to the admin");
            resolve(info);
          }
        });
      });

      return NextResponse.json(
        { status: 200 },
        { message: "Email Sent Successfully" }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 500 });
  }
};
