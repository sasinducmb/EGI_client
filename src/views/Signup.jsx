import React, { useState } from "react";
import axios from "axios";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

const Signup = () => {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword,setConfirmPassword]=useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
const [isValidPhone, setIsValidPhone] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility=()=>{
    setConfirmPassword(!showconfirmPassword)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  
  const validatePhone = (phoneNo) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your phone number format
    if (phoneRegex.test(phoneNo)) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
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
    phoneNo:"",
    password: "",
  });

  // registration post rq
  const userRegistration = async (e) => {
    e.preventDefault();

    const { name, username, phoneNo,password } = data;
    // console.log(username);
    if (data.password !== confirmPass) {
      // Handle the mismatch case
      setErrMsg("Password Not Match");
      return;
    }

    if (isValidEmail && isValidPhone) {
      try {
        const response = await axios.post("/user/register", {
          name,
          username,
          phoneNo,
          password,
        });
        if (response.data.message === "ok") {
          setMessage("Registrtion success...!");
          SetData({
            name: "",
            username: "",
            phoneNo: "",
            password: "",
          });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const message = error.response.data.message;
          if (message === "2") {
            setErrMsg("Password must contain at least 8 characters");
          } else if (message === "3") {
            setErrMsg("Username already exists");
          }
        } else {
          // Handle the case where error.response is undefined
          setErrMsg("An unexpected error occurred");
        }
      }
    } else {
      setErrMsg("Valid email or phone number required");
    }
  };
  return (
    <div className="container pt-4 pb-5 ">
      <div className="row">
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <img
            src="../../img/SideImage.png"
            style={{ hight: "500px", width: "600px", fontFamily: "Poppins" }}
          className="img-fluid"/>
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <div className="container m-5" style={{ width: "400px" }}>
            {}
            {message ? (
              <p className="alert alert-success">{message}</p>
            ) : errMsg ? (
              <p className="alert alert-danger">{errMsg}</p>
            ) : null}

            <h2
              style={{
                fontWeight: 500,
                fontSize: "36px",
                fontFamily: "Poppins",
              }}
            >
              Create an account
            </h2>
            <h4
              style={{
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: "Poppins",
              }}
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
                  placeholder="Email"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                  }}
                  onChange={(e) => {
                    SetData({ ...data, username: e.target.value });
                    validateEmail(e.target.value);
                  }}
                />
              </div>
                 <div class="form-group pt-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputphonr"
                  required
                 
                  aria-describedby="emailHelp"
                  placeholder="Phone Number"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                  }}
                  onChange={(e) => {
                    SetData({ ...data, phoneNo: e.target.value });
                    validatePhone(e.target.value);
                  }} 
                />
              </div>

            
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mt-3"
                  id="inputPassword"
                  placeholder="Password"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                    paddingRight: "30px", // Make room for the icon
                  }}
                  onChange={(e) =>
                    SetData({ ...data, password: e.target.value })
                  }
                />
                {showPassword ? (
                  <FaRegEye
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust as needed
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust as needed
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>
              <div
                className="form-group pt-3 pb-3"
                style={{ position: "relative" }}
              >
                <input
                 type={showconfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="inputPassword"
                  placeholder="Confirm password"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                    paddingRight: "30px", // Make room for the icon
                  }}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
               {showconfirmPassword ? (
                  <FaRegEye
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust as needed
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust as needed
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                )}
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
                
              >
                <span>Create Account</span>
              </button>
            </form>
            {/* <button
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
              onClick={googleAuth} */}
            {/* > */}
              {/* Replace this with your Google icon IconGoogle */}
              {/* <div style={{ width: "24px", height: "24px" }}>
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
            </button> */}

            <p class="text-center text-muted mt-3 mb-0">
              Have already an account?{" "}
              <a href="/login" class="fw-bold text-body">
                <u>Login here</u>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
