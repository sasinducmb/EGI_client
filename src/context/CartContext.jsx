import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize the cart from local storage or set it to an empty array if not present
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
  
      if (existingItem) {
        // If the item already exists in the cart, update the quantity
        return prevCart.map((cartItem) => {
          if (cartItem.name === item.name) {
            const updatedQuantity = cartItem.quantity + 1;
            const updatedSubtotal = (updatedQuantity * cartItem.price).toFixed(2);
            return { ...cartItem, quantity: updatedQuantity, subtotal: updatedSubtotal };
          } else {
            return cartItem;
          }
        });
      } else {
        // If the item is new, add it with quantity 1 and its initial subtotal
        const initialSubtotal = (item.price).toFixed(2);
        return [...prevCart, { ...item, quantity: 1, subtotal: initialSubtotal }];
      }
    });
  };
  

  // Function to remove an item from the cart
  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  // Function to update quantity of an item in the cart
  const updateQuantity = (itemName, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.name === itemName) {
          // Calculate the new subtotal based on the new quantity
          const newSubtotal = (newQuantity * item.price).toFixed(2);
          return { ...item, quantity: newQuantity, subtotal: newSubtotal };
        } else {
          return item;
        }
      })
    );
  };
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  // Effect hook to update local storage when the cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity ,total}}
    >
      {children}
    </CartContext.Provider>
  );
};
