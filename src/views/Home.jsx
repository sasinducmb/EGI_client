import React from 'react';
import Sidebarwithslider from '../components/Sidebarwithslider';
import CountdownTimer from '../components/Countdowntimer';
import Cards from '../components/Cards';

const Home = () => {
  return (
    <div class="container-fluid">
      <div className="container">
        <Sidebarwithslider />
        <div>
          <div
            className="d-flex align-items-center "
            style={{ width: '20px', height: '40px', backgroundColor: 'red' }}
          >
            <div class="red-box"></div>
            <div>
              <h6 className="pt-1 px-4"> Today's</h6>
            </div>
          </div>
        </div>

        <div className="row pt-4">
          <div className=" d-flex">
            <div className="col-lg-3">
              <h4
                style={{
                  fontFamily: 'poppins',
                  fontWeight: 600,
                  fontSize: '36px',
                }}
              >
                Flash Sales
              </h4>
            </div>
            <div className="col-lg-5  d-flex align-items-center">
              <CountdownTimer targetDate="2024-12-31" />
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-end">
              <div>
                <img
                  src="../../img/fillleft.png"
                  className="px-2"
                  style={{ cursor: 'pointer' }}
                />
                <img
                  src="../../img/fillright.png"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex'>
          <Cards />
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Home;
