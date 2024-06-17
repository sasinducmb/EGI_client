import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../auth/userContext";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import md5 from "crypto-js/md5";
const Checkout = () => {
  const { cart, total, formattedTotalWeight, removeFromCart } =
    useContext(CartContext);
  const { user, isLoading, error } = useContext(UserContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [town, setTown] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryOption, setDeliveryOption] = useState('pickup');

  const handleChange = (event) => {
    setDeliveryOption(event.target.value);
  };

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
    let [kilograms, grams] = formattedTotalWeight
      .split("kg")
      .map((part) => parseFloat(part) || 0);
    let totalWeightInKg = kilograms + grams / 1000; // Convert grams to kg and add to kilograms

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
    if (deliveryOption === 'deliver' && town !== '' && formattedTotalWeight !== '') {
      setShippingCost(calculateDeliveryCost(town, formattedTotalWeight));
    } else {
      setShippingCost(0);
    }
  }, [town, formattedTotalWeight, deliveryOption]);
  const finalTotal = parseFloat(total) + (parseFloat(shippingCost) || 0);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const billDetails = [
      {
        name,
        address,
        apartment,
        town,
        phoneNo,
        email,
        deliveryOption
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
      total: finalTotal,
    };
    try {
      const response = await axios.post("/order/addOrder", orderData);
      if (response.data) {
        const merchantId = process.env.REACT_APP_MERCHANT_ID;// Replace with your Merchant ID
        const merchantSecret =process.env.REACT_APP_MERCHANT_SECRET; // Replace with your Merchant Secret
        const orderId = `Order${Date.now()}`;
        const amount = parseFloat(finalTotal).toFixed(2).replace(",", "");
        const currency = "LKR";
        // to_upper_case(md5(merchant_id + order_id + amount + currency + to_upper_case(md5(merchant_secret))))
        const hashedSecret = md5(merchantSecret).toString().toUpperCase();
        const hash = md5(
          merchantId + orderId + amount + currency + hashedSecret
        )
          .toString()
          .toUpperCase();

        const paymentData = {
          merchant_id: merchantId,
          return_url: `${process.env.REACT_APP_MAIN_URL}/success`,
          cancel_url: `${process.env.REACT_APP_MAIN_URL}/cancel`,
          notify_url: `${process.env.REACT_APP_API_URL}/order/payment-notify`,
          first_name: name.split(" ")[0],
          last_name: name.split(" ").slice(1).join(" "),
          email: email,
          phone: phoneNo,
          address: address,
          city: town,
          country: "Sri Lanka",
          order_id: orderId,
          items: cart.map((item) => item.name).join(", "),
          currency: currency,
          amount: amount,
          hash: hash,
        };

        const form = document.createElement("form");
        form.method = "POST";
        form.action = process.env.REACT_APP_PAYHERE_CHECKOUT_URL; // Use 'https://www.payhere.lk/pay/checkout' for production

        for (const key in paymentData) {
          if (paymentData.hasOwnProperty(key)) {
            const hiddenField = document.createElement("input");
            hiddenField.type = "hidden";
            hiddenField.name = key;
            hiddenField.value = paymentData[key];
            form.appendChild(hiddenField);
          }
        }
        document.body.appendChild(form);
        form.submit();
        localStorage.removeItem("cart");
      }
    } catch {
      console.log("err");
    }
  };
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

        <div  className="col-lg-6 col-md-12" style={{border:'2px solid red'}}>
        <h2 className="mx-5">Delivery Option</h2>
        <form>
        <div className="form-check mt-3 mx-5">
          <input
            className="form-check-input"
            type="radio"
            name="deliveryOption"
            id="pickup"
            value="pickup"
            checked={deliveryOption === 'pickup'}
            onChange={handleChange}
            required
            style={{ fontSize: '20px' }}
          />
          <label className="form-check-label" htmlFor="pickup" style={{ fontSize: '20px' }}>
            Pickup at Office
          </label>
        </div>
        <div className="form-check mt-3 mx-5">
          <input
            className="form-check-input"
            type="radio"
            name="deliveryOption"
            id="deliver"
            value="deliver"
            checked={deliveryOption === 'deliver'}
            onChange={handleChange}
            required
            style={{ fontSize: '20px' }}
          />
          <label className="form-check-label" htmlFor="deliver" style={{ fontSize: '20px' }}>
            Deliver
          </label>
        </div>
      </form>
        </div>
      <div className="row pt-5">
        <div className="col-lg-6 col-md-12">
          <h2>Delivery Details</h2>
          <div className="pt-3 pb-3">
            <form onSubmit={handleSubmit}>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Name<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirst"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "470px", height: "50px" }}
                  required
                />
              </div>

              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Street Address<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="inputStreet"
                  style={{ width: "470px", height: "50px" }}
                  required
                />
              </div>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Apartment, floor, etc. (optional)
                </h5>
                <input
                  type="text"
                  className="form-control"
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
                  type="text"
                  className="form-control"
                  id="inputTown"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  style={{ width: "470px", height: "50px" }}
                  required
                />
              </div>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Phone Number<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  className="form-control"
                  id="inputPhone"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  style={{ width: "470px", height: "50px" }}
                  required
                />
              </div>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Email Address<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="inputEmail"
                  style={{ width: "470px", height: "50px" }}
                  required
                />
              </div>
              <div>
                <button type="submit" className="cart-style mt-3 mb-3">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 padding-style">
          <div>
            {cart.map((cartItem, index) => (
              <div className="cart-row" key={index}>
                {cartItem.pic ? (
                  <img
                    src={`${
                      process.env.REACT_APP_API_URL
                    }/uploads/${cartItem.pic
                      .split(cartItem.pic.includes("\\") ? "\\" : "/")
                      .pop()}`}
                    alt={cartItem.pic}
                    style={{ height: "50px" }}
                  />
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
              <h6>
                {shippingCost !== null
                  ? `Rs ${shippingCost} LKR`
                  : "Enter town to calculate shipping"}
              </h6>
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
              {/* <div>
                <input
                  type="first"
                  class="form-control"
                  id="inputFirst"
                  placeholder="Coupon Code"
                  style={{ width: "300px", height: "56px" }}
                />
              </div> */}

              {/* <div>
                <button type="submit" class="cart-style mx-3">
                  Apply Coupon
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
