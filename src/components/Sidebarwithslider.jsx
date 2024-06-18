import React from 'react';
import './sidebar.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebarwithslider = () => {

  const scrollUp = () => {
    window.scrollTo({
      top: 2200, // Scrolls to the middle of the page
      behavior: "smooth" // Adds smooth scrolling effect
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <div className="row">
            <div className="col-12">
              <div
                className="d-flex flex-row flex-wrap  flex-lg-column align-items-start justify-content-center"
                style={{ height: 'auto' }}
              >
           
           
                <button type="button"  class="btn" data-bs-toggle="button" onClick={scrollUp}>
                Grocery <MdOutlineKeyboardArrowRight size={25} />
                </button>
             
       
                <button type="button" class="btn" data-bs-toggle="button" onClick={scrollUp}>
                  HouseHold <MdOutlineKeyboardArrowRight size={25} />
                </button>
                <button type="button" class="btn" data-bs-toggle="button" onClick={scrollUp}>
                  Baby Needs <MdOutlineKeyboardArrowRight size={25} />
                </button>
                {/* <button type="button" class="btn" data-bs-toggle="button">
                  Home & Lifestyle
                </button>
                <button type="button" class="btn" data-bs-toggle="button">
                  Medicine
                </button>
                <button type="button" class="btn" data-bs-toggle="button">
                  Sports & Outdoor
                </button>
                <button type="button" class="btn" data-bs-toggle="button">
                  Baby’s & Toys
                </button>
                <button type="button" class="btn" data-bs-toggle="button">
                  Groceries & Pets
                </button>
                <button type="button" class="btn" data-bs-toggle="button">
                  Health & Beauty
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 mt-3">
          <div className="mx-2">
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
                    class="d-block img-fluid"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="../../img/Frame561.png"
                    class="d-block img-fluid"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="../../img/Frame560.png"
                    class="d-block img-fluid"
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
      </div>
    </>
  );
};

export default Sidebarwithslider;
