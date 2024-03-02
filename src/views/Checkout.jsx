import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../auth/userContext";
import axios from "axios";

const Checkout = () => {
  const { cart, total, removeFromCart } = useContext(CartContext);
  const { user, isLoading, error } = useContext(UserContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [town, setTown] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const handelDelete = (itemName) => {
    removeFromCart(itemName);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const billDetails = [
      {
        name,
        address,
        apartment,
        town,
        phoneNo,
        email,
      },
    ];

    const orderData = {
      user: user._id,
      items: cart.map((item) => ({
        product: item.id, // Assuming 'id' is the product ID
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      billDetails,
      total
    };

    try {
      const response = await axios.post("/order/addOrder", orderData);
    } catch (error) {
      console.log("err"); // console.error(err.message);
      // You might also want to set an error message here for other kinds of errors
    }

    console.log(orderData);
    console.log(billDetails);
  };

  console.log(user);

  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>
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
              <h5 style={{ opacity: "50%" }}>
                Name<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="first"
                class="form-control"
                id="inputFirst"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "470px", height: "50px" }}
              />
            </div>

            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Street Address<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Street"
                class="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="inputStreet"
                style={{ width: "470px", height: "50px" }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Apartment, floor, etc. (optional)
              </h5>
              <input
                type="Apartment"
                class="form-control"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                id="inputApartment"
                style={{ width: "470px", height: "50px" }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Town/City<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Town"
                class="form-control"
                id="inputTown"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                style={{ width: "470px", height: "50px" }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Phone Number<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Phone"
                class="form-control"
                id="inputPhone"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                style={{ width: "470px", height: "50px" }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Email Address<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                id="inputEmail"
                style={{ width: "470px", height: "50px" }}
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
                <h5>{cartItem.name}</h5>
                <h5>
                  ${cartItem.subtotal}{" "}
                  <MdDelete
                    size={25}
                    onClick={() => handelDelete(cartItem.name)}
                    style={{ cursor: "pointer" }}
                  />
                </h5>
              </div>
            ))}
          </div>
          <div>
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
                  style={{ width: "300px", height: "56px" }}
                />
              </div>
              <div>
                <button type="submit" class="cart-style mx-3">
                  Apply Coupon
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handelSubmit}
                class="cart-style mt-3"
              >
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
