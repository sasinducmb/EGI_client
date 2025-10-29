import React from 'react';
import StarRating from './StarRating';
import ManualRating from './ManualRating';
import { FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';

const Product_cards = () => {
  return (
    <div className="custom-box pt-4">
      <div className="card-inner card-bgcolor">
        <div className="card-heart">
          <div className="icon-heart d-flex justify-content-center align-items-center mb-1">
            <FaRegHeart size={20} />
          </div>
          <div className="icon-heart d-flex justify-content-center align-items-center">
            <FiEye size={20} />
          </div>
        </div>
        <img src="../../img/coat.png" className="card-outer" />
        <a href="#">
          <div className="row add-cart">
            <h5
              className="d-flex justify-content-center align-items-end"
              style={{ color: 'white' }}
            >
              Add To Cart
            </h5>
          </div>
        </a>
      </div>
      <h6 className="product-title">HAVIT HV-G92 Gamepad</h6>
      <div className="d-flex align-items-center">
        <h6 className="price-current">$120</h6>
        <h6 className="price-old px-3">$160</h6>
      </div>
      <div>
        <ManualRating />
      </div>

      <style>{`
        .custom-box {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .custom-box:hover {
          transform: translateY(-8px);
        }

        .card-inner {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(42, 157, 143, 0.15);
        }

        .card-inner:hover {
          box-shadow: 0 8px 30px rgba(42, 157, 143, 0.25);
        }

        .card-bgcolor {
          background: linear-gradient(135deg, rgba(244, 249, 248, 0.9), rgba(42, 157, 143, 0.05));
          padding: 20px;
          border: 1px solid rgba(42, 157, 143, 0.2);
        }

        .card-heart {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .icon-heart {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ffffff, rgba(244, 249, 248, 0.9));
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(42, 157, 143, 0.2);
          border: 1px solid rgba(42, 157, 143, 0.2);
          color: #2a9d8f;
        }

        .icon-heart:hover {
          background: linear-gradient(135deg, #2a9d8f, #26867a);
          color: white;
          transform: scale(1.15);
          box-shadow: 0 4px 15px rgba(42, 157, 143, 0.4);
        }

        .icon-heart:active {
          transform: scale(0.95);
        }

        .card-outer {
          width: 100%;
          height: auto;
          object-fit: contain;
          transition: transform 0.4s ease;
          max-height: 200px;
        }

        .card-inner:hover .card-outer {
          transform: scale(1.05);
        }

        .add-cart {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(135deg, #2a9d8f, #26867a);
          padding: 12px 0;
          margin: 0;
          opacity: 0;
          transform: translateY(100%);
          transition: all 0.4s ease;
          cursor: pointer;
          border-radius: 0 0 15px 15px;
        }

        .card-inner:hover .add-cart {
          opacity: 1;
          transform: translateY(0);
        }

        .add-cart:hover {
          background: linear-gradient(135deg, #e76f51, #f4a261);
        }

        .add-cart h5 {
          margin: 0;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.5px;
        }

        .product-title {
          margin-top: 15px;
          font-weight: 600;
          color: #264653;
          font-size: 15px;
          transition: color 0.3s ease;
        }

        .custom-box:hover .product-title {
          color: #2a9d8f;
        }

        .price-current {
          color: #e76f51;
          font-weight: 700;
          font-size: 18px;
          margin: 8px 0;
        }

        .price-old {
          color: #264653;
          opacity: 0.5;
          text-decoration: line-through;
          font-size: 16px;
          margin: 8px 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .card-bgcolor {
            padding: 15px;
          }

          .icon-heart {
            width: 35px;
            height: 35px;
          }

          .add-cart h5 {
            font-size: 14px;
          }

          .product-title {
            font-size: 14px;
          }

          .price-current {
            font-size: 16px;
          }

          .price-old {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Product_cards;