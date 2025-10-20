import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    phoneNo: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { loadWishlist } = useContext(WishlistContext);
  const { mergeGuestCart, loadCart } = useContext(CartContext);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    const savedData = localStorage.getItem("signupData");
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    if (savePassword) {
      localStorage.setItem("signupData", JSON.stringify(data));
    } else {
      localStorage.removeItem("signupData");
    }
  }, [savePassword, data]);

  const userRegistration = async (e) => {
    e.preventDefault();

    if (data.password.length < 8) {
      setErrMsg("Password must be at least 8 characters long.");
      return;
    }
    if (data.password !== confirmPass) {
      setErrMsg("Passwords do not match!");
      return;
    }

    setLoading(true);
    setErrMsg("");
    setMessage("");

    try {
      const response = await axios.post("/user/register", data, {
        validateStatus: () => true,
      });

      if (response.status === 201) {
        setMessage("Account created successfully!");
        localStorage.setItem("user", JSON.stringify(data));
        await mergeGuestCart();
        loadWishlist();
        await loadCart();

        setTimeout(() => {
          window.location.href = process.env.REACT_APP_MAIN_URL || "/";
        }, 1000);
      } else if (response.status === 400 && response.data.message === "User already exists") {
        setErrMsg("User already exists. Please use a different email.");
      } else {
        setErrMsg("User already exists. Please use a different email.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrMsg("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(90deg, #ffffffff 0%);
        }
        .signup-card {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        }
        .signup-title {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(90deg, #5f9ea0, #b8926a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .form-input {
          width: 100%;
          padding: 14px;
          margin-bottom: 16px;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
          background: #f7fafc;
          font-size: 15px;
        }
        .password-wrapper {
          position: relative;
        }
        .password-toggle {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #555;
        }
        .signup-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, #5f9ea0, #b8926a);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }
        .error-message, .success-message {
          margin-bottom: 20px;
          padding: 12px;
          border-radius: 8px;
          font-weight: 500;
        }
        .error-message {
          background: #ffe5e5;
          color: #c53030;
        }
        .success-message {
          background: #e6ffed;
          color: #155724;
        }
      `}</style>

      {loading ? (
        <div className="signup-container">
          <TailSpin height="80" width="80" color="#5f9ea0" ariaLabel="loading-indicator" />
        </div>
      ) : (
        <div className="signup-container">
          <div className="signup-card">
            <h2 className="signup-title">Create Account</h2>
            {message && <div className="success-message">{message}</div>}
            {errMsg && <div className="error-message">{errMsg}</div>}

            <form onSubmit={userRegistration}>
              <input
                type="text"
                className="form-input"
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />

              <input
                type="email"
                className="form-input"
                placeholder="Email"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />

              <input
                type="tel"
                className="form-input"
                placeholder="Phone Number"
                value={data.phoneNo}
                onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
              />

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Password (min 8 characters)"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                {showPassword ? (
                  <FaRegEye onClick={togglePasswordVisibility} className="password-toggle" />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility} className="password-toggle" />
                )}
              </div>

              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                {showConfirmPassword ? (
                  <FaRegEye onClick={toggleConfirmPasswordVisibility} className="password-toggle" />
                ) : (
                  <FaEyeSlash onClick={toggleConfirmPasswordVisibility} className="password-toggle" />
                )}
              </div>

              <label className="save-password">
                <input
                  type="checkbox"
                  checked={savePassword}
                  onChange={() => setSavePassword(!savePassword)}
                />
                Save Password
              </label>

              <button type="submit" className="signup-button">
                Create Account
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
