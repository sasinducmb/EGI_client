import React, { useContext } from "react";
import StarRating from "./StarRating";
import ManualRating from "./ManualRating";
import { RiDeleteBinLine } from "react-icons/ri";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const WishlistCard = ({ name, price, pic, discount }) => {
  const { removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  
  const handleDelete = () => {
    removeFromWishlist(name);
  };


  const handelCart = () => {
    addToCart({ name, price, pic, discount });
  };

  return (
    <div className=" custom-box pt-2 pb-3 mx-3">
      <div className="card-inner">
        <div className="card-box-inner d-flex align-items-center justify-content-center">
          {discount}
        </div>
        <div className="card-heart">
          <div className="icon-heart d-flex justify-content-center align-items-center mb-1 ">
            <RiDeleteBinLine size={20} onClick={handleDelete} />
          </div>
        </div>
    
             <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${pic.split(pic.includes("\\") ? "\\" : "/").pop()}`}
                alt={pic}
                className="card-outer pic"/>
        <a href="#">
          <div className="row add-cart" onClick={handelCart}>
            <h5
              className="d-flex justify-content-center align-items-end"
              style={{ color: "white" }}
            >
              Add To Cart
            </h5>
          </div>
        </a>
      </div>
      <h6>{name}</h6>
      <div className="d-flex">
        <h6 style={{ color: "red" }}>${price}</h6>
        <h6 style={{ opacity: "50%" }} className="px-3">
          $160
        </h6>
      </div>
    </div>
  );
};

export default WishlistCard;
