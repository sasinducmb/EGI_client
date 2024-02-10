import React from 'react';

const Account = () => {
  return (
    <div className="d-flex">
      <div>
        <div className="flex-shrink-0 p-3 bg-white" style={{ width: '280px' }}>
          <a
            href="/"
            class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
          >
            <svg class="bi me-2" width="30" height="24">
              {/* <use xlink:href="#bootstrap" /> */}
            </svg>
            <span class="fs-5 fw-semibold">Collapsible</span>
          </a>
          <ul class="list-unstyled ps-0">
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                aria-expanded="true"
              >
                Home
              </button>
              <div class="collapse show" id="home-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" class="link-dark rounded">
                      Overview
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Updates
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Reports
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="false"
              >
                Dashboard
              </button>
              <div class="collapse" id="dashboard-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" class="link-dark rounded">
                      Overview
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Weekly
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Monthly
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Annually
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#orders-collapse"
                aria-expanded="false"
              >
                Orders
              </button>
              <div class="collapse" id="orders-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" class="link-dark rounded">
                      New
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Processed
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Shipped
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Returned
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="border-top my-3"></li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#account-collapse"
                aria-expanded="false"
              >
                Account
              </button>
              <div class="collapse" id="account-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" class="link-dark rounded">
                      New...
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark rounded">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">First Name</label>
            <input
              type="first"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Last Name</label>
            <input
              type="last"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Account;
