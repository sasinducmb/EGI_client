import axios from "axios";
import React from "react";
import { MdOutlineLogout } from "react-icons/md";

const logout = async () => {
  try {
    const logOut = await axios.get("/user/logout");
    if (logOut.data) {
      // console.log(logOut.data.message);
      window.location.href = process.env.REACT_APP_MAIN_URL;
    }
  } catch (err) {
    console.log(err.message);
  }
};

function Header() {
  return (
    <div className="container-fluid header">
      <div className="container">
        <div className=" row header-outer ">
          <div className="col-lg-10 col-md-12  d-flex justify-content-center  align-items-center header">
         
            <p className="mt-3 header-text">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
              
     
            <span>
              <a
                href=""
                className="p-3"
                style={{ color: "white", fontWeight: "bold" }}
              >
                {" "}
                Shop Now
              </a>
            </span>
          </div>
          <div className="col-lg-2  d-flex justify-content-end align-items-center">
            <select
              style={{ background: "none", border: "none", color: "white" }}
            >
              <option selected style={{ color: "black" }}>
                English
              </option>
            </select>
            <MdOutlineLogout
              style={{ color: "white",cursor:'pointer'}}
              size={25}
              className="mx-3"
              onClick={logout}
            
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
