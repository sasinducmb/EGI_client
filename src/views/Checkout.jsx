import React from 'react';
import { MdDelete } from 'react-icons/md';

const Checkout = () => {
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: '50%' }}>
              Account /My Account / Product / Cart /
            </h6>
            <h6 className="ms-2 "> Checkout </h6>
          </div>
        </div>
      </div>

      <div className="row pt-5">
        <div className="col-lg-6">
          <h2>Billing Details</h2>
          <div className="pt-3 pb-3">
            <div className="checkout-input">
              <h5 style={{ opacity: '50%' }}>
                First Name<span style={{ color: 'red' }}>*</span>
              </h5>
              <input
                type="first"
                class="form-control"
                id="inputFirst"
                style={{ width: '470px', height: '50px' }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: '50%' }}>Company Name</h5>
              <input
                type="Company"
                class="form-control"
                id="inputCompany"
                style={{ width: '470px', height: '50px' }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: '50%' }}>
                Street Address<span style={{ color: 'red' }}>*</span>
              </h5>
              <input
                type="Street"
                class="form-control"
                id="inputStreet"
                style={{ width: '470px', height: '50px' }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: '50%' }}>
                Apartment, floor, etc. (optional)
              </h5>
              <input
                type="Apartment"
                class="form-control"
                id="inputApartment"
                style={{ width: '470px', height: '50px' }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: '50%' }}>
                Town/City<span style={{ color: 'red' }}>*</span>
              </h5>
              <input
                type="Town"
                class="form-control"
                id="inputTown"
                style={{ width: '470px', height: '50px' }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: '50%' }}>
                Phone Number<span style={{ color: 'red' }}>*</span>
              </h5>
              <input
                type="Phone"
                class="form-control"
                id="inputPhone"
                style={{ width: '470px', height: '50px' }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: '50%' }}>
                Email Address<span style={{ color: 'red' }}>*</span>
              </h5>
              <input
                type="Email"
                class="form-control"
                id="inputEmail"
                style={{ width: '470px', height: '50px' }}
              />
            </div>
            <div className="d-flex align-items-center">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                <h5 className="pt-2 px-2">
                  Save this information for faster check-out next time
                </h5>
              </label>
            </div>
          </div>
        </div>

        <div className="col-lg-6 padding-style">
          <div>
            <div className="cart-row">
              <img src="../../img/coat.png" className="image-cart" />
              <h5>
                500$ <MdDelete size={25} />
              </h5>
            </div>
            <div className="cart-row">
              <img src="../../img/jbl.png" className="image-cart" />
              <h5>
                $1200 <MdDelete size={25} />
              </h5>
            </div>
          </div>
          <div>
            <div className="process-box-row">
              <h6>Subtotal:</h6>
              <h6>$1500</h6>
            </div>
            <hr />
            <div className="process-box-row">
              <h6>Shipping:</h6>
              <h6>Free</h6>
            </div>
            <hr />
            <div className="process-box-row">
              <h6>Total:</h6>
              <h6>$1500</h6>
            </div>
            <div class="form-check d-flex justify-content-between pt-4 ">
              <div>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  <h5>Bank</h5>
                </label>
              </div>
              <div>
                <img src="../../img/kash.png" className="image-visa" />
                <img src="../../img/visa.png" className="image-visa" />
                <img src="../../img/master.png" className="image-visa" />
                <img src="../../img/nagad.png" className="image-visa" />
              </div>
            </div>
            <div class="form-check pt-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                <h5>Cash on delivery</h5>
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <input
                  type="first"
                  class="form-control"
                  id="inputFirst"
                  placeholder="Coupon Code"
                  style={{ width: '300px', height: '56px' }}
                />
              </div>
              <div>
                <button type="submit" class="cart-style mx-3">
                  Apply Coupon
                </button>
              </div>
            </div>
            <div>
              <button type="submit" class="cart-style mt-3">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
