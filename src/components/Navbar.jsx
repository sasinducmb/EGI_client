import React, { useContext } from "react";
import { UserContext } from "../auth/userContext";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { totalItemWishList } = useContext(WishlistContext);

  return (
    <div className="container-fluid">
      <div className="container pt-1">
        <nav
          className="navbar navbar-expand-lg"
          style={{ fontFamily: "Poppins" }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>
          <a className="navbar-brand" href="/">
            HOUSE OF CAMBRIDGE
          </a>

          {/* Wishlist and Cart Icons for Small Screens */}

          {/* Hamburger Icon */}

          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              {/* Navbar Links */}
              <ul className="navbar-nav justify-content-justify flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active mx-lg-3"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-3" href="/contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-3" href="/about">
                    About
                  </a>
                </li>
              
                <li className="nav-item">
                  <a className="nav-link mx-lg-3" href="/signup">
                    Sign in
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-3" href="/login">
                    Login
                  </a>
                </li>
              </ul>
              {/* Search Form */}
              <form className="d-flex mt-1" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              {/* User Icon */}
              {user && (
                <div className="nav-heart">
                  <Link to="/account" style={{textDecoration:'none'}}>
                    <BsPersonCircle size={23} style={{textDecoration:'none',color:'black'}}/>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className=" position-relative d-flex align-items-center">
            {/* Wishlist Icon */}
            <a href="/wishlist" className="me-2">
              <IoIosHeartEmpty size={23} style={{ color: "black" }} />
              <span className="position-absolute top-0 start-70 translate-middle badge rounded-pill bg-danger">
                {totalItemWishList}
              </span>
            </a>
            {/* Cart Icon */}
            <a href="/cart">
              <BsCart4 size={23} style={{ color: "black" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            </a>
          </div>
        </nav>
      </div>
      <hr />
    </div>
  );
}

export default Navbar;
