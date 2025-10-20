import React, { useContext, useEffect, useState } from "react";
import WishlistCard from "../components/WishlistCard";
import Cards from "../components/Cards";
import axios from "axios";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const [categories, setCategories] = useState([]);
  const { wishlist, totalItemWishList } = useContext(WishlistContext);

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
      {/* Wishlist Header */}
      <div className="row pt-4">
        <div className="d-flex justify-content-between">
          <div className="col-lg-5">
            <h4>Wishlist ({totalItemWishList})</h4>
          </div>
          <div
            className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
            style={{ cursor: "pointer" }}
          >
            <h6>Move All To Bag</h6>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="row">
        {wishlist.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h5>Your wishlist is empty</h5>
            <p>Add items you love to your wishlist</p>
          </div>
        ) : (
          wishlist.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={item._id || index}>
              <div>
                <WishlistCard
                  id={item._id}              // ✅ Added id prop
                  name={item.name}
                  price={item.price}
                  pic={item.pic}
                  discount={item.discount || 0}  // ✅ Use actual discount
                  ct={item.ct}               // ✅ Added stock count
                  weight={item.weight}       // ✅ Added weight
                  description={item.description} // ✅ Added description
                />
              </div>
            </div>
          ))
        )}
      </div>

      <hr />

      {/* Just For You Section */}
      <div className="pb-4">
        <div className="row pt-4">
          <div className="d-flex justify-content-between">
            <div className="col-lg-5">
              <div className="row d-flex align-items-center red-box">
                <div>
                  <h5
                    className="pt-1 px-4"
                    style={{ fontSize: "25px", fontWeight: "800" }}
                  >
                    Just&nbsp;For&nbsp;You
                  </h5>
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

        {/* Recommended Products */}
        <div className="row">
          {categories.slice(0, 4).map((category, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="item" style={{ height: "400px" }}>
                <Cards
                  id={category._id}
                  name={category.productName}
                  price={category.price}
                  pic={category.mainImage}
                  subpic={category.additionalImages}
                  ct={category.item_count}
                  weight={category.weight}
                  description={category.description}
                  discount={category.discount}
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