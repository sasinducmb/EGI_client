import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../auth/userContext";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const { cart, total,formattedTotalWeight, removeFromCart } = useContext(CartContext);
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
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+Rs/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNo) => {
    const phoneRegex = /^[0-9]{10}Rs/; // Adjust regex as per your phone number format
    return phoneRegex.test(phoneNo);
  };

  const calculateDeliveryCost = (town, formattedTotalWeight) => {
    let baseCost = town.toLowerCase() === "colombo" ? 400 : 500;
    
    // Extracting kilograms and grams from the formatted weight
    let [kilograms, grams] = formattedTotalWeight.split('kg').map(part => parseFloat(part) || 0);
    let totalWeightInKg = kilograms + (grams / 1000); // Convert grams to kg and add to kilograms
  
    // Calculate additional weight cost
    let additionalWeightCost = 0;
    if (totalWeightInKg > 1) {
      // Subtracting 1 because the first kg is covered in the base cost
      let additionalKg = Math.ceil(totalWeightInKg - 1);
      additionalWeightCost = additionalKg * 100;
    }
  
    return baseCost + additionalWeightCost;
  };

  const [shippingCost, setShippingCost] = useState(0);
  useEffect(() => {
    if (town !== '') {
      setShippingCost(calculateDeliveryCost(town, formattedTotalWeight));
    }
  }, [town, formattedTotalWeight]);

  const finalTotal = parseFloat(total) + (parseFloat(shippingCost) || 0);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!isValidEmail(email)) {
  //     toast.error("Invalid email format.");
  //     return;
  //   }

  //   if (!isValidPhoneNumber(phoneNo)) {
  //     toast.error("Invalid phone number format.");
  //     return;
  //   }

  //   const billDetails = [
  //     {
  //       name,
  //       address,
  //       apartment,
  //       town,
  //       phoneNo,
  //       email,
  //     },
  //   ];


  
  //   const orderData = {
  //     user: user._id,
  //     items: cart.map((item) => ({
  //       product: item.id, // Assuming 'id' is the product ID
  //       quantity: item.quantity,
  //       subtotal: item.subtotal,
  //     })),
  //     billDetails,
  //     total,
  //   };

  //   // console.log(cart);
  //   try {
  //     const response = await axios.post("/order/addOrder", orderData);
  //     if (response.status === 201) {
  //       const stripe = await loadStripe(
  //        process.env.REACT_APP_SECRET_STRIPE
  //       );

  //       const response = await axios.post("/order/payment", {
  //         total: orderData.total,
  //       });

  //       const session = response.data;

  //       stripe
  //         .redirectToCheckout({
  //           sessionId: session.id,
  //         })

        
  //         localStorage.removeItem("cart"); // Replace 'cart' with your cart's key in local storage
          
        
  //     }
  //   } catch (error) {
  //     console.log("err");
  //     // Handle error
  //   }
  // };

  // // Function to process the order
  // const processOrder = async (orderData) => {
  //   try {
  //     const response = await axios.post("/order/addOrder", orderData);
  //     if (response.status === 201) {
  //       Swal.fire({
  //         title: "Order Placed!",
  //         text: "Your order has been placed successfully.",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       }).then((result) => {
  //         if (result.value) {
  //           localStorage.removeItem("cart"); // Replace 'cart' with your cart's key in local storage
  //           window.location.href = "/"; // Redirect to the index page
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log("err");
  //     // Handle error
  //     Swal.fire({
  //       title: "Error!",
  //       text: "There was an error placing your order.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };

  // console.log(user);

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
        <div className="col-lg-6 col-md-12">
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
                Town (District)<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Town"
                class="form-control"
                id="inputTown"
                value={town}
                onChange={(e) => setTown(e.target.value.toLowerCase())}
                style={{ width: "470px", height: "50px" }}
                required
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
            {/* <div className="d-flex align-items-center">
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
            </div> */}
          </div>
        </div>

        <div className="col-lg-6 col-md-12 padding-style">
          <div>
            {cart.map((cartItem, index) => (
              <div className="cart-row" key={index}>
                {cartItem.pic ? (
                 <img
                 src={`${process.env.REACT_APP_API_URL}/uploads/${cartItem.pic.split(cartItem.pic.includes("\\") ? "\\" : "/").pop()}`}
                alt={cartItem.pic}
                style={{ height: "50px" }}/>
                ) : (
                  <div>No image available</div> // Placeholder in case there's no image
                )}
                <h5>{cartItem.name}</h5>
                <h5>
                  Rs {cartItem.subtotal}{" "}
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
              <h6>Rs {total}</h6>
            </div>
            <hr />
            <div className="process-box-row">
              <h6>Total-Weight:</h6>
              <h6>{formattedTotalWeight}</h6>
            </div>
            <hr />
            <div className="process-box-row">
              <h6>Shipping:</h6>
              <h6>{shippingCost !== null ? `Rs{shippingCost} LKR` : 'Enter town to calculate shipping'}</h6>
            </div>
            <hr />
            <div className="process-box-row">
              <h6>Total:</h6>
              <h6>Rs {finalTotal.toFixed(2)}</h6>
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
            {/* <div>
                <h2 class="mt-4">Payment Details</h2>
                <form>
                  <div class="form-group">
                    <label for="cardNumber">Card Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cardNumber"
                      placeholder="1234 1234 1234 1234"
                      maxlength="19"
                    />
                  </div>

                  <div class="form-row">
                    <div class="col">
                      <label for="expiryMonth">Expiry Month</label>
                      <input
                        type="text"
                        class="form-control"
                        id="expiryMonth"
                        placeholder="MM"
                        maxlength="2"
                      />
                    </div>
                    <div class="col">
                      <label for="expiryYear">Expiry Year</label>
                      <input
                        type="text"
                        class="form-control"
                        id="expiryYear"
                        placeholder="YY"
                        maxlength="2"
                      />
                    </div>
                  </div>

                  <div class="form-group mt-3">
                    <label for="cvv">CVV</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cvv"
                      placeholder="123"
                      maxlength="4"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Submit Payment
                  </button>
                </form>
              </div> */}

            <div>
              <button
                type="submit"
                // onClick={handleSubmit}
                class="cart-style mt-3 mb-3"
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
