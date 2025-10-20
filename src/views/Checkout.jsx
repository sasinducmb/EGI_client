import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../auth/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Checkout.css";
import md5 from "crypto-js/md5";

const Checkout = () => {
  const { cart, totalPrice, removeFromCart } = useContext(CartContext);
  const { user, isLoading, error } = useContext(UserContext);
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [town, setTown] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [shippingCost, setShippingCost] = useState(0);

  // Debug: Log on mount
  useEffect(() => {
    console.log("🔍 Checkout Component Loaded");
    console.log("👤 User:", user);
    console.log("🛒 Cart:", cart);
    console.log("💰 Total Price:", totalPrice);
    console.log("🌐 API URL:", process.env.REACT_APP_API_URL);
  }, []);

  const handleChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  // Calculate total weight from cart items
  const calculateTotalWeight = () => {
    const totalWeightInGrams = cart.reduce((total, item) => {
      const itemWeight = item.weight || 0;
      return total + (itemWeight * (item.quantity || 1));
    }, 0);

    const kilograms = Math.floor(totalWeightInGrams / 1000);
    const grams = totalWeightInGrams % 1000;
    
    return { kilograms, grams, totalWeightInGrams };
  };

  const { kilograms, grams, totalWeightInGrams } = calculateTotalWeight();
  const formattedTotalWeight = `${kilograms}kg ${grams}g`;

  const calculateDeliveryCost = (town, totalWeightInGrams) => {
    let baseCost = town.toLowerCase() === "colombo" ? 400 : 500;
    const totalWeightInKg = totalWeightInGrams / 1000;

    let additionalWeightCost = 0;
    if (totalWeightInKg > 1) {
      let additionalKg = Math.ceil(totalWeightInKg - 1);
      additionalWeightCost = additionalKg * 100;
    }

    return baseCost + additionalWeightCost;
  };

  useEffect(() => {
    if (deliveryOption === "deliver" && town !== "" && totalWeightInGrams > 0) {
      setShippingCost(calculateDeliveryCost(town, totalWeightInGrams));
    } else {
      setShippingCost(0);
    }
  }, [town, totalWeightInGrams, deliveryOption]);

  const finalTotal = (totalPrice || 0) + (shippingCost || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("🔘 Place Order button clicked!");
    console.log("📋 Form Data:", { name, address, town, phoneNo, email, deliveryOption });

    // Check if user is logged in
    if (!user || !user._id) {
      console.error("❌ User not logged in");
      toast.error("Please login to place an order");
      return;
    }

    console.log("✅ User is logged in:", user._id);

    // Check if cart is empty
    if (!cart || cart.length === 0) {
      console.error("❌ Cart is empty");
      toast.error("Your cart is empty");
      return;
    }

    console.log("✅ Cart has items:", cart.length);
    console.log("🚀 Submitting order...");

    const billDetails = [
      {
        name,
        address,
        apartment,
        town,
        phoneNo,
        email,
        deliveryOption,
      },
    ];

    const orderData = {
      user: user._id,
      items: cart.map((item) => ({
        product: item._id || item.id,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
      billDetails,
      total: finalTotal,
    };

    console.log("📦 Order Data:", orderData);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("❌ No token found");
        toast.error("Authentication required. Please login again.");
        return;
      }

      // TEMPORARY: Hardcoded URL for testing
      const apiUrl = "http://localhost:5000/order/addOrder";
      console.log("🌐 API URL:", apiUrl);
      console.log("🔍 ENV CHECK - API_URL:", process.env.REACT_APP_API_URL);
      
      const response = await axios.post(apiUrl, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("✅ Order Response:", response.data);
      
      if (response.data && response.data.success) {
        toast.success("Order placed successfully! Redirecting to payment...");
        
        // Replace these with your actual PayHere credentials
        const merchantId = "1228337";
        const merchantSecret = "YOUR_MERCHANT_SECRET_HERE"; // ⚠️ REPLACE THIS
        
        const orderId = `Order${Date.now()}`;
        const amount = parseFloat(finalTotal).toFixed(2);
        const currency = "LKR";

        // Generate hash for PayHere
        const hashedSecret = md5(merchantSecret).toString().toUpperCase();
        const amountFormatted = amount.replace(".", ""); // Remove decimal for hash
        const hash = md5(
          merchantId + orderId + amountFormatted + currency + hashedSecret
        ).toString().toUpperCase();

        console.log("💳 Payment Hash Data:", {
          merchantId,
          orderId,
          amount,
          currency,
          hash
        });

        const paymentData = {
          merchant_id: merchantId,
          return_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel",
          notify_url: "http://localhost:5000/order/payment-notify",
          first_name: name.split(" ")[0] || "Customer",
          last_name: name.split(" ").slice(1).join(" ") || "Name",
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

        console.log("💳 Submitting to PayHere:", paymentData);

        // Create and submit form to PayHere
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://sandbox.payhere.lk/pay/checkout";

        Object.keys(paymentData).forEach(key => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = paymentData[key];
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        
        console.log("💳 Redirecting to PayHere...");
        form.submit();
        
        // Clear cart after form submission
        setTimeout(() => {
          localStorage.removeItem("cart");
          localStorage.removeItem("guestCart");
        }, 100);
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (err) {
      console.error("❌ Order submission error:", err);
      console.error("Error details:", err.response?.data || err.message);
      
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Invalid order data");
      } else if (err.response?.status === 403) {
        toast.error("Access denied. Please check your permissions.");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row d-flex pt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>
              Account /My Account / Product / Cart /
            </h6>
            <h6 className="ms-2">Checkout</h6>
          </div>
        </div>
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
                  required
                />
              </div>

              <div>
                <div className="alert alert-warning" role="alert">
                  Before placing the order, please ensure the delivery option is correct.
                </div>
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
                    src={`http://localhost:5000/uploads/${cartItem.pic
                      .split(cartItem.pic.includes("\\") ? "\\" : "/")
                      .pop()}`}
                    alt={cartItem.name}
                    style={{ height: "50px" }}
                  />
                ) : (
                  <div>No image available</div>
                )}
                <h5>{cartItem.name}</h5>
                <h5>Rs {(cartItem.price * cartItem.quantity).toFixed(2)}</h5>
              </div>
            ))}
          </div>

          <div>
            <div className="process-box-row">
              <h6>Subtotal:</h6>
              <h6>Rs {(totalPrice || 0).toFixed(2)}</h6>
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
                {deliveryOption === "deliver"
                  ? `Rs ${shippingCost.toFixed(2)}`
                  : "Rs 0.00 (Pickup)"}
              </h6>
            </div>
            <hr />
            <div className="process-box-row">
              <h6>Total:</h6>
              <h6>Rs {finalTotal.toFixed(2)}</h6>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <div
                className="col-lg-12 col-md-12"
                style={{ border: "2px solid #dc3545", padding: "20px", borderRadius: "8px" }}
              >
                <h2 className="mx-3">Delivery Option</h2>
                <form>
                  <div className="form-check mt-3 mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="deliveryOption"
                      id="pickup"
                      value="pickup"
                      checked={deliveryOption === "pickup"}
                      onChange={handleChange}
                      required
                      style={{ fontSize: "20px" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="pickup"
                      style={{ fontSize: "18px" }}
                    >
                      Pickup at Office
                    </label>
                  </div>
                  <div className="form-check mt-3 mx-3 mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="deliveryOption"
                      id="deliver"
                      value="deliver"
                      checked={deliveryOption === "deliver"}
                      onChange={handleChange}
                      required
                      style={{ fontSize: "20px" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="deliver"
                      style={{ fontSize: "18px" }}
                    >
                      Deliver
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;