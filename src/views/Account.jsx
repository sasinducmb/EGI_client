import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Orders from './Orders';
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: '50%' }}>Home /</h6>
            <h6 className="ms-2 "> My Account </h6>
          </div>
          <div className="justify-content-end ">
            <h6>Welcome!</h6>
          </div>
        </div>
      </div>
      <div className="container d-flex pt-4">
        <div className="col-lg-3">
          <div className="row">
            <div className="col-12">
              <div
                className="d-flex flex-row flex-wrap  flex-lg-column align-items-start justify-content-center"
                style={{ height: 'auto' }}
              >
                <button type="button" class="btn" data-bs-toggle="button">
                  Manage My Account <MdOutlineKeyboardArrowRight size={25} />
                </button>
                <div className="mx-4">
                  <button type="button" class="btn" data-bs-toggle="button">
                    My Profile
                  </button>
                  <button type="button" class="btn" data-bs-toggle="button">
                    Address Book
                  </button>
                  <button type="button" class="btn" data-bs-toggle="button">
                    My Payment Options
                  </button>
                </div>
                <Link to="/orders">
                  {' '}
                  <button type="button" class="btn" data-bs-toggle="button">
                    My Orders <MdOutlineKeyboardArrowRight size={25} />
                  </button>
                </Link>
                <div className="mx-4">
                  <button type="button" class="btn" data-bs-toggle="button">
                    Sports & Outdoor
                  </button>
                  <button type="button" class="btn" data-bs-toggle="button">
                    Baby’s & Toys
                  </button>
                </div>
                <button type="button" class="btn" data-bs-toggle="button">
                  My WishList
                </button>
              </div>
            </div>
          </div>
        </div>

        <form class="custom-form row mx-4 pt-4">
          <h4
            style={{
              fontFamily: 'Poppins',

              fontSize: '20px',
              color: '#DB4444',
            }}
          >
            Edit Your Profile
          </h4>
          <div class="form-row">
            <div class="row d-flex">
              <div class="form-group col-md-6  col-sm-12">
                <label for="inputFirst">First Name</label>
                <input
                  type="first"
                  class="form-control"
                  id="inputFirst"
                  placeholder="Md"
                />
              </div>

              <div class="form-group col-md-6  col-sm-12">
                <label for="inputLast">Last Name</label>
                <input
                  type="last"
                  class="form-control"
                  id="inputLast"
                  placeholder="Rimel"
                />
              </div>
            </div>

            <div class=" row d-flex">
              <div class="form-group col-md-6 col-sm-12">
                <label for="inputPassword4">Email</label>
                <input
                  type="Email"
                  class="form-control"
                  id="inputEmail"
                  placeholder="rimel1111@gmail.com"
                />
              </div>

              <div class="form-group col-md-6  col-sm-12">
                <label for="inputAddress">Address</label>
                <input
                  type="address"
                  class="form-control"
                  id="inputAddress"
                  placeholder="Kingston, 5236, United State"
                />
              </div>
            </div>
          </div>

          <div className="col-md-12 ">
            <div class="form-group">
              <label for="inputAddress2">Password Changes</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Current Passwod"
              />
            </div>
            <div class="form-group pt-2">
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="New Passwod"
              />
            </div>
            <div class="form-group pt-2">
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Confirm New Passwod"
              />
            </div>
          </div>

          <div className=" d-flex justify-content-end">
            <button
              type="cancle"
              style={{
                border: '0',
                backgroundColor: '#ffffff',
                width: '140px',
                height: '56px',
              }}
            >
              <span>Cancle</span>
            </button>

            <button type="submit" class="custom-style ">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
