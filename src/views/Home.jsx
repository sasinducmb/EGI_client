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

const Home = () => {
  const [categories, setCategories] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/products/getAllDetails");
        const activeProduct = response.data.filter(
          (product) => product.isActive === true && product.sellType === "flash"
        );
        setCategories(activeProduct);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProduct();
  }, []);

  console.log(categories);

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
            <div className="col-lg-5  d-flex align-items-center">
              <CountdownTimer targetDate="2024-12-31" />
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-end">
              <div className=" d-flex ">
                <div className="arrow-keys">
                  <FiArrowLeft size={40} onClick={() => carousel.current.prev()}/>
                </div>
                <div className="arrow-keys d-flex">
                  <FiArrowRight size={40} onClick={() => carousel.current.next()}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex cc">
          <OwlCarousel className="owl-theme" ref={carousel} loop items={4} >
             
          {categories.map((category, index) => (
            <div class="item" style={{height:'400px'}}>
            <Cards
              key={index}
              name={category.productName}
              // percentage={category.percentage}
              price={category.price}
              pic={category.mainImage}
              // originalPrice={category.originalPrice}
              // ... other props you need to pass
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
          <Product_cards />
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
          <Explore_cards />
        </div>
      </div>
    </div>
  );
};

export default Home;
