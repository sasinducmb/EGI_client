import React, { useContext, useState } from 'react';
import ManualRating from './ManualRating';
import { FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../auth/userContext';
import { Link, useNavigate } from 'react-router-dom';

const Cards = ({
  id,
  name,
  ct,
  price,
  pic,
  discount,
  subpic,
  weight,
  description,
}) => {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleWishlistClick = () => {
    if (!isAuthenticated()) {
      setMessage('⚠️ Please login to add to wishlist');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const wishlistItem = {
      _id: id,
      name, 
      ct, 
      price, 
      pic, 
      discount, 
      subpic, 
      weight, 
      description 
    };
    console.log('💗 Adding to wishlist:', wishlistItem);
    addToWishlist(wishlistItem);
  };

  const handelCart = () => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      setMessage('⚠️ Please login to add items to cart');
      setTimeout(() => {
        setMessage('');
        navigate('/login');
      }, 1500);
      return;
    }

    // If authenticated, add to cart
    addToCart({ 
      _id: id,
      name, 
      ct, 
      price, 
      pic, 
      discount, 
      subpic, 
      weight, 
      description 
    });
    setMessage('✅ Successfully added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  const getPath = (pic) => {
    const separator = pic.includes('\\') ? '\\' : '/';
    return `${process.env.REACT_APP_API_URL}/uploads/${pic.split(separator).pop()}`;
  };

  const imagePath = getPath(pic);

  return (
    <>
      <style>
        {`
          .custom-box {
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(42, 157, 143, 0.12);
            background: linear-gradient(135deg, #ffffff, rgba(244, 249, 248, 0.5));
            transition: all 0.4s ease;
            overflow: hidden;
            border: 1px solid rgba(42, 157, 143, 0.15);
            padding: 15px !important;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .custom-box:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 30px rgba(42, 157, 143, 0.25);
            border-color: rgba(42, 157, 143, 0.3);
          }

          .card-inner {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            background: rgba(244, 249, 248, 0.3);
          }

          .card-outer.pic {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 12px;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            display: block;
          }

          .card-outer.pic:hover {
            transform: scale(1.08);
          }

          .card-heart {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 10;
            gap: 8px;
          }

          .icon-heart {
            background: linear-gradient(135deg, #ffffff, rgba(244, 249, 248, 0.95));
            border-radius: 50%;
            padding: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 3px 12px rgba(42, 157, 143, 0.2);
            border: 1px solid rgba(42, 157, 143, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2a9d8f;
            width: 36px;
            height: 36px;
          }

          .icon-heart:hover {
            background: linear-gradient(135deg, #2a9d8f, #26867a);
            color: white;
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 5px 20px rgba(42, 157, 143, 0.4);
          }

          .icon-heart:active {
            transform: scale(0.95);
          }

          .card-box-inner {
            position: absolute;
            top: 12px;
            left: 12px;
            background: linear-gradient(135deg, #e76f51, #f4a261);
            color: #fff;
            padding: 6px 14px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            box-shadow: 0 3px 12px rgba(231, 111, 81, 0.4);
            z-index: 10;
            letter-spacing: 0.5px;
          }

          .card-content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-top: 12px;
          }

          .product-name {
            font-family: 'Poppins', sans-serif;
            margin-top: 0;
            margin-bottom: 8px;
            font-weight: 600;
            color: #264653;
            font-size: 14px;
            transition: color 0.3s ease;
            line-height: 1.4;
            min-height: 42px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .custom-box:hover .product-name {
            color: #2a9d8f;
          }

          .product-price {
            font-family: 'Poppins', sans-serif;
            color: #e76f51;
            font-weight: 700;
            font-size: 16px;
            margin-top: 4px;
            margin-bottom: 8px;
          }

          .rating-wrapper {
            margin-bottom: 12px;
          }

          .add-cart-bottom {
            background: linear-gradient(135deg, #2a9d8f, #26867a);
            cursor: pointer;
            padding: 12px;
            border-radius: 10px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: auto;
            width: 100%;
            box-shadow: 0 3px 12px rgba(42, 157, 143, 0.3);
            border: none;
          }

          .add-cart-bottom:hover {
            background: linear-gradient(135deg, #e76f51, #f4a261);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 6px 20px rgba(231, 111, 81, 0.4);
          }

          .add-cart-bottom:active {
            transform: translateY(0) scale(0.98);
          }

          .cart-message {
            color: #2a9d8f;
            font-size: 13px;
            margin-top: 10px;
            text-align: center;
            font-weight: 600;
            animation: fadeIn 0.3s ease;
          }

          .cart-message.warning {
            color: #e76f51;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .add-to-cart-text {
            font-family: 'Poppins', sans-serif;
            color: white;
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            letter-spacing: 0.5px;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .custom-box {
              margin: 0 8px;
            }

            .card-outer.pic {
              height: 160px;
            }

            .icon-heart {
              padding: 7px;
              width: 32px;
              height: 32px;
            }

            .add-cart-bottom {
              padding: 10px;
            }

            .product-name {
              font-size: 13px;
              min-height: 40px;
            }

            .product-price {
              font-size: 15px;
            }

            .add-to-cart-text {
              font-size: 13px;
            }
          }

          @media (max-width: 576px) {
            .card-outer.pic {
              height: 200px;
            }

            .icon-heart {
              width: 32px;
              height: 32px;
            }

            .product-name {
              font-size: 13px;
            }
          }
        `}
      </style>

      <div className="custom-box mx-3">
        <div className="card-inner" style={{ position: 'relative' }}>
          {/* Discount Label */}
          {discount && <div className="card-box-inner">-{discount}%</div>}

          {/* Heart & Eye Icons - ALWAYS VISIBLE */}
          <div className="card-heart">
            <div className="icon-heart" onClick={handleWishlistClick}>
              <FaRegHeart size={18} />
            </div>
            <Link className="icon-heart" to={`/productDetails/${id}`}>
              <FiEye size={18} />
            </Link>
          </div>

          {/* Product Image */}
          <Link to={`/productDetails/${id}`}>
            <img src={imagePath} className="card-outer pic" alt={name} />
          </Link>
        </div>

        {/* Card Content Wrapper for flex alignment */}
        <div className="card-content-wrapper">
          {/* Product Name */}
          <h6 className="product-name">{name}</h6>

          {/* Price */}
          <div className="d-flex">
            <h6 className="product-price">Rs {price}</h6>
          </div>

          {/* Rating */}
          <div className="rating-wrapper">
            <Link to={`/feedback/${id}/${name}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <ManualRating />
            </Link>
          </div>

          {/* Add To Cart Button - Always at bottom */}
          <div className="add-cart-bottom" onClick={handelCart}>
            <h5 className="add-to-cart-text">
              Add To Cart
            </h5>
          </div>

          {/* Success/Warning Message */}
          {message && (
            <p className={`cart-message ${message.includes('login') ? 'warning' : ''}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cards;