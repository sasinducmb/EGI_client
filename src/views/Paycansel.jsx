import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PaymentCancel() {
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    // Prevent multiple toast notifications
    if (hasShownToast.current) return;
    hasShownToast.current = true;

    console.log("⚠️ Payment Cancel Page Loaded");
    toast.warning("Payment was cancelled. Your order was not completed.", {
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
              {/* Cancel X Icon */}
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 30px",
                boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)",
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>

              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "36px",
                  fontFamily: "Poppins",
                  color: "#f59e0b",
                  marginBottom: "20px"
                }}
              >
                Payment Cancelled
              </h2>
              
              <p style={{
                fontSize: "16px",
                color: "#6b7280",
                marginBottom: "40px",
                lineHeight: "1.6"
              }}>
                Your payment was cancelled and no charges were made. Your cart items are still saved.
              </p>

              <div className="d-flex flex-column gap-3">
                <Link to={"/checkout"} style={{ textDecoration: "none" }}>
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
                      background: "linear-gradient(to right, #f59e0b, #d97706)",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "16px",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(245, 158, 11, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(245, 158, 11, 0.3)";
                    }}
                  >
                    🔄 Try Again
                  </button>
                </Link>
                
                <Link to={"/cart"} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      height: "56px",
                      borderRadius: "8px",
                      border: "2px solid #f59e0b",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "white",
                      color: "#f59e0b",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "16px",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fffbeb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    🛒 View Cart
                  </button>
                </Link>

                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      height: "56px",
                      borderRadius: "8px",
                      border: "2px solid #9ca3af",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "white",
                      color: "#6b7280",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "16px",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    🏠 Home Page
                  </button>
                </Link>
              </div>

              <div style={{
                marginTop: "30px",
                padding: "20px",
                background: "#f9fafb",
                borderRadius: "8px",
                textAlign: "left"
              }}>
                <h6 style={{ 
                  fontSize: "14px", 
                  fontWeight: 600, 
                  color: "#374151",
                  marginBottom: "10px"
                }}>
                  Need help?
                </h6>
                <p style={{ 
                  fontSize: "13px", 
                  color: "#6b7280",
                  margin: 0,
                  lineHeight: "1.6"
                }}>
                  If you're experiencing issues with payment, please contact our customer support team for assistance.
                </p>
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

export default PaymentCancel;