import React from 'react';
import { categoryItem } from './data/data';
// import { IoPhonePortraitOutline } from 'react-icons/io5';

const Category = () => {
  return (
    <div className="row pt-4 d-flex justify-content-between">
      {categoryItem.map((items) => {
        return (
          <div
            className="col-lg-2  border cate-item d-flex justify-content-center align-items-center"
            style={{ flexDirection: 'column' }}
          >
            {' '}
            {items.imageName}
            <h6 className="pt-3">{items.name}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
