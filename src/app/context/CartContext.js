'use client';

import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter;

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []
    );
  };

  const addItemToCart = async ({ 
    product, 
    name, 
    image, 
    category, 
    price, 
    quantity = 1, 
    weight = (category === 'vathal' || category === 'savouries' || (category === 'snacks' && name !== 'Veg Samosa')) ? 100 : 250
  }) => {
    const item = { 
      product, 
      name, 
      image, 
      category, 
      price, 
      quantity, 
      weight,
    };

    const isItemExist = cart?.cartItems?.find((i) => i.product === item.product);

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const itemToRemove = cart?.cartItems?.find((item) => item.product === id);
    const newCartItems = cart?.cartItems?.filter((item) => item.product !== id);
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} has been removed from the cart`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;