// CartContext.jsx - WITH DEBUG LOGS
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItemCart, setTotalItemCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart based on user login state
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
        loadGuestCart();
      }
    } else {
      // Guest user - load from localStorage
      console.log('👻 Guest user - loading from localStorage');
      loadGuestCart();
    }
  };

  const loadGuestCart = () => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    console.log('📦 Guest cart loaded:', guestCart);
    setCart(guestCart);
    setTotalItemCart(guestCart.length);
    calculateTotal(guestCart);
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
    console.log('💰 Total calculated:', total);
    setTotalPrice(total);
  };

  // Add to cart
  const addToCart = async (item, quantity = 1) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('🛒 Adding to cart:', item);

    if (userStr && token) {
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
      }
    } else {
      // Guest user - save to localStorage
      console.log('👻 Guest user - saving to localStorage');
      
      const existingItem = cart.find(c => c._id === item._id);
      let updatedCart;
      
      if (existingItem) {
        console.log('📝 Updating existing item');
        updatedCart = cart.map(c => 
          c._id === item._id 
            ? { ...c, quantity: c.quantity + quantity }
            : c
        );
      } else {
        console.log('➕ Adding new item');
        updatedCart = [...cart, { ...item, quantity }];
      }
      
      console.log('💾 Updated cart:', updatedCart);
      setCart(updatedCart);
      setTotalItemCart(updatedCart.length);
      calculateTotal(updatedCart);
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('🗑️ Removing from cart:', itemId);

    if (userStr && token) {
      // Logged-in user - remove from backend
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
    } else {
      // Guest user - remove from localStorage
      const updatedCart = cart.filter(item => item._id !== itemId);
      console.log('💾 Updated cart after removal:', updatedCart);
      setCart(updatedCart);
      setTotalItemCart(updatedCart.length);
      calculateTotal(updatedCart);
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
  };

  // Update quantity
  const updateQuantity = async (itemId, quantity) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('🔢 Updating quantity:', { itemId, quantity });

    if (userStr && token) {
      // Logged-in user
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
    } else {
      // Guest user
      const updatedCart = cart.map(item =>
        item._id === itemId ? { ...item, quantity } : item
      );
      console.log('💾 Updated cart with new quantity:', updatedCart);
      setCart(updatedCart);
      calculateTotal(updatedCart);
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
  };

  // Merge guest cart with user cart on login
  const mergeGuestCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (guestCart.length > 0 && userStr && token) {
      try {
        const user = JSON.parse(userStr);
        console.log('🔀 Merging guest cart:', guestCart);
        
        await axios.post(`/user/${user._id}/cart/merge`, 
          { items: guestCart },
          { headers: { Authorization: `Bearer ${token}` }}
        );
        
        localStorage.removeItem('guestCart');
        console.log('✅ Cart merged successfully');
        await loadCart();
      } catch (err) {
        console.error('❌ Error merging cart:', err.response?.data || err.message);
      }
    }
  };

  // Clear cart
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
    } else {
      localStorage.removeItem('guestCart');
    }
    
    setCart([]);
    setTotalItemCart(0);
    setTotalPrice(0);
  };

  // Load cart on mount
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
      loadCart,
      mergeGuestCart
    }}>
      {children}
    </CartContext.Provider>
  );
};