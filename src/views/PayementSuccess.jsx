import React, { useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    // Prevent multiple toast notifications
    if (hasShownToast.current) return;
    hasShownToast.current = true;
    
    console.log("✅ Payment Success Page Loaded");
    
    // Clear any remaining cart data
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("guestCart");
    
    // Show success message only once
    toast.success("Payment completed successfully! Thank you for your order.", {
      autoClose: 5000
    });
  }, []); // Empty dependency array to run only once

  return (
    <div className="container pt-4 pb-5">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="container" style={{ maxWidth: "500px" }}>
            <div style={{
              textAlign: "center",
              padding: "50px 40px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
            }}>
              {/* Success Checkmark Icon */}
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 30px",
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                animation: "scaleIn 0.6s ease-out"
              }}>
                <svg 
                  width="60" 
                  height="60" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "36px",
                  fontFamily: "Poppins",
                  color: "#10b981",
                  marginBottom: "20px"
                }}
              >
                Payment Successful!
              </h2>
              <p style={{
                fontSize: "16px",
                color: "#6b7280",
                marginBottom: "30px",
                lineHeight: "1.6"
              }}>
                Thank you for your purchase! Your order has been confirmed and will be processed shortly. You'll receive an email confirmation soon.
              </p>
              
              <div style={{
                background: "#f0fdf4",
                border: "2px solid #10b981",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "30px",
                textAlign: "left"
              }}>
                <h5 style={{ color: "#059669", marginBottom: "12px", fontSize: "18px" }}>
                  ✓ Order Confirmed
                </h5>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                  Your payment was processed successfully. Check your email for order details and tracking information.
                </p>
              </div>

              <div className="d-flex flex-column gap-3">
                <Link to={"/account"} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      height: "56px",
                      borderRadius: "8px",
                      border: "none",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "linear-gradient(to right, #10b981, #059669)",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "16px",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
                    }}
                  >
                    📦 View My Orders
                  </button>
                </Link>
                
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      height: "56px",
                      borderRadius: "8px",
                      border: "2px solid #10b981",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "white",
                      color: "#10b981",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "16px",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f0fdf4";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    🏠 Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccess;