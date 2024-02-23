import React from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div class="container-fluid">
      <div className="container pt-1">
        <nav class="navbar navbar-expand-lg" style={{ fontFamily: 'Poppins' }}>
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
                    {' '}
                    Contact{' '}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-lg-3" href="/about">
                    {' '}
                    About{' '}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-lg-3" href="/signup">
                    {' '}
                    Sign in{' '}
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
              <div className="p-2 footer-img-arrow">
                <Link to={'/wishlist'}>
                  <IoIosHeartEmpty size={24} />
                </Link>
              </div>
              <div className="p-2 footer-img-arrow">
                <IoCartOutline size={24} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
