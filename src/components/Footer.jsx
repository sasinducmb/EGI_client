import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { RxTwitterLogo } from 'react-icons/rx';
import { IoLogoInstagram } from 'react-icons/io';
import { RxLinkedinLogo } from 'react-icons/rx';
import { IoIosArrowDropright } from 'react-icons/io';


function Footer() {
  return (
    <>
      <div className="container-fluid footer">
        <div class="container text-left pt-5">
          <div class="row">
            <div class="col-12 col-md-3 col-lg-3">
              <h6
                style={{
                  fontFamily: 'poppins',
                  fontWeight: 800,
                  fontSize: '24px',
                }}
              >
                Exclusive
              </h6>
              <p className="pt-4">Subscribe</p>
              <p className="pt-2">Get 10% off your first order</p>
              <div class=" ">
                <div class="input-group mb-3">
                  <input
                    style={{
                      width: '100px',
                      height: '48px',
                      background: 'black',
                      color: 'white',
                    }}
                    type="text"
                    class="form-control d-none d-md-block"
                    placeholder="Your text here"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon"
                  />
                  <div class="input-group-append d-flex align-items-center justify-content-center ">
                    <IoIosArrowDropright className="footer-img-arrow mx-2" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 col-lg-2">
              <h6
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 300,
                  fontSize: '20px',
                }}
              >
                Support
              </h6>
              <p className="pt-4">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
              </p>
              <p className="pt-2">exclusive@gmail.com</p>
              <p className="pt-2">+88015-88888-9999</p>
            </div>
            <div class="col-12 col-md-3 col-lg-2">
              <h6
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 300,
                  fontSize: '20px',
                }}
              >
                Account
              </h6>
              <p className="pt-4">My Account</p>
              <p className="pt-2">Login / Register</p>
              <p className="pt-2">Cart</p>
              <p className="pt-2">Wishlist</p>
              <p className="pt-2">Shop</p>
            </div>
            <div class="col-12 col-md-2 col-lg-2">
              <h6
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 300,
                  fontSize: '20px',
                }}
              >
                Quick Link
              </h6>
              <p className="pt-4">Privacy Policy</p>
              <p className="pt-2">Terms Of Use</p>
              <p className="pt-2">FAQ</p>
              <p className="pt-2">Contact</p>
            </div>
            <div class="col-12 col-md-2 col-lg-3">
              <h6
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 300,
                  fontSize: '20px',
                }}
              >
                Download App
              </h6>
              <p
                className="pt-5"
                style={{
                  fontWeight: 500,
                  fontSize: '12px',
                  opacity: 0.7,
                }}
              >
                Save $3 with App New User Only
              </p>
              <div className="d-flex">
                <div className="pt-2">
                  <img src="../../img/Qrcode1.png" />
                </div>
                <div className="abc px-2">
                  <img src="../../img/GooglePlay.png" />
                  <img className="p-1" src="../../img/download-appstore.png" />
                </div>
              </div>
              <div className="col-12 col-md-2 col-lg-9 mt-3 d-flex">
                <FaFacebookSquare className="footer-img mx-2"/>
                <RxTwitterLogo className="footer-img mx-2" />
                <IoLogoInstagram className="footer-img mx-2" />
                <RxLinkedinLogo className="footer-img mx-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
