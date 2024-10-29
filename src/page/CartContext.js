import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== product.id)); // ลบสินค้าที่มี id ตรงกัน
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
