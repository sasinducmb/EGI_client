import React, { useContext } from "react";
import ManualRating from "./ManualRating";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cards = ({ id, name, ct, price, pic, discount, subpic, weight,description }) => {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { cart } = useContext(CartContext);

  // const { wishlist } = useContext(WishlistContext);

  const handleWishlistClick = () => {
    addToWishlist({ id, name, ct, price, pic, discount, subpic,weight,description });
  };

  const handelCart = () => {
    addToCart({ id, name, ct, price, pic, discount, subpic,weight,description });
  };

  const getPath = (pic) => {
    const separator = pic.includes("\\") ? "\\" : "/";
    return `${process.env.REACT_APP_API_URL}/uploads/${pic.split(separator).pop()}`;
};
const imagePath = getPath(pic);
  console.log(cart);
  return (
    <div className=" custom-box pt-4 pb-3 mx-3">
      {/* <div className="card-box-inner  "> -40%</div> */}
      <div className="card-inner">
        {discount && <div className="card-box-inner">{discount}%</div>}
        <div className="card-heart">
          <div className="icon-heart mb-1">
            <FaRegHeart size={20} onClick={handleWishlistClick} />
          </div>
          <div>
            <Link className="icon-heart" to={`/productDetails/${id}`}>
              <FiEye size={20} />
            </Link>
          </div>
        </div>
        <img src={imagePath} className="card-outer pic" />

        <div className="row add-cart" onClick={handelCart}>
          <h5
            className="d-flex justify-content-center align-items-end"
            style={{ fontFamily: "Poppins", color: "white" }}
          >
            Add To Cart
          </h5>
        </div>
      </div>
      <h6 style={{ fontFamily: "Poppins" }}>{name} ({weight}g)</h6>
   
      <p style={{ fontFamily: "Poppins", opacity: "50%" }}>{description}</p>
      <div className="d-flex">
        <h6 style={{ fontFamily: "Poppins", color: "red" }}>${price}</h6>
        <h6 style={{ fontFamily: "Poppins", opacity: "50%" }} className="px-3">
          $160
        </h6>
      </div>
      <Link to={`/feedback/${id}/${name}`} style={{textDecoration:'none',cursor:'pointer'}}>

      <ManualRating/>
      </Link>
    </div>
  );
};

export default Cards;
