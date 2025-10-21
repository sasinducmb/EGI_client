import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const Signup = () => {
  const [data, SetData] = useState({ name: "", username: "", phoneNo: "", password: "" });
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { loadWishlist } = useContext(WishlistContext);
  const { mergeGuestCart, loadCart } = useContext(CartContext);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showconfirmPassword);

  useEffect(() => {
    if (errMsg || message) {
      const timer = setTimeout(() => {
        setErrMsg("");
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errMsg, message]);

  const getErrorMessage = (error) => {
    if (!error.response) {
      if (error.request) {
        return "Unable to connect to server. Please check your internet connection.";
      }
      return error.message || "An unexpected error occurred. Please try again.";
    }

    const { status, data } = error.response;
    const errorData = typeof data === 'string' ? data.trim() : data;
    const errorMessage = data?.message || data?.error || errorData;
    const errorCode = data?.code || data?.errorCode;

    const numericCode = !isNaN(Number(errorMessage)) ? Number(errorMessage) : 
                        !isNaN(Number(errorCode)) ? Number(errorCode) : null;

    if (numericCode !== null) {
      switch (numericCode) {
        case 1:
          return "Registration failed. Please check your information and try again.";
        case 2:
          return "This email address is already registered. Please use a different email or login.";
        case 3:
          return "This phone number is already registered. Please use a different number or login.";
        default:
          return "Registration error. Please try again.";
      }
    }

    switch (status) {
      case 400:
        if (typeof errorMessage === 'string') {
          const msg = errorMessage.toLowerCase();
          if (msg.includes('email') && msg.includes('exist')) {
            return "This email is already registered. Please login or use a different email.";
          }
          if (msg.includes('phone') && msg.includes('exist')) {
            return "This phone number is already registered. Please use a different number.";
          }
          if (msg.includes('username') && msg.includes('exist')) {
            return "This username is already taken. Please choose a different username.";
          }
          if (msg.includes('password')) {
            if (msg.includes('weak') || msg.includes('short')) {
              return "Password is too weak. Use at least 8 characters with letters and numbers.";
            }
            if (msg.includes('match')) {
              return "Passwords do not match. Please try again.";
            }
            return "Invalid password. Please check your password requirements.";
          }
          if (msg.includes('email') && msg.includes('invalid')) {
            return "Please enter a valid email address.";
          }
          if (msg.includes('phone') && msg.includes('invalid')) {
            return "Please enter a valid phone number.";
          }
          if (msg.includes('required') || msg.includes('missing')) {
            return "Please fill in all required fields.";
          }
          return errorMessage;
        }
        return "Invalid registration details. Please check your information.";

      case 401:
        return "Authentication failed. Please check your credentials.";

      case 403:
        return "Registration is currently disabled. Please contact support.";

      case 409:
        if (typeof errorMessage === 'string') {
          const msg = errorMessage.toLowerCase();
          if (msg.includes('email')) {
            return "This email is already registered. Please login instead.";
          }
          if (msg.includes('phone')) {
            return "This phone number is already registered. Please use a different number.";
          }
          if (msg.includes('username')) {
            return "This username is already taken. Please choose another.";
          }
        }
        return "An account with these credentials already exists. Please login.";

      case 422:
        return "Invalid input. Please check your details and try again.";

      case 429:
        return "Too many registration attempts. Please try again later.";

      case 500:
      case 502:
      case 503:
        return "Server error. Please try again in a few moments.";

      case 504:
        return "Request timed out. Please check your connection and try again.";

      default:
        if (typeof errorMessage === 'string' && errorMessage.length > 0) {
          return errorMessage;
        }
        return "Registration failed. Please try again.";
    }
  };

  const userRegistration = async (e) => {
    e.preventDefault();

    if (!data.name.trim()) {
      setErrMsg("Please enter your name.");
      return;
    }

    if (!data.username.trim()) {
      setErrMsg("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.username)) {
      setErrMsg("Please enter a valid email address.");
      return;
    }

    if (!data.phoneNo.trim()) {
      setErrMsg("Please enter your phone number.");
      return;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(data.phoneNo)) {
      setErrMsg("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    if (!data.password) {
      setErrMsg("Please enter a password.");
      return;
    }

    if (data.password.length < 6) {
      setErrMsg("Password must be at least 6 characters long.");
      return;
    }

    if (!confirmPass) {
      setErrMsg("Please confirm your password.");
      return;
    }

    if (data.password !== confirmPass) {
      setErrMsg("Passwords do not match! Please make sure both passwords are identical.");
      return;
    }

    setLoading(true);
    setErrMsg("");
    setMessage("");

    try {
      const response = await axios.post("/user/register", data);

      const user = response.data.user || response.data.newUser || response.data.data || {
        name: data.name,
        username: data.username,
        phoneNo: data.phoneNo,
      };
      const token = response.data.token || response.data.accessToken;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      await mergeGuestCart();
      loadWishlist();
      await loadCart();

      window.dispatchEvent(new Event('userStateChange'));

      setMessage("Account created successfully! Redirecting...");
      setErrMsg("");

      setTimeout(() => {
        const userRole = user.role;
        if (userRole === "admin") {
          window.location.href = process.env.REACT_APP_DASH_URL;
        } else {
          window.location.href = process.env.REACT_APP_MAIN_URL;
        }
      }, 1000);

    } catch (error) {
      console.error("❌ Signup error:", error);
      const errorMessage = getErrorMessage(error);
      setErrMsg(errorMessage);
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .signup-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; position: relative; overflow: hidden; background: linear-gradient(90deg, #ffffffff 0%); }
        .signup-container::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); animation: shimmer 4s infinite; }
        @keyframes shimmer { 0% { left: -100%; } 100% { left: 100%; } }
        .signup-card { background: rgba(255, 255, 255, 0.98); border-radius: 24px; padding: 48px 40px; width: 100%; max-width: 480px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); position: relative; z-index: 1; }
        .signup-header { text-align: center; margin-bottom: 36px; }
        .signup-title { font-size: 32px; font-weight: 700; color: #2d3748; margin-bottom: 8px; background: linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .signup-subtitle { font-size: 16px; color: #718096; font-weight: 400; }
        .form-group { margin-bottom: 20px; position: relative; }
        .form-input { width: 100%; padding: 16px 18px; font-size: 15px; border: 2px solid #e2e8f0; border-radius: 14px; transition: all 0.3s ease; background: #f7fafc; color: #2d3748; font-family: inherit; }
        .form-input:focus { outline: none; border-color: #5f9ea0; background: #ffffff; box-shadow: 0 0 0 4px rgba(95,158,160,0.15); }
        .form-input.error { border-color: #fc8181; background: #fff5f5; }
        .password-wrapper { position: relative; }
        .password-toggle { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #718096; transition: color 0.3s ease; }
        .password-toggle:hover { color: #5f9ea0; }
        .signup-button { width: 100%; padding: 16px; font-size: 16px; font-weight: 600; color: white; background: linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%); border: none; border-radius: 14px; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 4px 15px rgba(95,158,160,0.4); margin-top: 8px; position: relative; overflow: hidden; }
        .signup-button::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.6s ease; }
        .signup-button:hover:not(:disabled)::before { left: 100%; }
        .signup-button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 25px rgba(95,158,160,0.5); }
        .signup-button:disabled { background: #cbd5e0; cursor: not-allowed; transform: none; }
        .signup-button:disabled::before { display: none; }
        .success-message, .error-message { padding: 14px 18px; border-radius: 12px; margin-bottom: 24px; font-size: 14px; font-weight: 500; animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .success-message { background: linear-gradient(135deg, #d4edda, #c3e6cb); color: #155724; border-left: 4px solid #28a745; }
        .error-message { background: linear-gradient(135deg, #fed7d7, #fbb6ce); color: #c53030; border-left: 4px solid #fc8181; }
        .login-link { text-align: center; margin-top: 28px; color: #718096; font-size: 15px; }
        .login-link a { color: #5f9ea0; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .login-link a:hover { color: #4a7c7e; text-decoration: underline; }
        .spinner-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%); }
        
        @media (max-width: 768px) {
          .signup-card { padding: 40px 32px; }
          .signup-title { font-size: 28px; }
          .form-input { padding: 14px 16px; }
          .signup-button { padding: 14px; }
        }

        @media (max-width: 480px) {
          .signup-card { padding: 32px 24px; }
        }
      `}</style>

      {loading ? (
        <div className="spinner-container">
          <TailSpin height="80" width="80" color="white" ariaLabel="loading-indicator" />
        </div>
      ) : (
        <div className="signup-container">
          <div className="signup-card">
            <div className="signup-header">
              <h2 className="signup-title">Create an Account</h2>
              <p className="signup-subtitle">Enter your details below</p>
            </div>

            {message && <div className="success-message">{message}</div>}
            {errMsg && <div className="error-message">{errMsg}</div>}

            <form onSubmit={userRegistration}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-input ${errMsg && !data.name.trim() ? 'error' : ''}`}
                  placeholder="Name"
                  value={data.name}
                  required
                  onChange={(e) => SetData({ ...data, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className={`form-input ${errMsg && !data.username.trim() ? 'error' : ''}`}
                  placeholder="Email"
                  value={data.username}
                  required
                  onChange={(e) => SetData({ ...data, username: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  className={`form-input ${errMsg && !data.phoneNo.trim() ? 'error' : ''}`}
                  placeholder="Phone Number"
                  value={data.phoneNo}
                  required
                  onChange={(e) => SetData({ ...data, phoneNo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-input ${errMsg && !data.password ? 'error' : ''}`}
                    placeholder="Password"
                    value={data.password}
                    required
                    onChange={(e) => SetData({ ...data, password: e.target.value })}
                  />
                  {showPassword ? (
                    <FaRegEye onClick={togglePasswordVisibility} className="password-toggle" size={20} />
                  ) : (
                    <FaEyeSlash onClick={togglePasswordVisibility} className="password-toggle" size={20} />
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="password-wrapper">
                  <input
                    type={showconfirmPassword ? "text" : "password"}
                    className={`form-input ${errMsg && data.password !== confirmPass ? 'error' : ''}`}
                    placeholder="Confirm Password"
                    value={confirmPass}
                    required
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                  {showconfirmPassword ? (
                    <FaRegEye onClick={toggleConfirmPasswordVisibility} className="password-toggle" size={20} />
                  ) : (
                    <FaEyeSlash onClick={toggleConfirmPasswordVisibility} className="password-toggle" size={20} />
                  )}
                </div>
              </div>

              <button type="submit" disabled={loading} className="signup-button">
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="login-link">
              Already have an account? <a href="/login">Login here</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;