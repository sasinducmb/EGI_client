import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../auth/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Checkout.css";
import md5 from "crypto-js/md5";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [town, setTown] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [shippingCost, setShippingCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("🔍 Checkout loaded - User:", user?._id, "Cart items:", cart?.length);
  }, [user, cart]);

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
    
    if (isSubmitting) {
      console.log("⚠️ Already submitting...");
      return;
    }

    console.log("🔘 Place Order clicked!");
    
    // Validation
    if (!user || !user._id) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    const billDetails = [{
      name,
      address,
      apartment,
      town,
      phoneNo,
      email,
      deliveryOption,
    }];

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
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error("Authentication required. Please login again.");
        navigate("/login");
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      
      console.log("🚀 Submitting order to:", `${apiUrl}/order/addOrder`);
      
      const response = await axios.post(`${apiUrl}/order/addOrder`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("✅ Order Response:", response.data);
      
      if (response.data && response.data.success) {
        // Handle Pickup Option
        if (deliveryOption === "pickup") {
          console.log("📦 Pickup option selected - Order saved");
          
          // Clear cart immediately for pickup
          await clearCart();
          localStorage.removeItem("cart");
          localStorage.removeItem("guestCart");
          
          toast.success("Order placed successfully! Please pick up at our office.", {
            autoClose: 3000
          });
          
          // Redirect to home page
          setTimeout(() => {
            navigate("/");
          }, 1500);
          
        } else {
          // Handle Delivery Option - Redirect to PayHere
          console.log("💳 Delivery option - Redirecting to payment...");
          
          toast.info("Redirecting to payment gateway...");
          
          // PayHere Configuration
          const merchantId = process.env.REACT_APP_PAYHERE_MERCHANT_ID || "1228337";
          const merchantSecret = process.env.REACT_APP_PAYHERE_MERCHANT_SECRET;
          
          // ⚠️ CRITICAL: Check if merchant secret exists
          if (!merchantSecret || merchantSecret === "YOUR_MERCHANT_SECRET") {
            toast.error("Payment configuration error. Please contact support.");
            console.error("❌ Merchant secret not configured!");
            setIsSubmitting(false);
            return;
          }

          const orderId = `ORD${Date.now()}`;
          const amount = parseFloat(finalTotal).toFixed(2);
          const currency = "LKR";

          // ✅ Correct PayHere hash generation
          const hashedSecret = md5(merchantSecret).toString().toUpperCase();
          const hash = md5(
            merchantId + orderId + amount + currency + hashedSecret
          ).toString().toUpperCase();

          console.log("💳 Payment Hash Details:", {
            merchantId,
            orderId,
            amount,
            currency,
            hashPreview: hash.substring(0, 20) + "...",
            secretConfigured: !!merchantSecret
          });

          const paymentData = {
            merchant_id: merchantId,
            return_url: `${window.location.origin}/success`,
            cancel_url: `${window.location.origin}/cancel`,
            notify_url: `${apiUrl}/order/payment-notify`,
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

          console.log("💳 PayHere Payment Data:", {
            ...paymentData,
            hash: hash.substring(0, 20) + "..."
          });

          // Create and submit form
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
          
          // ⚠️ CRITICAL FIX: DO NOT clear cart here!
          // Cart will be cleared only on successful payment (in PaymentSuccess component)
          console.log("💳 Submitting to PayHere Sandbox (Cart NOT cleared yet)...");
          form.submit();
        }
      } else {
        throw new Error("Order creation failed");
      }
    } catch (err) {
      console.error("❌ Order submission error:", err);
      
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Invalid order data");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex pt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>
              Account / My Account / Product / Cart /
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
                  required
                  disabled={isSubmitting}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
                  required
                  disabled={isSubmitting}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
                  disabled={isSubmitting}
                />
              </div>

              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Town (District)<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  className="form-control"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Phone Number<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="tel"
                  className="form-control"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
                  required
                  disabled={isSubmitting}
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
                  style={{ width: "100%", maxWidth: "470px", height: "50px" }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <div className="alert alert-warning" role="alert">
                  <strong>Important:</strong> Please ensure the delivery option is correct before placing your order.
                  {deliveryOption === "pickup" && (
                    <div className="mt-2">
                      <strong>Pickup Option Selected:</strong> No shipping charges. Pick up at our office.
                    </div>
                  )}
                  {deliveryOption === "deliver" && (
                    <div className="mt-2">
                      <strong>Delivery Option Selected:</strong> You will be redirected to payment gateway.
                    </div>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="cart-style mt-3 mb-3"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.6 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
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
                    src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${cartItem.pic
                      .split(cartItem.pic.includes("\\") ? "\\" : "/")
                      .pop()}`}
                    alt={cartItem.name}
                    style={{ height: "50px" }}
                  />
                ) : (
                  <div>No image</div>
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
              <h6>Total Weight:</h6>
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
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      required
                      disabled={isSubmitting}
                      style={{ fontSize: "20px" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="pickup"
                      style={{ fontSize: "18px" }}
                    >
                      Pickup at Office (No Payment Required)
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
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      required
                      disabled={isSubmitting}
                      style={{ fontSize: "20px" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="deliver"
                      style={{ fontSize: "18px" }}
                    >
                      Deliver (Online Payment Required)
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