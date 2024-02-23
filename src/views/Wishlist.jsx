import React from 'react'
import WishlistCard from '../components/WishlistCard';
import Product_cards from '../components/Product_cards';

const Wishlist = () => {
  return (
    <div className="container">
      <div className="row pt-4 ">
        <div className="d-flex justify-content-between">
          <div className="col-lg-5">
            <h4>Wishlist (4)</h4>
          </div>
          <div
            className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
            style={{ cursor: 'pointer' }}
          >
            <h6>Move All To Bag</h6>
          </div>
        </div>
      </div>
      <WishlistCard />

      <hr />
      <div className="pb-4">
        <div className="row pt-4 ">
          <div className="d-flex justify-content-between">
            <div className="col-lg-5">
              <div className="row d-flex align-items-center red-box ">
                <div>
                  <h5 className="pt-1 px-4">Just&nbsp;For&nbsp;You</h5>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 d-flex justify-content-center wishlist-style align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <h6>See All</h6>
            </div>
          </div>
        </div>
        <Product_cards />
      </div>
    </div>
  );
}

export default Wishlist