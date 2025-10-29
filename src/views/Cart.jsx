import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);
  const [inStock, setInStock] = useState(true);

  const increment = (itemId) => {
    const currentItem = cart.find((item) => item._id === itemId);
    if (currentItem) {
      if (currentItem.quantity < currentItem.ct) {
        updateQuantity(itemId, currentItem.quantity + 1);
        setInStock(true);
      } else {
        setInStock(false);
        console.log("Cannot increase quantity. Max stock limit reached.");
      }
    }
  };

  const decrement = (itemId) => {
    const currentItem = cart.find((item) => item._id === itemId);
    if (currentItem && currentItem.quantity > 1) {
      updateQuantity(itemId, currentItem.quantity - 1);
    } else {
      console.log("Cannot decrease quantity. Minimum limit reached.");
    }
  };

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  const total = totalPrice.toFixed(2);

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="row d-flex pt-5">
        <div className="d-flex align-items-center">
          <h6 style={{ opacity: "50%", margin: 0 }}>Home</h6>
          <span style={{ margin: "0 8px", opacity: "50%" }}>/</span>
          <h6 style={{ margin: 0, fontWeight: "600" }}>Cart</h6>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="row mt-5">
          <div className="col-12 text-center py-5">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" style={{ margin: "0 auto" }}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h5 className="mt-4" style={{ color: "#374151" }}>Your cart is empty</h5>
            <Link 
              to="/" 
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "12px 32px",
                background: "linear-gradient(to right, #5f9ea0, #4a7c7e)",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "600",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="row mt-5">
            {/* Header Row */}
            <div style={{ 
              display: "flex",
              alignItems: "center",
              padding: "20px 25px",
              background: "#5f9ea0",
              borderRadius: "8px 8px 0 0",
              marginBottom: "0"
            }}>
              <div style={{ flex: "2", color: "white", fontWeight: "600", fontSize: "16px" }}>
                Product
              </div>
              <div style={{ flex: "1", color: "white", fontWeight: "600", fontSize: "16px", textAlign: "center" }}>
                Price(Rs)
              </div>
              <div style={{ flex: "1", color: "white", fontWeight: "600", fontSize: "16px", textAlign: "center" }}>
                Quantity
              </div>
              <div style={{ flex: "1", color: "white", fontWeight: "600", fontSize: "16px", textAlign: "right" }}>
                Subtotal
              </div>
            </div>

            {/* Cart Items */}
            <div style={{ background: "white", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px" }}>
              {cart.map((cartItem, index) => (
                <div 
                  key={cartItem._id || index}
                  style={{ 
                    display: "flex",
                    alignItems: "center",
                    padding: "25px",
                    borderBottom: index < cart.length - 1 ? "1px solid #f3f4f6" : "none"
                  }}
                >
                  {/* Product Column */}
                  <div style={{ flex: "2", display: "flex", alignItems: "center" }}>
                    {cartItem.pic ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${cartItem.pic
                          .split(cartItem.pic.includes("\\") ? "\\" : "/")
                          .pop()}`}
                        alt={cartItem.name}
                        style={{ 
                          height: "80px", 
                          width: "80px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginRight: "20px"
                        }}
                      />
                    ) : (
                      <div style={{ 
                        width: "80px", 
                        height: "80px", 
                        background: "#f3f4f6",
                        borderRadius: "4px",
                        marginRight: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>No image</span>
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "15px", marginBottom: "8px" }}>
                        {cartItem.name}
                      </div>
                      {cartItem.quantity !== cartItem.ct ? (
                        <span style={{ 
                          color: "#059669", 
                          fontWeight: "600", 
                          fontSize: "13px",
                          background: "#d1fae5",
                          padding: "4px 12px",
                          borderRadius: "12px"
                        }}>
                          ✓ In Stock
                        </span>
                      ) : (
                        <span style={{ 
                          color: "#dc2626", 
                          fontWeight: "600", 
                          fontSize: "13px",
                          background: "#fee2e2",
                          padding: "4px 12px",
                          borderRadius: "12px"
                        }}>
                          Max limit reached
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Column */}
                  <div style={{ flex: "1", textAlign: "center" }}>
                    <span style={{ fontWeight: "500", color: "#1f2937", fontSize: "15px" }}>
                      Rs {cartItem.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity Column */}
                  <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    <button
                      onClick={() => decrement(cartItem._id)}
                      style={{
                        width: "35px",
                        height: "35px",
                        border: "1px solid #d1d5db",
                        background: "white",
                        color: "#374151",
                        fontWeight: "600",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      −
                    </button>
                    <span style={{ minWidth: "30px", textAlign: "center", fontWeight: "600", fontSize: "15px" }}>
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => increment(cartItem._id)}
                      style={{
                        width: "35px",
                        height: "35px",
                        border: "1px solid #d1d5db",
                        background: "white",
                        color: "#374151",
                        fontWeight: "600",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal Column */}
                  <div style={{ flex: "1", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "15px" }}>
                    <span style={{ fontWeight: "600", fontSize: "16px", color: "#1f2937" }}>
                      Rs {(cartItem.price * cartItem.quantity).toFixed(2)}
                    </span>
                    <MdDelete
                      size={24}
                      onClick={() => handleDelete(cartItem._id)}
                      style={{ cursor: "pointer", color: "#dc2626" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return To Shop Button */}
          <div className="mt-4">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <div
                style={{
                  padding: "12px 28px",
                  border: "2px solid #5f9ea0",
                  background: "white",
                  color: "#5f9ea0",
                  fontWeight: "600",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "inline-block",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5f9ea0";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#5f9ea0";
                }}
              >
                Return To Shop
              </div>
            </Link>
          </div>

          {/* Coupon and Cart Total */}
          <div className="mt-5 d-flex justify-content-between gap-4 flex-wrap">
            <div className="d-flex gap-3 flex-wrap align-items-start">
              <input
                type="text"
                className="form-control"
                placeholder="Coupon Code"
                style={{ 
                  width: "300px", 
                  height: "56px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "15px",
                  padding: "0 16px"
                }}
              />
              <button 
                type="button"
                style={{
                  padding: "16px 32px",
                  height: "56px",
                  background: "#D97706",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#B45309";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#D97706";
                }}
              >
                Apply Coupon
              </button>
            </div>

            <div 
              className="mb-5"
              style={{
                minWidth: "350px",
                background: "white",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              <h5 
                className="mt-2" 
                style={{ 
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "16px"
                }}
              >
                Cart Total
              </h5>
              <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <h6 style={{ margin: 0, color: "#6b7280", fontWeight: "500" }}>Total:</h6>
                <h6 style={{ margin: 0, color: "#1f2937", fontWeight: "700", fontSize: "20px" }}>
                  Rs {Number(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h6>
              </div>
              <div className="d-flex justify-content-center">
                <Link to={"/checkout"} style={{ width: "100%" }}>
                  <button 
                    type="button"
                    style={{
                      width: "100%",
                      padding: "14px 0",
                      background: "linear-gradient(to right, #5f9ea0, #4a7c7e)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                    }}
                  >
                    Proceed to Checkout →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;