import React from 'react';
import Sidebarwithslider from '../components/Sidebarwithslider';
import CountdownTimer from '../components/Countdowntimer';

const Home = () => {
  return (
    <div class="container-fluid">
      <div className="container">
        <Sidebarwithslider />

        <div
          class="red-box"
          style={{ width: '20px', height: '40px', backgroundColor: 'red' }}
        >
          <h6 className="pt-2"> Today's</h6>
        </div>

        <div className="d-flex pt-4">
          <h2
            style={{ fontFamily: 'poppins', fontWeight: 600, fontSize: '36px' }}
          >
            {' '}
            Flash Sales{' '}
          </h2>
          <CountdownTimer targetDate="2024-12-31" />
        </div>
      </div>
    </div>
  );
};

export default Home;
