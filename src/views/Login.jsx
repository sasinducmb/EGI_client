import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, SetData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  
  const { loadWishlist } = useContext(WishlistContext);
  const { mergeGuestCart, loadCart } = useContext(CartContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

      const user = response.data.user || response.data.newUser;
      const token = response.data.token;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      await mergeGuestCart();
      loadWishlist();
      await loadCart();

      window.dispatchEvent(new Event('userStateChange'));

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
    <>
      <style>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(90deg, #ffffffff 0%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          animation: shimmer 4s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .login-card {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 24px;
          padding: 48px 40px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          z-index: 1;
        }

        .login-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .login-title {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
          background: linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          font-size: 16px;
          color: #718096;
          font-weight: 400;
        }

        .form-group {
          margin-bottom: 24px;
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 16px 18px;
          font-size: 15px;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          transition: all 0.3s ease;
          background: #f7fafc;
          color: #2d3748;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #5f9ea0;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(95, 158, 160, 0.15);
        }

        .form-input::placeholder {
          color: #a0aec0;
        }

        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #718096;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #5f9ea0;
        }

        /* ADD THIS: Forgot Password Link Styles */
        .forgot-password-link {
          text-align: right;
          margin-top: -12px;
          margin-bottom: 16px;
        }

        .forgot-password-link a {
          color: #5f9ea0;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .forgot-password-link a:hover {
          color: #4a7c7e;
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%);
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(95, 158, 160, 0.4);
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .login-button:hover::before {
          left: 100%;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(95, 158, 160, 0.5);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .login-button:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .login-button:disabled::before {
          display: none;
        }

        .error-message {
          background: linear-gradient(135deg, #fed7d7, #fbb6ce);
          color: #c53030;
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
          border-left: 4px solid #fc8181;
          box-shadow: 0 2px 8px rgba(252, 129, 129, 0.2);
        }

        .signup-link {
          text-align: center;
          margin-top: 28px;
          color: #718096;
          font-size: 15px;
        }

        .signup-link a {
          color: #5f9ea0;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .signup-link a:hover {
          color: #4a7c7e;
          text-decoration: underline;
        }

        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%);
        }

        @media (max-width: 768px) {
          .login-card {
            padding: 40px 32px;
          }

          .login-title {
            font-size: 28px;
          }

          .form-input {
            padding: 14px 16px;
          }

          .login-button {
            padding: 14px;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
          }

          .login-title {
            font-size: 24px;
          }
        }
      `}</style>

      {loading ? (
        <div className="spinner-container">
          <TailSpin
            height="80"
            width="80"
            color="white"
            ariaLabel="loading-indicator"
          />
        </div>
      ) : (
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Please login to your account</p>
            </div>

            {errMsg && <div className="error-message">{errMsg}</div>}

            <form onSubmit={userLogin}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  value={data.username}
                  required
                  onChange={(e) => SetData({ ...data, username: e.target.value })}
                />
              </div>

              <div className="form-group">
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Password"
                    value={data.password}
                    required
                    onChange={(e) => SetData({ ...data, password: e.target.value })}
                  />
                  {showPassword ? (
                    <FaRegEye
                      onClick={togglePasswordVisibility}
                      className="password-toggle"
                      size={20}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={togglePasswordVisibility}
                      className="password-toggle"
                      size={20}
                    />
                  )}
                </div>
              </div>

              {/* ADD THIS: Forgot Password Link */}
              <div className="forgot-password-link">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-button"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </form>

            <div className="signup-link">
              Don't have an account?{" "}
              <a href="/signup">Sign up here</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;