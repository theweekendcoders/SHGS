import React from 'react'
import {  CartProvider } from '../context/CartContext'

export function GlobalProvider ({ children }) {
  return (
    <CartProvider>
        {children}
    </CartProvider>
  )
}
