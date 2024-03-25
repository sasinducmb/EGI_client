import React from "react";
import { Link } from "react-router-dom";

function PayementSuccess() {
  return (
    <div className="container pt-4 pb-5 ">
      <div className="row">
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <img
            src="../../img/SideImage.png"
            style={{ hight: "400px", width: "600px", fontFamily: "Poppins" }}
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <div className="container m-5" style={{ width: "400px" }}>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "36px",
                fontFamily: "Poppins",
              }}
            >
              Payment Success
            </h2>
            <form method="POST">
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "371px",
                    height: "56px",
                    borderRadius: "4px",
                    border: "0px",
                    padding: "16px 86px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    backgroundColor: "#DB4444", // Adjust background color as needed
                    color: "#FAFAFA", // Adjust text color as needed
                    cursor: "pointer",
                  }}
                  className="mb-2 mt-2"
                >
                  Home Page
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayementSuccess;
