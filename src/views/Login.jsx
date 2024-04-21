import React, { useState } from "react";
import axios from "axios";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const [data, SetData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [errMsg, setErrMsg] = useState("");
  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, password } = data;
    try {
      const response = await axios.post("/user/login", {
        username,
        password,
      });
      const newUser = response.data.newUser;
      const userRole = newUser.role;
      if (userRole === "admin") {
        window.location.href = process.env.REACT_APP_DASH_URL;
      } else {
        // console.log("user")
        console.log("Redirecting to:", process.env.REACT_APP_MAIN_URL);
        window.location.href = process.env.REACT_APP_MAIN_URL;
      }
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
        <TailSpin
          height="80"
          width="80"
          color="grey"
          ariaLabel="loading-indicator"
        />
          </div>
      ) : (
        <div className="container pt-4 pb-5">
          <div className="row">
            <div className="col-lg-6 col-md-12 ">
              <img
                src="../../img/SideImage.png"
                className="img-fluid"
                alt="Descriptive Alt Text"
              />
            </div>
            <div className="col-lg-6 col-md-12 d-flex align-items-center ">
              <div className="m-3">
                <h2
                  style={{
                    fontWeight: 500,
                    fontSize: "36px",
                    fontFamily: "Poppins",
                  }}
                >
                  Log in to Exclusive
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
                {errMsg ? <p className="alert alert-danger">{errMsg}</p> : null}
                <form method="POST" onSubmit={userLogin}>
                  <div class="form-group pt-3">
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      style={{
                        border: "none",
                        borderBottom: "1px solid #000",
                        outline: "none",
                        borderRadius: "0",
                      }}
                      onChange={(e) =>
                        SetData({ ...data, username: e.target.value })
                      }
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

                  <button
                    style={{
                      width: "143px",
                      height: "56px",
                      borderRadius: "4px",
                      border: "0px",
                      padding: "16px 48px 16px 48px",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      backgroundColor: "#DB4444", // Adjust background color as needed
                      color: "#FAFAFA", // Adjust text color as needed
                      cursor: "pointer",
                    }}
                    className="mb-2 mt-2"
                  >
                    <span>Log In</span>
                  </button>

                  <button
                    style={{
                      width: "228px",
                      height: "56px",
                      borderRadius: "4px",
                      border: "0px",
                      padding: "16px 48px 16px 48px",
                      alignItems: "justify-content-end",
                      justifyContent: " float-right",
                      gap: "10px",
                      backgroundColor: "#ffffff", // Adjust background color as needed
                      color: "#DB4444", // Adjust text color as needed
                      cursor: "pointer",
                    }}
                    className="mb-2 mt-2"
                  >
                    <span>Forget Password?</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
