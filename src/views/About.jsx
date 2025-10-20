import React from 'react'
import { BsShop } from 'react-icons/bs';
import { HiCurrencyDollar } from 'react-icons/hi2';
import { FiShoppingBag } from 'react-icons/fi';
import { FaSackDollar } from 'react-icons/fa6';
import { CiDeliveryTruck } from 'react-icons/ci';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { SiAdguard } from 'react-icons/si';

const About = () => {
  return (
    <div className="container">
      <div className=" row d-flex pt-5">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: '50%' }}>Home /</h6>
            <h6 className="ms-2 "> About </h6>
          </div>
        </div>
      </div>

      <div className="row d-flex">
        <div
          className="col-lg-6 d-flex justify-content-center"
          style={{ flexDirection: 'column' }}
        >
          <h2 className="pb-4" style={{ fontSize: '64px' }}>
            {' '}
            Our Story
          </h2>
          <p style={{ fontSize: '16px' }}>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="pt-1" style={{ fontSize: '16px' }}>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className=" col-lg-6 d-flex">
          <img src="../../img/SideImage2.png" />
        </div>
      </div>
      

      <div className="row pt-5 justify-content-between">
        <div
          className="col-lg-4 about-footer d-flex justify-content-center align-items-center"
          style={{ flexDirection: 'column' }}
        >
          <CiDeliveryTruck size={110} />
          <p className="pt-2" style={{ fontSize: '20px', fontWeight: 'bold' }}>
             FAST DELIVERY
          </p>
          <p style={{ fontSize: '12px' }}>
            Free delivery for all orders over $140
          </p>
        </div>
        <div
          className="col-lg-4 about-footer d-flex justify-content-center align-items-center"
          style={{ flexDirection: 'column' }}
        >
          <TfiHeadphoneAlt size={110} />
          <p className="pt-2" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            24/7 CUSTOMER SERVICE
          </p>
          <p style={{ fontSize: '12px' }}>Friendly 24/7 customer support</p>
        </div>
        <div
          className="col-lg-4 about-footer d-flex justify-content-center align-items-center"
          style={{ flexDirection: 'column' }}
        >
          <SiAdguard size={110} />
          <p className="pt-2" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            MONEY BACK GUARANTEE
          </p>
          <p style={{ fontSize: '12px' }}>We reurn money within 30 days</p>
        </div>
      </div>
    </div>
  );
}

export default About