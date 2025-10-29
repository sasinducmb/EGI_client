import axios from "axios";
import React, { useContext } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../auth/userContext";

function Header() {
  const { clearWishlist } = useContext(WishlistContext);
  const { clearCart } = useContext(CartContext);
  const { setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.get("/user/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("guestCart");

      if (clearWishlist) clearWishlist();
      if (clearCart) clearCart();
      if (setUser) setUser(null);

      window.dispatchEvent(new Event("userStateChange"));
      window.location.href = process.env.REACT_APP_MAIN_URL || "/";
    }
  };

  return (
    <>
      <div className="modern-header-wrapper">
        <div className="header-inner-container">
          {/* Left Section (Optional) */}
          <div className="header-left-section"></div>

          {/* Right Section */}
          <div className="header-right-section">
            <button className="logout-btn" onClick={logout} title="Logout">
              <MdOutlineLogout className="logout-icon" size={22} />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS Styling */}
      <style>{`
        .modern-header-wrapper {
          width: 100%;
          background: white; /* ✅ Black header background */
          padding: 14px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1000;
        }

        .header-inner-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left-section {
          display: flex;
          align-items: center;
        }

        .header-right-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        /* ✅ Logout Button with Gradient Theme */
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%);
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .logout-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
        }

        .logout-btn:active {
          transform: scale(0.97);
        }

        .logout-icon {
          transition: transform 0.3s ease;
        }

        .logout-btn:hover .logout-icon {
          transform: rotate(-15deg) scale(1.1);
        }

        .logout-text {
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.5px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .logout-text {
            display: none;
          }
          .logout-btn {
            border-radius: 50%;
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
