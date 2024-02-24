import React from 'react';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: '50%' }}>Home /</h6>
            <h6 className="ms-2 "> Cart</h6>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="cart-row">
          <h5>Product</h5>
          <h5>Price</h5>
          <h5>Quantity</h5>
          <h5>Subtotal</h5>
        </div>
        <div className="cart-row">
          <img src="../../img/coat.png" className="image-cart" />
          <h5>500$</h5>
          <h5>1</h5>
          <h5>
            500$ <MdDelete size={25}/>
          </h5>
        </div>
        <div className="cart-row">
          <img src="../../img/jbl.png" className="image-cart" />
          <h5>500$</h5>
          <h5>2</h5>
          <h5>1000$</h5>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-between">
        <div
          className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
          style={{ cursor: 'pointer' }}
        >
          <h6>Return To Shop</h6>
        </div>
        <div
          className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
          style={{ cursor: 'pointer' }}
        >
          <h6>Update Cart</h6>
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-between">
        <div className="d-flex">
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
        <div className="process-box mb-5">
          <h5 className="mt-4" style={{ fontFamily: 'Poppins' }}>
            Cart Total
          </h5>
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
          <div className="d-flex justify-content-center">
            <button type="submit" class="cart-style mt-3">
              Procees to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
