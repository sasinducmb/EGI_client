import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../auth/userContext";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineUserAdd,
  AiOutlineLogin,
} from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { totalItemCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { totalItemWishList } = useContext(WishlistContext);
  
  // Local state to force re-render
  const [forceUpdate, setForceUpdate] = useState(0);

  // Listen for user state changes
  useEffect(() => {
    const handleUserChange = () => {
      console.log("🔄 Navbar: User state change detected");
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener("userStateChange", handleUserChange);
    return () => window.removeEventListener("userStateChange", handleUserChange);
  }, []);

  // Debug log
  useEffect(() => {
    console.log("🎨 Navbar render:", { 
      user: !!user, 
      userName: user?.name,
      forceUpdate 
    });
  }, [user, forceUpdate]);

  const navbarContainerStyle = {
    background: "linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%)",
    margin: "20px auto 0",
    maxWidth: "1280px",
    padding: "20px 40px",
    borderRadius: "20px",
    boxShadow: "0 10px 50px rgba(0, 0, 0, 0.3)",
    position: "sticky",
    top: "15px",
    zIndex: 1000,
    backdropFilter: "blur(20px) saturate(180%)",
  };

  const navbarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  };

  const logoStyle = {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
  };

  const brandStyle = {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "2rem",
    textDecoration: "none",
    letterSpacing: "1px",
    transition: "all 0.4s ease",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  };

  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const navLinkStyle = {
    color: "rgba(255, 255, 255, 0.9)",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "relative",
    padding: "12px 20px",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid transparent",
  };

  const iconSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const iconWrapperStyle = {
    position: "relative",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "12px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const badgeStyle = {
    position: "absolute",
    top: "-2px",
    right: "-2px",
    background: "linear-gradient(135deg, #e76f51, #ff8566)",
    color: "#ffffff",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
    border: "2px solid #5f9ea0",
    boxShadow: "0 4px 12px rgba(231, 111, 81, 0.6)",
  };

  return (
    <div className="container-fluid">
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .navbar-animated {
          animation: fadeInDown 0.8s ease-in-out;
        }

        .logo-img:hover {
          transform: rotate(360deg) scale(1.15);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .brand-link:hover {
          letter-spacing: 2px;
          transform: scale(1.05);
        }

        a.nav-link-item:hover {
          color: #fff !important;
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .icon-wrapper:hover {
          transform: translateY(-5px) scale(1.1);
          background: linear-gradient(135deg, rgba(0,0,0,0.15), rgba(0,0,0,0.1));
        }

        @media (max-width: 768px) {
          .brand-link { font-size: 1.4rem !important; }
          a.nav-link-item { 
            padding: 10px 14px !important; 
            font-size: 0.9rem !important; 
          }
        }
      `}</style>

      <div style={navbarContainerStyle} className="navbar-animated">
        <nav style={navbarStyle}>
          {/* Logo */}
          <div style={logoSectionStyle}>
            <img
              src="../../img/hocll.png"
              style={logoStyle}
              className="logo-img"
              alt="Logo"
            />
            <a href="/" style={brandStyle} className="brand-link">
              HOUSE OF CAMBRIDGE
            </a>
          </div>

          {/* Nav Links */}
          <div style={navLinksStyle}>
            <a href="/" className="nav-link-item" style={navLinkStyle}>
              <AiOutlineHome size={20} /> Home
            </a>
            <a href="/contact" className="nav-link-item" style={navLinkStyle}>
              <AiOutlinePhone size={20} /> Contact
            </a>
            
            {/* Only show Sign Up/Sign In when user is NOT logged in */}
            {!user && (
              <>
                <a href="/signup" className="nav-link-item" style={navLinkStyle}>
                  <AiOutlineUserAdd size={20} /> Sign Up
                </a>
                <a href="/login" className="nav-link-item" style={navLinkStyle}>
                  <AiOutlineLogin size={20} /> Sign In
                </a>
              </>
            )}
          </div>

          {/* Icons */}
          <div style={iconSectionStyle}>
            {/* Profile Icon - Only show when logged in */}
            {user && (
              <div className="icon-wrapper" style={iconWrapperStyle} title={`Hello, ${user.name}`}>
                <Link to="/account">
                  <BsPersonCircle
                    size={28}
                    style={{ color: "rgba(255, 255, 255, 0.95)" }}
                  />
                </Link>
              </div>
            )}

            {/* Wishlist */}
            <div className="icon-wrapper" style={iconWrapperStyle}>
              <Link to="/wishlist">
                <IoIosHeartEmpty
                  size={28}
                  style={{ color: "rgba(255, 255, 255, 0.95)" }}
                />
                {totalItemWishList > 0 && (
                  <span style={badgeStyle}>{totalItemWishList}</span>
                )}
              </Link>
            </div>

            {/* Cart */}
            <div className="icon-wrapper" style={iconWrapperStyle}>
              <Link to="/cart">
                <BsCart4
                  size={28}
                  style={{ color: "rgba(255, 255, 255, 0.95)" }}
                />
                {totalItemCart > 0 && (
                  <span style={badgeStyle}>{totalItemCart}</span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;