import React, { useEffect, useRef, useState } from "react";
import Sidebarwithslider from "../components/Sidebarwithslider";
import CountdownTimer from "../components/Countdowntimer";
import Cards from "../components/Cards";

import Category from "../components/Category";
import Product_cards from "../components/Product_cards";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import Explore_cards from "../components/Explore_cards";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { SiAdguard } from "react-icons/si";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/products/getAllDetails");
        const activeProduct = response.data.filter(
          (product) => product.isActive === true
        );
        setCategories(activeProduct);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProduct();
  }, []);

console.log(categories)

  return (
    <div class="container-fluid">
      <div className="container">
        <Sidebarwithslider />
        <div>
          <div className="d-flex align-items-center red-box ">
            <div>
              <h6 className="pt-1 px-4"> Today's</h6>
            </div>
          </div>
        </div>

        <div className="row pt-4">
          <div className=" d-flex">
            <div className="col-lg-3">
              <h4 className="text-style">Flash Sales</h4>
            </div>
            <div className="col-lg-5 px-4 d-flex align-items-center">
              <CountdownTimer targetDate="2024-12-31" />
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-end">
              <div className=" d-flex ">
                <div className="arrow-keys">
                  <FiArrowLeft
                    size={40}
                    onClick={() => carousel.current.prev()}
                  />
                </div>
                <div className="arrow-keys d-flex">
                  <FiArrowRight
                    size={40}
                    onClick={() => carousel.current.next()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <OwlCarousel className="owl-theme" ref={carousel} loop items={4}>
            {categories
              .filter((category) => category.sellType === "flash")
              .map((category, index) => (
                <div className="item" style={{ height: "400px" }}>
                  <Cards
                    id={category._id}
                    key={index}
                    name={category.productName}
                    price={category.price}
                    pic={category.mainImage}
                    discount={"50"}
                    subpic={category.additionalImages}
                    // other props
                  />
                </div>
              ))}
          </OwlCarousel>
        </div>

        <div className="row justify-content-center mt-3">
          <button className="btn-product mt-3">View All Products</button>
        </div>
        <hr />
        <div className="d-flex align-items-center red-box ">
          <div>
            <h6 className="pt-1 px-4"> Categories</h6>
          </div>
        </div>

        <div className="row pt-4">
          <div className=" d-flex justify-content-between">
            <div className="col-lg-5">
              <h4 className="text-style">Browse By Category</h4>
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-end">
              <div className=" d-flex ">
                <div className="arrow-keys">
                  <FiArrowLeft size={40} />
                </div>
                <div className="arrow-keys d-flex">
                  <FiArrowRight size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-4">
          <Category />
        </div>
        <hr />
        <div>
          <div className="d-flex align-items-center red-box ">
            <div>
              <h6 className="pt-1 px-4">This&nbsp;Month</h6>
            </div>
          </div>
          <div className="row pt-4 ">
            <div className="d-flex justify-content-between">
              <div className="col-lg-5">
                <h4 className="text-style">Best Selling Products</h4>
              </div>
              <div
                className="col-lg-4 d-flex justify-content-center product-style align-items-center"
                style={{ cursor: "pointer" }}
              >
                <h6>View All</h6>
              </div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" loop items={4}>
            {categories
              .filter((category) => category.sellType === "best")
              .map((category, index) => (
                <div className="item" style={{ height: "400px" }}>
                  <Cards
                    id={category._id}
                    key={index}
                    name={category.productName}
                    price={category.price}
                    pic={category.mainImage}
                    subpic={category.additionalImages}


                    // other props
                  />
                </div>
              ))}
          </OwlCarousel>
        </div>
        <div className="pt-5">
          <div className="container row black-box pt-5 ">
            <div className="px-5 col-lg-5   ">
              <h6 style={{ color: "#00FF66" }} className="pt-5">
                Categories
              </h6>
              <h2 className="text-color">
                Enhance Your
                <br /> Music Experience
              </h2>
              <div
                className="timecount-align"
                style={{
                  color: "#ffffff",
                }}
              >
                <CountdownTimer targetDate="2024-2-29" />
              </div>
              <div
                className="d-flex align-items-end "
                style={{ height: "200px" }}
              >
                <div
                  className="buy-now  d-flex justify-content-center align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <h6>Buy Now!</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-7 d-flex justify-content-center align-items-center">
              <img src="../../img/jbl.png" />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="d-flex align-items-center red-box ">
            <div>
              <h6 className="pt-1 px-4">Our&nbsp;Products</h6>
            </div>
          </div>
          <div className="row pt-4 ">
            <div className="d-flex justify-content-between">
              <div className="col-lg-5">
                <h4 className="text-style">Explore Our Products</h4>
              </div>
              <div className="col-lg-4 d-flex align-items-center justify-content-end">
                {/* <div className=" d-flex ">
                  <div className="arrow-keys">
                    <FiArrowLeft size={40} />
                  </div>
                  <div className="arrow-keys d-flex">
                    <FiArrowRight size={40} />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            {categories.map((category, index) => (
              <div className="col-lg-3">
                <div className="item" style={{ height: "400px" }}>
                  <Cards
                    id={category._id}
                    key={index}
                    name={category.productName}
                    price={category.price}
                    pic={category.mainImage}
                    subpic={category.additionalImages}

                    // other props
                  />
                </div>
              </div>
            ))}
            <div className="row justify-content-center">
              <button className="btn-product">View All Products</button>
            </div>
          </div>
          <div className="pt-5">
            <div className="d-flex align-items-center red-box ">
              <div>
                <h6 className="pt-1 px-4">Featured</h6>
              </div>
            </div>
            <div className="col-lg-6 pt-3">
              <h4 className="text-style">New Arrival</h4>
            </div>
            <div className="row box-play">
              <div className="col-lg-6 d-flex justify-content-center align-items-end box-play-0">
                <img src="../../img/play.png" />
                <div className="image-text-0">
                  <h3>PlayStation 5</h3>
                  <h6 className="pt-2 pb-2">
                    Black and White version of the PS5 <br /> coming out on
                    sale.
                  </h6>
                  <a href="#" className="a">
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row col-lg-11 mx-auto  d-flex justify-content-end align-items-end box-play-1 m-2">
                  <img
                    src="../../img/img2.png"
                    style={{ width: "430px", height: "278px" }}
                  />
                  <div className="image-text-0">
                    <h3>Women’s Collections</h3>
                    <h6>
                      Featured woman collections that <br /> give you another
                      vibe.
                    </h6>
                    <a href="#" className="a">
                      Shop Now
                    </a>
                  </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-lg-5 box-play-2 d-flex justify-content-center align-items-center m-1">
                    <img src="../../img/img3.png" />
                    <div className="image-text">
                      <h3>Speakers</h3>
                      <h6>Amazon wireless speakers</h6>
                      <a href="#" className="a">
                        Shop Now
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-5 box-play-2 d-flex justify-content-center align-items-center m-1">
                    <img src="../../img/img4.png" />
                    <div className="image-text">
                      <h3>Perfume</h3>
                      <h6>GUCCI INTENSE OUD EDP</h6>
                      <a href="#" className="a">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-5 justify-content-center">
        <div
          className="col-lg-4 mx-5  about-footer d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <CiDeliveryTruck size={80} />
          <p className="pt-2" style={{ fontSize: "20px", fontWeight: "bold" }}>
            FREE AND FAST DELIVERY
          </p>
          <p style={{ fontSize: "12px" }}>
            Free delivery for all orders over $140
          </p>
        </div>
        <div
          className="col-lg-4 mx-5 about-footer d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <TfiHeadphoneAlt size={80} />
          <p className="pt-2" style={{ fontSize: "20px", fontWeight: "bold" }}>
            24/7 CUSTOMER SERVICE
          </p>
          <p style={{ fontSize: "12px" }}>Friendly 24/7 customer support</p>
        </div>
        <div
          className="col-lg-4  mx-5 about-footer d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <SiAdguard size={80} />
          <p className="pt-2" style={{ fontSize: "20px", fontWeight: "bold" }}>
            MONEY BACK GUARANTEE
          </p>
          <p style={{ fontSize: "12px" }}>We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
