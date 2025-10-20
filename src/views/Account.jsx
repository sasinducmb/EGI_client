import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight, MdPerson, MdEmail, MdPhone, MdShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../auth/userContext";

const Account = () => {
  const { user, isLoading: userLoading, error: userError } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      setOrdersLoading(true);
      axios
        .get(`/order/user/${user._id}/orders`) // Fixed endpoint
        .then(({ data }) => {
          setOrders(data);
          setOrdersError(null);
        })
        .catch((error) => {
          console.error("Error fetching orders", error);
          setOrdersError("Failed to load orders. Please try again later.");
        })
        .finally(() => {
          setOrdersLoading(false);
        });
    } else {
      setOrdersLoading(false);
    }
  }, [user]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      1: { label: "Paid", class: "bg-danger" },
      2: { label: "In Progress", class: "bg-warning text-dark" },
      3: { label: "Complete", class: "bg-success" },
    };
    const config = statusConfig[status] || { label: "Unknown", class: "bg-secondary" };
    return (
      <span className={`badge ${config.class} px-3 py-2`}>
        {config.label}
      </span>
    );
  };

  // Redirect if not logged in
  if (!userLoading && !user) {
    navigate("/login");
    return null;
  }

  // Loading state
  if (userLoading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <div className="row mb-4">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-3">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-muted">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">My Account</li>
            </ol>
          </nav>
          <div className="text-center">
            <h3 className="mb-0">Welcome, <strong className="text-dark">{user?.name || 'User'}</strong>!</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-lg-3 col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 ${
                    activeTab === "profile" ? "bg-secondary text-white" : ""
                  }`}
                >
                  <span><MdPerson className="me-2" />My Profile</span>
                  <MdOutlineKeyboardArrowRight size={20} />
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 ${
                    activeTab === "orders" ? "bg-secondary text-white" : ""
                  }`}
                >
                  <span><MdShoppingBag className="me-2" />My Orders</span>
                  <MdOutlineKeyboardArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9 col-md-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <h4 className="mb-0">Profile Information</h4>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-primary bg-opacity-10 rounded p-3 me-3">
                        <MdPerson size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-muted mb-1 small">Full Name</p>
                        <h6 className="mb-0">{user?.name || "N/A"}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-success bg-opacity-10 rounded p-3 me-3">
                        <MdEmail size={24} className="text-success" />
                      </div>
                      <div>
                        <p className="text-muted mb-1 small">Email / Username</p>
                        <h6 className="mb-0">{user?.username || "N/A"}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-info bg-opacity-10 rounded p-3 me-3">
                        <MdPhone size={24} className="text-info" />
                      </div>
                      <div>
                        <p className="text-muted mb-1 small">Phone Number</p>
                        <h6 className="mb-0">{user?.phoneNo || "Not provided"}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="bg-warning bg-opacity-10 rounded p-3 me-3">
                        <MdShoppingBag size={24} className="text-warning" />
                      </div>
                      <div>
                        <p className="text-muted mb-1 small">Total Orders</p>
                        <h6 className="mb-0">{orders.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Order History</h4>
                <span className="badge bg-secondary">{orders.length} Orders</span>
              </div>
              <div className="card-body p-4">
                {ordersLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-secondary" role="status">
                      <span className="visually-hidden">Loading orders...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading your orders...</p>
                  </div>
                ) : ordersError ? (
                  <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {ordersError}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-5">
                    <MdShoppingBag size={64} className="text-muted mb-3" />
                    <h5 className="text-muted">No orders yet</h5>
                    <p className="text-muted mb-4">Start shopping to see your orders here!</p>
                    <Link to="/" className="btn btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order, index) => (
                      <div
                        key={order._id}
                        className={`order-item border rounded p-4 ${
                          index !== orders.length - 1 ? "mb-4" : ""
                        }`}
                      >
                        {/* Order Header */}
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
                          <div>
                            <h5 className="mb-1">
                              Order #{order._id.slice(-8).toUpperCase()}
                            </h5>
                            <p className="text-muted mb-0 small">
                              {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-end mt-2 mt-md-0">
                            {getStatusBadge(order.status)}
                            <p className="text-muted mb-0 mt-2 small">
                              Total: <strong className="text-dark fs-5">Rs {order.total.toLocaleString()}</strong>
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="row g-3">
                          {order.items.map((item) => (
                            <div key={item._id} className="col-12">
                              <div className="card border">
                                <div className="card-body p-3">
                                  <div className="row align-items-center">
                                    <div className="col-md-6">
                                      <h6 className="mb-1">
                                        {item.product?.productName || "Product N/A"}
                                      </h6>
                                      <p className="text-muted small mb-0">
                                        Quantity: {item.quantity}
                                      </p>
                                    </div>
                                    <div className="col-md-6 text-md-end mt-2 mt-md-0">
                                      <p className="mb-0 fw-bold">
                                        Rs {item.subtotal.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;