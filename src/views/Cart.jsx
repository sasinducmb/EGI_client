import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, addToCart, total } =
    useContext(CartContext);
  const [inStacok, setInStock] = useState(true);
  // console.log(cart);

  const increment = (itemName) => {
    const currentItem = cart.find((item) => item.name === itemName);
    if (currentItem) {
      // Check if the current item quantity is less than the available stock
      if (currentItem.quantity < currentItem.ct) {
        updateQuantity(itemName, currentItem.quantity + 1);
      } else {
        // Optionally, handle the case where the stock limit is reached
        setInStock(false);
        console.log("Cannot increase quantity. Max stock limit reached.");
      }
    }
  };

  const decrement = (itemName) => {
    const currentItem = cart.find((item) => item.name === itemName);
    if (currentItem && currentItem.quantity > 1) {
      updateQuantity(itemName, currentItem.quantity - 1);
    } else {
      // Optional: Handle the case where quantity is already at the minimum
      console.log("Cannot decrease quantity. Minimum limit reached.");
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
          <h5>Price(Rs)</h5>
          {/* <h5>weight(g)</h5> */}

          <h5>Quantity</h5>
          <h5>Subtotal</h5>
        </div>
        {cart.map((cartItem, index) => (
          <div className="cart-row" key={index}>
            {cartItem.pic ? (
              <div>
              
                 <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${cartItem.pic.split(cartItem.pic.includes("\\") ? "\\" : "/").pop()}`}
                alt={cartItem.pic}
                style={{ height: "50px" }}/>

                {cartItem.quantity != cartItem.ct ? (
                  <p className="text-success">
                    <b>In Stock</b>
                  </p>
                ) : (
                  <p className="text-danger">
                    <b>Max limit reached</b>
                  </p>
                )}
              </div>
            ) : (
              <div>No image available</div> // Placeholder in case there's no image
            )}
            <h5>{cartItem.price}</h5>
            {/* <h5>{cartItem.newweight ?cartItem.newweight:cartItem.weight}</h5> */}
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
          <hr />
          <div className="process-box-row">
            <h6>Total:</h6>
            <h6>Rs {total}</h6>
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
