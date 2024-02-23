import React from 'react';
import StarRating from './StarRating';
import ManualRating from './ManualRating';
import { FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';

const Explore_cards = () => {
  return (
    <div className=" custom-box  pt-4">
      <div className="card-inner card-bgcolor">
        <div className="card-heart">
          <div className="icon-heart d-flex justify-content-center align-items-center mb-1">
            <FaRegHeart size={20} />
          </div>
          <div className="icon-heart d-flex justify-content-center align-items-center">
            <FiEye size={20} />
          </div>
        </div>
        <img src="../../img/set.png" className=" card-outer" />
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
      <h6>Breed Dry Dog Food</h6>
      <div className="d-flex justify-content-start align-items-center ">
        <h6 className="align-items-center d-flex pt-2" style={{ color: 'red' }}>
          $120
        </h6>
        <div className="px-1 pb-1">
          <ManualRating size={10} />
        </div>
        <h6 style={{ opacity: '60%' }} className="px-2  pt-2">
          (160)
        </h6>
      </div>
    </div>
  );
};

export default Explore_cards;
