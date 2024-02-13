import React, { useState } from 'react';

const Login = () => {
  const [data, SetData] = useState({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const userLogin=async(e)=>{
      e.preventDefault();
      const {username, password } = data;
  }



  return (
    <div className="container pt-4 pb-5 d-flex">
      <img
        src="../../img/SideImage.png"
        style={{ hight: '500px', width: '600px', fontFamily: 'Poppins' }}
      />
      <div className="container m-5" style={{ width: '400px' }}>
        <h2
          style={{ fontWeight: 500, fontSize: '36px', fontFamily: 'Poppins' }}
        >
          Log in to Exclusive
        </h2>
        <h4
          style={{ fontWeight: 400, fontSize: '16px', fontFamily: 'Poppins' }}
        >
          Enter your details below
        </h4>

        <form method="POST" onSubmit={userLogin}>
          <div class="form-group pt-3">
            <input
              type="text"
              class="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Email or Phone Number"
              style={{
                border: 'none',
                borderBottom: '1px solid #000',
                outline: 'none',
                borderRadius: '0',
              }}
              onChange={(e) => SetData({ ...data, username: e.target.value })}
            />
          </div>

          <div class="form-group pt-3 pb-3">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Password"
              style={{
                border: 'none',
                borderBottom: '1px solid #000',
                outline: 'none',
                borderRadius: '0',
              }}
              onChange={(e) => SetData({ ...data, password: e.target.value })}
            />
          </div>

          <button
            style={{
              width: '143px',
              height: '56px',
              borderRadius: '4px',
              border: '0px',
              padding: '16px 48px 16px 48px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: '#DB4444', // Adjust background color as needed
              color: '#FAFAFA', // Adjust text color as needed
              cursor: 'pointer',
            }}
            className="mb-2 mt-2"
          >
            <span>Log In</span>
          </button>

          <button
            style={{
              width: '228px',
              height: '56px',
              borderRadius: '4px',
              border: '0px',
              padding: '16px 48px 16px 48px',
              alignItems: 'justify-content-end',
              justifyContent: ' float-right',
              gap: '10px',
              backgroundColor: '#ffffff', // Adjust background color as needed
              color: '#DB4444', // Adjust text color as needed
              cursor: 'pointer',
            }}
            className="mb-2 mt-2"
          >
            <span>Forget Password?</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
