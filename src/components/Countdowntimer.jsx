import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeUnit = (label, value) => (
    <div style={{ textAlign: 'center', margin: '0 10px' }}>
      <div>{label}</div>
      <div style={{ fontSize: '22px' }}>{value}</div>
    </div>
  );

  return (
    <div>
      {timeLeft.days ||
      timeLeft.hours ||
      timeLeft.minutes ||
      timeLeft.seconds ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'poppins',
            fontWeight: 400,
            fontSize: '14px',
            width: '62px',
            height: '62px',
            borderRadius: '50%'
          }}
        >
          {timeUnit('Days', timeLeft.days)}
          <span style={{color: '#E07575'}}> :</span>
          {timeUnit('Hours', timeLeft.hours)}
          <span style={{ color: '#E07575' }}>:</span>
          {timeUnit('Minutes', timeLeft.minutes)}
          <span style={{ color: '#E07575' }}>:</span>
          {timeUnit('Seconds', timeLeft.seconds)}
        </div>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
