import React from 'react';

const Signup = () => {
  return (
    <div className="container pt-4 pb-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src="../../img/SideImage.png"
            className="img-fluid"
            alt="Descriptive Alt Text"
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </div>
        <div className="col-12 col-md-6">
          <div className="m-3">
            <h2
              style={{
                fontWeight: 500,
                fontSize: '36px',
                fontFamily: 'Poppins',
              }}
            >
              Create an account
            </h2>
            <h4
              style={{
                fontWeight: 400,
                fontSize: '16px',
                fontFamily: 'Poppins',
              }}
            >
              Enter your details below
            </h4>
            <form>
              <div class="form-group pt-4">
                <input
                  type="name"
                  class="form-control"
                  id="inputName"
                  placeholder="Name"
                  style={{
                    border: 'none',
                    borderBottom: '1px solid #000',
                    outline: 'none',
                    borderRadius: '0',
                  }}
                />
              </div>
              <div class="form-group pt-3">
                <input
                  type="email"
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
                />
              </div>

              <button
                style={{
                  width: '371px',
                  height: '56px',
                  borderRadius: '4px',
                  border: '0px',
                  padding: '16px 86px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#DB4444', // Adjust background color as needed
                  color: '#FAFAFA', // Adjust text color as needed
                  cursor: 'pointer',
                }}
                className="mb-2 mt-2"
              >
                <span>Create Account</span>
              </button>

              <button
                style={{
                  width: '371px',
                  height: '56px',
                  borderRadius: '4px',
                  border: '1px solid #000', // You can adjust the border color as needed
                  padding: '16px 86px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#fff', // Adjust background color as needed
                  color: '#000', // Adjust text color as needed
                  cursor: 'pointer',
                }}
              >
                {/* Replace this with your Google icon IconGoogle */}
                <div style={{ width: '24px', height: '24px' }}>
                  <img src="../../img/IconGoogle.png" />
                </div>
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                  }}
                >
                  Sign up with Google
                </span>
              </button>

              <p class="text-center text-muted mt-3 mb-0">
                Have already an account?{' '}
                <a href="/login" class="fw-bold text-body">
                  <u>Login here</u>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
