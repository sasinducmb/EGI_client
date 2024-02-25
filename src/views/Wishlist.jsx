import React, { useContext, useEffect, useRef, useState } from "react";
import WishlistCard from "../components/WishlistCard";
import Product_cards from "../components/Product_cards";
import Cards from "../components/Cards";
import axios from "axios";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const [categories, setCategories] = useState([]);
  const carousel = useRef(null);
  const { wishlist } = useContext(WishlistContext);
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

  return (
    <div className="container">
      <div className="row pt-4 ">
        <div className="d-flex justify-content-between">
          <div className="col-lg-5">
            <h4>Wishlist (4)</h4>
          </div>
          <div
            className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
            style={{ cursor: "pointer" }}
          >
            <h6>Move All To Bag</h6>
          </div>
        </div>
      </div>
      <div className="row ">
        {wishlist.map((item, index) => (
          <div className="col-lg-3">

          <div key={index}>
            {/* Display the wishlist item */}
            <h6>{item.name}</h6>
            <WishlistCard 
            key={index}
            name={item.name}
            price={item.price}
            pic={item.pic}
            discount={"50"}
            />
          </div>

            {/* other item details */}
          </div>
        ))}
      </div>

      <hr />
      <div className="pb-4">
        <div className="row pt-4 ">
          <div className="d-flex justify-content-between">
            <div className="col-lg-5">
              <div className="row d-flex align-items-center red-box ">
                <div>
                  <h5 className="pt-1 px-4">Just&nbsp;For&nbsp;You</h5>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
              style={{ cursor: "pointer" }}
            >
              <h6>See All</h6>
            </div>
          </div>
        </div>
        <div className="row">
          {categories.slice(0, 4).map((category, index) => (
            <div className="col-lg-3">
              <div className="item" style={{ height: "400px" }}>
                <Cards
                  key={index}
                  name={category.productName}
                  price={category.price}
                  pic={category.mainImage}

                  // other props
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
