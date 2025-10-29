import React, { useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const WishlistCard = ({ id, name, price, pic, discount, ct, weight, description }) => {
  const { removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState('');

  // ✅ Delete item from wishlist using id
  const handleDelete = () => {
    removeFromWishlist(id);
    setMessage('Removed from wishlist');
    setTimeout(() => setMessage(''), 2000);
  };

  // ✅ Add item to cart with proper _id
  const handleAddToCart = () => {
    addToCart({ 
      _id: id,
      name, 
      price, 
      pic, 
      discount,
      ct,
      weight,
      description
    });
    setMessage('✅ Added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="custom-box pt-2 pb-3 mx-3">
      <div className="card-inner">
        {/* Discount badge */}
        {discount && (
          <div className="card-box-inner d-flex align-items-center justify-content-center">
            {discount}%
          </div>
        )}

        {/* Delete icon - ✅ Fixed onClick */}
        <div className="card-heart">
          <button 
            type="button" 
            className="icon-heart" 
            onClick={handleDelete}
            aria-label="Remove from wishlist"
          >
            <RiDeleteBinLine size={20} />
          </button>
        </div>

        {/* Product image */}
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${
            pic.split(pic.includes("\\") ? "\\" : "/").pop()
          }`}
          alt={name}
          className="card-outer pic"
        />

        {/* Add to cart button - ✅ Fixed onClick */}
        <button 
          className="add-cart" 
          onClick={handleAddToCart}
          type="button"
        >
          <h5 className="d-flex justify-content-center align-items-center">
            Add To Cart
          </h5>
        </button>
      </div>

      {/* Product name */}
      <h6>{name}</h6>

      {/* Price */}
      <div className="d-flex justify-content-center">
        <h6 className="price">Rs {price}</h6>
        <h6 className="old-price px-3">Rs {(price * 1.2).toFixed(2)}</h6>
      </div>

      {/* Success message */}
      {message && (
        <p style={{ 
          color: message.includes('✅') ? 'green' : 'orange', 
          fontSize: '12px', 
          marginTop: '8px',
          fontWeight: '600'
        }}>
          {message}
        </p>
      )}

      {/* Inline CSS */}
      <style>{`
        .custom-box {
          background: #fff;
          border-radius: 12px;
          padding: 12px;
          margin: 12px 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          text-align: center;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .custom-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.15);
        }
        .card-inner {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }
        .card-box-inner {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ff4757;
          color: #fff;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          z-index: 2;
          pointer-events: none;
        }
        .card-heart {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 4;
        }
        .icon-heart {
          background: #fff;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.12s ease;
          border: none;
          padding: 0;
        }
        .icon-heart:hover {
          background: #ffeded;
          transform: scale(1.05);
        }
        .card-outer.pic {
          width: 100%;
          height: 180px;
          object-fit: contain;
          margin: 0 auto;
          display: block;
          transition: transform 0.4s ease;
        }
        .card-outer.pic:hover {
          transform: scale(1.05);
        }
        .add-cart {
          background: #ff4757;
          border-radius: 8px;
          margin: 10px auto 0;
          padding: 8px;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s ease;
          width: 80%;
          display: block;
          border: none;
        }
        .add-cart:hover {
          background: #ff6b81;
          transform: scale(1.03);
        }
        .add-cart h5 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
        }
        .custom-box h6 {
          margin-top: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .custom-box .d-flex .price {
          color: #e60023;
          font-weight: 700;
        }
        .custom-box .d-flex .old-price {
          text-decoration: line-through;
          color: #777;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default WishlistCard;