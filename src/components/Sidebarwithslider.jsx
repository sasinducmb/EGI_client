import React from 'react';
import './sidebar.css';

const Sidebarwithslider = () => {
  return (
    <>
      <div className="d-flex">
        <div>
          <div
            className="flex-shrink-0 p-3 bg-white"
            style={{ width: '280px' }}
          >
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

        <div>
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="../../img/Frame560.png"
                  class="d-block"
                  style={{ width: '892px', height: '344px' }}
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../img/Frame560.png"
                  class="d-block "
                  style={{ width: '892px', height: '344px' }}
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../img/Frame560.png"
                  class="d-block"
                  style={{ width: '892px', height: '344px' }}
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebarwithslider;
