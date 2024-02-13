import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  // validate the phone number and email
  const validateInput = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your phone number format

    if (emailRegex.test(value) || phoneRegex.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // google auth setting
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  const [data, SetData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValid, setIsValid] = useState(true);

  // registration post rq
  const userRegistration = async (e) => {
    e.preventDefault();

    const { name, username, password } = data;
    // console.log(username);

    console.log(isValid);
    if (isValid === true) {
      try {
        const response = await axios.post("/user/register", {
          name,
          username,
          password,
        });
        if (response.data.message === "ok") {
          setMessage("successfull registrtion");

          // navigation('/Login')
        } else if (response.data.err === 2) {
          setErrMsg("Password contain at least 8 characters");
        } else {
          setErrMsg("User name already have!");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setErrMsg("valid email or phone number");
    }
  };
  return (
    <div className="container pt-4 pb-5 d-flex">
      <img
        src="../../img/SideImage.png"
        style={{ hight: "500px", width: "600px", fontFamily: "Poppins" }}
      />
      <div className="container m-5" style={{ width: "400px" }}>
        {}
        {message ? (
          <p className="alert alert-success">{message}</p>
        ) : errMsg ? (
          <p className="alert alert-danger">{errMsg}</p>
        ) : null}

        <h2
          style={{ fontWeight: 500, fontSize: "36px", fontFamily: "Poppins" }}
        >
          Create an account
        </h2>
        <h4
          style={{ fontWeight: 400, fontSize: "16px", fontFamily: "Poppins" }}
        >
          Enter your details below
        </h4>

        <form method="POST" onSubmit={userRegistration}>
          <div class="form-group pt-4">
            <input
              type="text"
              class="form-control"
              id="inputName"
              placeholder="Name"
              required
              style={{
                border: "none",
                borderBottom: "1px solid #000",
                outline: "none",
                borderRadius: "0",
              }}
              onChange={(e) => SetData({ ...data, name: e.target.value })}
            />
          </div>
          <div class="form-group pt-3">
            <input
              type="text"
              class="form-control"
              id="inputEmail"
              required
              aria-describedby="emailHelp"
              placeholder="Email or Phone Number"
              style={{
                border: "none",
                borderBottom: "1px solid #000",
                outline: "none",
                borderRadius: "0",
              }}
              onChange={(e) => SetData({ ...data, username: e.target.value })}
            />
          </div>

          <div class="form-group pt-3 pb-3">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              required
              placeholder="Password"
              style={{
                border: "none",
                borderBottom: "1px solid #000",
                outline: "none",
                borderRadius: "0",
              }}
              onChange={(e) => SetData({ ...data, password: e.target.value })}
            />
          </div>

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
            onClick={() => validateInput(data.username)}
          >
            <span>Create Account</span>
          </button>
        </form>
        <button
          style={{
            width: "371px",
            height: "56px",
            borderRadius: "4px",
            border: "1px solid #000", // You can adjust the border color as needed
            padding: "16px 86px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            backgroundColor: "#fff", // Adjust background color as needed
            color: "#000", // Adjust text color as needed
            cursor: "pointer",
          }}
          onClick={googleAuth}
        >
          {/* Replace this with your Google icon IconGoogle */}
          <div style={{ width: "24px", height: "24px" }}>
            <img src="../../img/IconGoogle.png" />
          </div>
          <span
            style={{
              fontWeight: 400,
              fontSize: "16px",
              fontFamily: "Poppins",
            }}
          >
            Sign up with Google
          </span>
        </button>

        <p class="text-center text-muted mt-3 mb-0">
          Have already an account?{" "}
          <a href="/login" class="fw-bold text-body">
            <u>Login here</u>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
