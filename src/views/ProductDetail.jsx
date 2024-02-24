import React from 'react';
import ManualRating from '../components/ManualRating';
import { FaRegHeart } from 'react-icons/fa';
import { CiDeliveryTruck } from 'react-icons/ci';
import { BsArrowRepeat } from 'react-icons/bs';
import Product_cards from '../components/Product_cards';

const ProductDetail = () => {
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: '50%' }}>account / gaming /</h6>
            <h6 className="ms-2 "> Havic HV G-92 Gamepad</h6>
          </div>
        </div>
      </div>

      <div className="row pt-5">
        <div className="col-lg-7 ">
          <div className="row">
            <div className="col-lg-4">
              <div className="detail-product-small ">
                <img src="../../img/11.png" />
              </div>
              <div className="detail-product-small ">
                <img src="../../img/22.png" />
              </div>
              <div className="detail-product-small ">
                <img src="../../img/33.png" />
              </div>
              <div className="detail-product-small ">
                <img src="../../img/44.png" />
              </div>
            </div>
            <div className="col-lg-8 detail-product-large ">
              <img src="../../img/55.png" />
            </div>
          </div>
        </div>
        <div className="col-lg-5 ">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <h4>Havic HV G-92 Gamepad</h4>
              <div className="d-flex align-items-center">
                <ManualRating />
                <p className="m-2" style={{ opacity: '50%' }}>
                  (150 Reviews) |
                </p>
                <p className="m-2" style={{ color: '#00FF66' }}>
                  In Stock
                </p>
              </div>
              <h5 className="p-1">$192.00</h5>
              <p className="p-1 pb-2">
                PlayStation 5 Controller Skin High quality vinyl with air
                <br />
                channel adhesive for easy bubble free install & mess
                <br /> free removal Pressure sensitive.
              </p>
              <hr />
              <div className="d-flex">
                <h6>Colors :</h6>
                <div className="color-button-0 mx-2"></div>
                <div className="color-button-1 mx-1"></div>
              </div>
              <div className="d-flex pt-2">
                <h6 className="p-1">Sizes:</h6>
                <div className="product-size">XS</div>
                <div className="product-size">S</div>
                <div className="product-size">M</div>
                <div className="product-size">L</div>
                <div className="product-size">XL</div>
              </div>
              <div className="d-flex pt-3">
                <div className="product-buynow"> Buy Now</div>
                <div className="product-heart ">
                  <FaRegHeart size={23} />
                </div>
              </div>
              <div className="pt-2">
                <table className="product-table">
                  <div>
                    <tr className="">
                      <div className="d-flex align-items-center justify-content-center">
                        <CiDeliveryTruck size={40} className="mt-" />
                        <div className="mx-2">
                          <h6>Free Delivery</h6>
                          <a href="#" style={{ color: '#000000' }}>
                            <p>
                              Enter your postal code for Delivery Availability
                            </p>
                          </a>
                        </div>
                      </div>
                    </tr>
                    <hr />
                    <tr>
                      <div className="d-flex">
                        <BsArrowRepeat size={40} />
                        <div className="mx-2">
                          <h6>Return Delivery</h6>
                          <p>Free 30 Days Delivery Returns. Details</p>
                        </div>
                      </div>
                    </tr>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="d-flex align-items-center red-box ">
          <div>
            <h6 className="pt-1 px-4"> Related&nbsp;Item</h6>
          </div>
        </div>
      </div>
      <div className="pt-5 pb-5">
        <Product_cards/>
      </div>
    </div>
  );
};

export default ProductDetail;
