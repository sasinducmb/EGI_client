import React, { useContext } from "react";
import { UserContext } from "../auth/userContext";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const logout = async () => {
  try {
    const logOut = await axios.get("/user/logout");
    if (logOut.data) {
      // console.log(logOut.data.message);
      window.location.href = "http://localhost:3000/";
    }
  } catch (err) {
    console.log(err.message);
  }
};

function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { totalItemWishList } = useContext(WishlistContext);

  return (
    <div class="container-fluid">
      <div className="container pt-1">
        <nav class="navbar navbar-expand-lg" style={{ fontFamily: "Poppins" }}>
          <a class="navbar-brand" href="/">
            HOUSE OF CAMBRIDGE
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-start"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-justify flex-grow-1 pe-3">
                <li class="nav-item">
                  <a
                    class="nav-link active mx-lg-3"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-lg-3" href="/contact">
                    {" "}
                    Contact{" "}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-lg-3" href="/about">
                    {" "}
                    About{" "}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-lg-3" href="/signup">
                    Sign in{" "}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-lg-3" href="/login">
                    Login{" "}
                  </a>
                </li>
              </ul>
              <form class="d-flex mt-1" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <div className="position-relative d-flex align-items-center justify-content-center">
                <a href="/wishlist">
                  <div className="nav-heart">
                    <button type="button" className="btn btn-light btn-notify">
                      <IoIosHeartEmpty size={23} style={{ color: "black" }} />
                      <span class="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
                        {totalItemWishList}
                      </span>
                    </button>
                  </div>
                </a>
                <a href="/cart">
                  <div className="nav-heart">
                    <button type="button" className="btn btn-light btn-notify">
                      <BsCart4 size={23} style={{ color: "black" }} />
                      <span class="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                      </span>
                    </button>
                  </div>
                </a>

                {user && (
                  <div className="nav-heart">
                    <BsPersonCircle size={23} onClick={logout} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <hr />
    </div>
  );
}

export default Navbar;
