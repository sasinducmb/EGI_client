import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItemCart, setTotalItemCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart - only for authenticated users
  const loadCart = async () => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('🔍 Loading cart...', { userStr, token: !!token });

    if (userStr && token) {
      // User is logged in - fetch from backend
      try {
        const user = JSON.parse(userStr);
        console.log('👤 User logged in:', user._id);
        
        const response = await axios.get(`/user/${user._id}/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('✅ Cart loaded from backend:', response.data);
        
        const cartData = response.data.cart || [];
        setCart(cartData);
        setTotalItemCart(cartData.length);
        calculateTotal(cartData);
      } catch (err) {
        console.error('❌ Error loading cart:', err.response?.data || err.message);
        setCart([]);
        setTotalItemCart(0);
        setTotalPrice(0);
      }
    } else {
      // No user logged in - clear cart
      console.log('❌ No user logged in - cart cleared');
      setCart([]);
      setTotalItemCart(0);
      setTotalPrice(0);
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
    console.log('💰 Total calculated:', total);
    setTotalPrice(total);
  };

  // Add to cart - requires authentication
  const addToCart = async (item, quantity = 1) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('🛒 Adding to cart:', item);

    if (!userStr || !token) {
      console.log('❌ User not authenticated - cannot add to cart');
      throw new Error('Authentication required');
    }

    // Logged-in user - save to backend
    try {
      const user = JSON.parse(userStr);
      console.log('📤 Sending to backend:', { productId: item._id, quantity });
      
      const response = await axios.post(`/user/${user._id}/cart`, 
        { productId: item._id, quantity },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      console.log('✅ Backend response:', response.data);
      await loadCart(); // Refresh cart
    } catch (err) {
      console.error('❌ Error adding to cart:', err.response?.data || err.message);
      throw err;
    }
  };

  // Remove from cart - requires authentication
  const removeFromCart = async (itemId) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('🗑️ Removing from cart:', itemId);

    if (!userStr || !token) {
      console.log('❌ User not authenticated');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      await axios.delete(`/user/${user._id}/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Item removed from backend');
      await loadCart(); // Refresh cart
    } catch (err) {
      console.error('❌ Error removing from cart:', err.response?.data || err.message);
    }
  };

  // Update quantity - requires authentication
  const updateQuantity = async (itemId, quantity) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('🔢 Updating quantity:', { itemId, quantity });

    if (!userStr || !token) {
      console.log('❌ User not authenticated');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      await axios.put(`/user/${user._id}/cart/${itemId}`, 
        { quantity },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      console.log('✅ Quantity updated in backend');
      await loadCart();
    } catch (err) {
      console.error('❌ Error updating quantity:', err.response?.data || err.message);
    }
  };

  // Clear cart - requires authentication
  const clearCart = async () => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        await axios.delete(`/user/${user._id}/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Cart cleared in backend');
      } catch (err) {
        console.error('❌ Error clearing cart:', err.response?.data || err.message);
      }
    }
    
    setCart([]);
    setTotalItemCart(0);
    setTotalPrice(0);
  };

  // Load cart on mount and when user state changes
  useEffect(() => {
    console.log('🚀 CartContext mounted');
    loadCart();

    const handleStorageChange = () => {
      console.log('🔄 Storage changed - reloading cart');
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userStateChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userStateChange', handleStorageChange);
    };
  }, []);

  // Debug: Log cart changes
  useEffect(() => {
    console.log('📊 Cart state updated:', { 
      items: cart.length, 
      total: totalPrice,
      cart 
    });
  }, [cart, totalPrice]);

  return (
    <CartContext.Provider value={{
      cart,
      totalItemCart,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};