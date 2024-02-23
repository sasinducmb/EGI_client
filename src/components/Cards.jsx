import React from 'react';
import StarRating from './StarRating';
import ManualRating from './ManualRating';
import { FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';


const Cards = ({name,price,pic}) => {
  return (
    <div className=" custom-box pt-4 pb-3 mx-3">
      {/* <div className="card-box-inner  "> -40%</div> */}
      <div className="card-inner">
        <div className="card-box-inner">40%</div>
        <div className="card-heart">
          <div className="icon-heart d-flex justify-content-center align-items-center mb-1">
            <FaRegHeart size={20} />
          </div>
          <div className="icon-heart d-flex justify-content-center align-items-center">
            <FiEye size={20} />
          </div>
        </div>
        <img src={`http://localhost:5000/uploads/${pic.split("\\").pop()}`} className=" card-outer pic" />
      </div>
      <h6>{name}</h6>
      <div className="d-flex">
        <h6 style={{ color: 'red' }}>${price}</h6>
        <h6 style={{ opacity: '50%' }} className="px-3">
          $160
        </h6>
      </div>
      <ManualRating />

    </div>
  );
};

export default Cards;
