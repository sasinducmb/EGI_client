import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../auth/userContext";

const Orders = () => {
  const { user, isLoading, error } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`order/user/${user._id}/orders`) // Adjust the URL according to your backend routes
        .then(({ data }) => {
          setOrders(data); // Assuming you have a state variable 'setOrders' to store the fetched orders
        })
        .catch((error) => {
          console.error("Error fetching orders", error);
          // Handle error (e.g., set an error state, display a message, etc.)
        });
    }
  }, [user]);
  // console.log(orders);
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>Home /</h6>
            <h6 className="ms-2 "> Cart</h6>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        {orders.map((order) => (
          <div key={order._id} className="mb-5 p-3 border rounded">
            <h3 className="mb-3">
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </h3>
            <p className="font-weight-bold">Total: ${order.total}</p>
            <div className="row">
              {order.items.map((item) => (
                <div key={item._id} className="col-12 col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        Product Name:{" "}
                        {item.product ? item.product.productName : "N/A"}
                      </h5>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <p className="card-text">Subtotal: ${item.subtotal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
