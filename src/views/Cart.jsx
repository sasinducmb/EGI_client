import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart,addToCart,total} = useContext(CartContext);
  console.log(cart);

  const increment = (itemName) => {
    const currentItem = cart.find((item) => item.name === itemName);
    if (currentItem) {
      updateQuantity(itemName, currentItem.quantity + 1);
    }
  };

  const decrement = (itemName) => {
    const currentItem = cart.find((item) => item.name === itemName);
    if (currentItem && currentItem.quantity > 1) {
      updateQuantity(itemName, currentItem.quantity - 1);
    }
  };
  const handelDelete = (itemName) => {
    removeFromCart(itemName);
  };
  // const total = cart
  //   .reduce((acc, item) => acc + item.price * item.quantity, 0)
  //   .toFixed(2);

  // const handelCart=()=>{
  //   addToCart()
  // }

  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>Home /</h6>
            <h6 className="ms-2 "> Cart</h6>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="cart-row">
          <h5>Product</h5>
          <h5>Price($)</h5>
          <h5>Quantity</h5>
          <h5>Subtotal</h5>
        </div>
        {cart.map((cartItem, index) => (
          <div className="cart-row" key={index}>
            {cartItem.pic ? (
              <img
                src={`http://localhost:5000/uploads/${cartItem.pic
                  .split("\\")
                  .pop()}`}
                className="image-cart"
              />
            ) : (
              <div>No image available</div> // Placeholder in case there's no image
            )}
            <h5>{cartItem.price}</h5>
            <h5>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => decrement(cartItem.name)}
                >
                  -
                </button>
                <span className="mx-2">{cartItem.quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => increment(cartItem.name)}
                >
                  +
                </button>
              </div>
            </h5>
            <h5>
              {/* {cartItem.subtotal?cartItem.subtotal:(cartItem.quantity*cartItem.price)} */}
              {cartItem.subtotal}
              <MdDelete
                size={25}
                className="mx-2"
                onClick={() => handelDelete(cartItem.name)}
                style={{ cursor: "pointer" }}
              />
            </h5>
          </div>
        ))}
      </div>
      <div className="mt-4 d-flex justify-content-between">
        <div
          className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
          style={{ cursor: "pointer" }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            {" "}
            <h6>Return To Shop</h6>
          </Link>
        </div>
        <div
          className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
          style={{ cursor: "pointer" }}
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
              style={{ width: "300px", height: "56px" }}
            />
          </div>
          <div>
            <button type="submit" class="cart-style mx-3">
              Apply Coupon
            </button>
          </div>
        </div>
        <div className="process-box mb-5">
          <h5 className="mt-4" style={{ fontFamily: "Poppins" }}>
            Cart Total
          </h5>
          <div className="process-box-row">
            <h6>Subtotal:</h6>
            <h6>${total}</h6>
          </div>
          <hr />
          <div className="process-box-row">
            <h6>Shipping:</h6>
            <h6>Free</h6>
          </div>
          <hr />
          <div className="process-box-row">
            <h6>Total:</h6>
            <h6>${total}</h6>
          </div>
          <div className="d-flex justify-content-center">
            <Link to={"/checkout"}>
              <button type="submit" class="cart-style mt-3">
                Procees to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
