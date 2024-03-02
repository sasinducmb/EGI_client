import React from 'react';
import { categoryItem } from './data/data';
// import { IoPhonePortraitOutline } from 'react-icons/io5';

const Category = () => {
  return (
    <div className="row pt-4 d-flex justify-content-start">
    {categoryItem.map((items, index) => {
      return (
        <div key={index} className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center">
          <div className="cate-item d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
            {items.imageName}
            <h6 className="pt-3">{items.name}</h6>
          </div>
        </div>
      );
    })}
  </div>
  
  
  );
};

export default Category;
