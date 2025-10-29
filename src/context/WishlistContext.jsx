import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [totalItemWishList, setTotalItemWishList] = useState(0);

  // Check if user is logged in
  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  };

  // Get current user ID
  const getCurrentUserId = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user._id;
      } catch (error) {
        console.error('Error parsing user:', error);
        return null;
      }
    }
    return null;
  };

  // Load wishlist (user-specific)
  const loadWishlist = () => {
    if (!isUserLoggedIn()) {
      console.log('👤 User not logged in - wishlist empty');
      setWishlist([]);
      setTotalItemWishList(0);
      return;
    }

    const userId = getCurrentUserId();
    if (userId) {
      try {
        const wishlistKey = `wishlist_${userId}`;
        const savedWishlist = localStorage.getItem(wishlistKey);
        const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
        console.log('📦 Loading wishlist for user:', userId, parsedWishlist);
        setWishlist(parsedWishlist);
        setTotalItemWishList(parsedWishlist.length);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlist([]);
        setTotalItemWishList(0);
      }
    }
  };

  // Save wishlist (user-specific)
  const saveWishlist = (items) => {
    if (!isUserLoggedIn()) {
      return;
    }

    const userId = getCurrentUserId();
    if (userId) {
      try {
        const wishlistKey = `wishlist_${userId}`;
        console.log('💾 Saving wishlist for user:', userId, items);
        localStorage.setItem(wishlistKey, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    }
  };

  // Initialize wishlist on mount
  useEffect(() => {
    loadWishlist();

    const handleAuthChange = () => {
      console.log('🔄 Auth state changed - reloading wishlist');
      loadWishlist();
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('userStateChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('userStateChange', handleAuthChange);
    };
  }, []); // ✅ Empty dependency array is correct here

  // Save whenever wishlist changes (but don't overwrite on initial load)
  useEffect(() => {
    // Only save if wishlist has been initialized (not on first render)
    if (wishlist.length > 0 || totalItemWishList > 0) {
      if (isUserLoggedIn()) {
        saveWishlist(wishlist);
      }
    }
    setTotalItemWishList(wishlist.length);
  }, [wishlist]); // ✅ Only depend on wishlist

  // Add to wishlist (requires login)
  const addToWishlist = (item) => {
    if (!isUserLoggedIn()) {
      alert('Please login to add items to wishlist');
      return false;
    }

    const existingItem = wishlist.find(w => w._id === item._id);
    
    if (existingItem) {
      console.log('⚠️ Item already in wishlist');
      return false;
    }

    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    console.log('✅ Added to wishlist:', item);
    return true;
  };

  // Remove from wishlist
  const removeFromWishlist = (itemId) => {
    if (!isUserLoggedIn()) {
      return false;
    }

    const updatedWishlist = wishlist.filter(item => item._id !== itemId);
    setWishlist(updatedWishlist);
    console.log('🗑️ Removed from wishlist:', itemId);
    return true;
  };

  // Check if item is in wishlist
  const isInWishlist = (itemId) => {
    if (!isUserLoggedIn()) {
      return false;
    }
    return wishlist.some(item => item._id === itemId);
  };

  // Clear wishlist
  const clearWishlist = () => {
    const userId = getCurrentUserId();
    if (userId) {
      const wishlistKey = `wishlist_${userId}`;
      localStorage.removeItem(wishlistKey);
    }
    setWishlist([]);
    setTotalItemWishList(0);
    console.log('🧹 Wishlist cleared');
  };

  // Merge guest wishlist (not needed since we don't store guest wishlist)
  const mergeGuestWishlist = async () => {
    console.log('ℹ️ Wishlist merge not needed - wishlist only for logged-in users');
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      totalItemWishList,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      loadWishlist,
      mergeGuestWishlist,
      isUserLoggedIn,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};