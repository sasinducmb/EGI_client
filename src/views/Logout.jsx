// Add this to your Login.jsx component

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // ✅ Get wishlist and cart contexts
  const { loadWishlist } = useContext(WishlistContext);
  const { loadCart, mergeGuestCart } = useContext(CartContext);

  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    
    const { username, password } = data;
    
    try {
      const response = await axios.post("/user/login", {
        username,
        password,
      });

      // ✅ Save token/user
      const user = response.data.user || response.data.newUser;
      const token = response.data.token;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Merge guest cart (wishlist doesn't need merge)
      await mergeGuestCart();

      // ✅ Reload wishlist and cart from backend
      loadWishlist();
      await loadCart();

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('userStateChange'));

      // Role-based routing
      const userRole = user.role;
      if (userRole === "admin") {
        window.location.href = process.env.REACT_APP_DASH_URL;
      } else {
        window.location.href = process.env.REACT_APP_MAIN_URL;
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Username or Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;