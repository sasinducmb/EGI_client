import React from 'react';

const Cards = () => {
  return (
    <div className=" custom-box  mt-4">
      {/* <div className="card-box-inner  "> -40%</div> */}
      <div className="card-inner border border-primary card-bgcolor">
        <div className="card-box-inner">40%</div>
        <div className="card-heart flex">
          <img src="../../img/fillHeart.png" />
          <img src="../../img/fillEye.png" className="pt-1" />
        </div>
        <img
          src="../../img/joystic.png"
          className="border border-primary card-outer"
        />
      </div>
      <h6>HAVIT HV-G92 Gamepad</h6>
      <div className='d-flex'>
        <h6 style={{ color: 'red' }}>$120</h6>
        <h6 style={{ opacity: '50%' }} className='px-3'>$160</h6>
      </div>
    </div>
  );
};

export default Cards;
