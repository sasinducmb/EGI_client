import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../auth/userContext";

const Orders = () => {
  const { user, isLoading, error } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`order/user/${user._id}/orders`)
        .then(({ data }) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error("Error fetching orders", error);
        });
    }
  }, [user]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="row d-flex pt-5">
        <div className="d-flex align-items-center">
          <h6 style={{ opacity: "50%", margin: 0 }}>Home</h6>
          <span style={{ margin: "0 8px", opacity: "50%" }}>/</span>
          <h6 style={{ margin: 0, fontWeight: "600" }}>Orders</h6>
        </div>
      </div>

      {/* Orders Content */}
      <div className="container mt-4">
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "#5f9ea0" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: "#6b7280" }}>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <h3 style={{ color: "#374151" }}>No Orders Yet</h3>
            <p className="text-muted">Start shopping to see your orders here!</p>
          </div>
        ) : (
          <>
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="mb-4" 
                style={{ 
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
              >
                {/* Order Header - Clickable */}
                <div 
                  onClick={() => toggleOrderDetails(order._id)}
                  style={{ 
                    background: "linear-gradient(to right, #5f9ea0, #8b7355, #a0826d)",
                    padding: "20px 25px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h6 style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Order Date
                      </h6>
                      <h5 style={{ color: "white", fontWeight: "600", marginBottom: "0" }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </h5>
                    </div>
                    <div className="col-md-4 mt-3 mt-md-0">
                      <h6 style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Order ID
                      </h6>
                      <p style={{ color: "white", fontSize: "14px", marginBottom: "0", fontFamily: "monospace" }}>
                        #{order._id.slice(-8)}
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <h6 style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Total Amount
                      </h6>
                      <h3 style={{ color: "white", fontWeight: "700", marginBottom: "10px" }}>
                        Rs {order.total.toLocaleString()}
                      </h3>
                      <span style={{ 
                        background: "rgba(16, 185, 129, 0.9)", 
                        color: "white", 
                        padding: "6px 16px", 
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}>
                        ✓ Completed
                      </span>
                    </div>
                  </div>
                  <div className="text-center mt-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
                    <small style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>
                      {expandedOrder === order._id ? "▼ Hide Order Details" : "▶ View Order Details"}
                    </small>
                  </div>
                </div>

                {/* Order Items Table - Collapsible */}
                {expandedOrder === order._id && (
                  <div style={{ background: "white" }}>
                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead>
                          <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
                            <th style={{ fontWeight: "600", fontSize: "14px", padding: "16px 20px", color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              Product
                            </th>
                            <th className="text-center" style={{ fontWeight: "600", fontSize: "14px", padding: "16px 20px", color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              Price (Rs)
                            </th>
                            <th className="text-center" style={{ fontWeight: "600", fontSize: "14px", padding: "16px 20px", color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              Quantity
                            </th>
                            <th className="text-end" style={{ fontWeight: "600", fontSize: "14px", padding: "16px 20px", color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                              <td style={{ padding: "20px" }}>
                                <div className="d-flex align-items-center">
                                  <div 
                                    style={{ 
                                      width: "70px", 
                                      height: "70px", 
                                      background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                                      borderRadius: "8px",
                                      marginRight: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      border: "1px solid #e5e7eb"
                                    }}
                                  >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: "500", marginBottom: "8px", color: "#1f2937", fontSize: "15px" }}>
                                      {item.product ? item.product.productName : "Product Unavailable"}
                                    </div>
                                    <span style={{ 
                                      color: "#059669", 
                                      fontWeight: "600", 
                                      fontSize: "12px",
                                      background: "#d1fae5",
                                      padding: "4px 12px",
                                      borderRadius: "12px",
                                      display: "inline-block"
                                    }}>
                                      ✓ Delivered
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center" style={{ padding: "20px", verticalAlign: "middle" }}>
                                <span style={{ fontWeight: "500", color: "#374151", fontSize: "15px" }}>
                                  {item.product ? `Rs ${item.product.price.toLocaleString()}` : "N/A"}
                                </span>
                              </td>
                              <td className="text-center" style={{ padding: "20px", verticalAlign: "middle" }}>
                                <div style={{
                                  display: "inline-block",
                                  background: "#f9fafb",
                                  border: "1px solid #d1d5db",
                                  borderRadius: "6px",
                                  padding: "8px 16px",
                                  fontWeight: "600",
                                  color: "#374151",
                                  minWidth: "50px"
                                }}>
                                  {item.quantity}
                                </div>
                              </td>
                              <td className="text-end" style={{ padding: "20px", verticalAlign: "middle" }}>
                                <span style={{ fontWeight: "600", fontSize: "16px", color: "#1f2937" }}>
                                  Rs {item.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Order Actions */}
                    <div style={{ padding: "20px 25px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
                      <div className="d-flex justify-content-end gap-3 flex-wrap">
                        <button 
                          className="btn"
                          style={{ 
                            background: "linear-gradient(to right, #5f9ea0, #4a7c7e)",
                            color: "white",
                            fontWeight: "600",
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: "6px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            transition: "all 0.2s"
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
                          🔄 Reorder
                        </button>
                        <button 
                          className="btn"
                          style={{ 
                            background: "linear-gradient(to right, #8b7355, #a0826d)",
                            color: "white",
                            fontWeight: "600",
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: "6px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            transition: "all 0.2s"
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
                          📍 Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom Buttons */}
            <div className="d-flex justify-content-between mt-4 mb-5 gap-3 flex-wrap">
              <button 
                className="btn"
                style={{ 
                  padding: "12px 28px",
                  fontWeight: "500",
                  border: "2px solid #5f9ea0",
                  background: "white",
                  color: "#5f9ea0",
                  borderRadius: "6px",
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
                ← Return To Shop
              </button>
              <button 
                className="btn"
                style={{ 
                  padding: "12px 28px",
                  fontWeight: "500",
                  border: "2px solid #8b7355",
                  background: "white",
                  color: "#8b7355",
                  borderRadius: "6px",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#8b7355";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#8b7355";
                }}
              >
                View More Orders →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;