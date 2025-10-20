import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to load user from localStorage
  const loadUser = () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      
      console.log("🔍 Loading user from localStorage:", { token: !!token, user: storedUser });
      
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("✅ User loaded successfully:", parsedUser);
        setUser(parsedUser);
        return parsedUser;
      } else {
        console.log("❌ No user found in localStorage");
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error("❌ Error loading user:", error);
      // Clear corrupted data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      return null;
    }
  };

  // Initialize user on component mount
  useEffect(() => {
    console.log("🚀 UserContext initializing...");
    loadUser();
    setLoading(false);
  }, []);

  // Listen for storage changes (for cross-tab synchronization)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "token") {
        console.log("📦 Storage changed, reloading user");
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Listen for custom userStateChange events
  useEffect(() => {
    const handleUserStateChange = () => {
      console.log("🔄 User state change event received");
      loadUser();
    };

    window.addEventListener("userStateChange", handleUserStateChange);
    return () => window.removeEventListener("userStateChange", handleUserStateChange);
  }, []);

  // Function to update user
  const updateUser = (userData) => {
    console.log("📝 Updating user:", userData);
    
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("✅ User updated in state and localStorage");
    } else {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("✅ User cleared from state and localStorage");
    }
    
    // Trigger re-render in other components
    window.dispatchEvent(new Event("userStateChange"));
  };

  // Function to logout
  const logout = () => {
    console.log("🚪 Logging out user");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userStateChange"));
    window.location.href = "/login";
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    const authenticated = !!user && !!localStorage.getItem("token");
    console.log("🔐 Is authenticated:", authenticated);
    return authenticated;
  };

  const contextValue = {
    user,
    setUser: updateUser,
    logout,
    isAuthenticated,
    loading,
    isLoading: loading, // Alias for consistency
  };

  console.log("🎯 UserContext value:", { user: !!user, loading });

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};