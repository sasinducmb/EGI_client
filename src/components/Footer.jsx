import React from 'react';


function Footer() {
  return (
    <>
      <div className="container-fluid footer">
        <div class="container text-left pt-5">
          <div class="row">
            <div class="col-12 col-md-6 col-lg">
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
              <div class="custom-box">
                <div class="input-group mb-3">
                  <input
                    style={{
                      width: '150px',
                      height: '48px',
                      background: 'black',
                      color: 'white',
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Your text here"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon"
                  />
                  <div class="input-group-append">
                    <button
                      style={{
                        // width: '150px',
                        height: '48px',
                      }}
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon"
                    >
                      Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg">
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
            <div class="col">
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
            <div class="col-12 col-md-6 col-lg">
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
            <div class="col-12 col-md-6 col-lg">
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
              <div className="d-flex pt-4">
                <img
                  className="p-2 footer img"
                  src="../../img/fb.jpg"
                  style={{ height: '40px', width: '40px' }}
                />
                <img
                  className="p-2 footer img"
                  src="../../img/Group.png"
                  style={{ height: '40px', width: '40px' }}
                />
                <img
                  className="p-2 footer img"
                  src="../../img/icon-instagram.png"
                  style={{ height: '40px', width: '40px' }}
                />
                <img
                  className="p-2 footer img"
                  src="../../img/Vector1.png"
                  style={{ height: '40px', width: '40px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
