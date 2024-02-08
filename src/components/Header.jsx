import React from 'react';

function Header() {
  return (
    <div className="container-fluid header">
      <div className="container">
        <div className=" row header-outer ">
          <div className="col-lg-10   d-flex justify-content-center  align-items-center header">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
            <span>
              <a
                href=""
                className="p-3"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                {' '}
                Shop Now
              </a>
            </span>
          </div>
          <div className="col-lg-2 d-flex justify-content-end">
            <select
              style={{ background: 'none', border: 'none', color: 'white' }}
            >
              <option selected style={{ color: 'black' }}>
                English
              </option>
              <option style={{ color: 'black' }}>English</option>
              <option style={{ color: 'black' }}>English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
