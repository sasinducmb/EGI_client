import React from 'react'

const Orders = () => {
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: '50%' }}>Home /</h6>
            <h6 className="ms-2 "> Cart</h6>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="cart-row">
          <h5>Order No</h5>
          <h5>Items</h5>
          <h5>Placed date</h5>
          <h5>Status Info</h5>
        </div>

        <div className="cart-row">
          <h5>1234</h5>
          <h5>Chair</h5>
          <h5>03/2024</h5>
          <h5>Pending</h5>
        </div>
      </div>
    </div>
  );
}

export default Orders