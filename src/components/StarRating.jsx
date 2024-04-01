import React from 'react';
import ManualRating from './ManualRating';

const StarRating = ({ rating }) => {
  const renderStar = (star) => {
    let color;
    if (rating >= star) {
      color = 'gold'; // Color for filled stars
    } 
    else if (rating >= star - 0.5) {
      color = '#gold'; // Color for half-filled stars, if you want a different shade
    }
     else {
      color = 'gray'; // Color for empty stars
    }

    return (
      <span key={star} style={{ color, fontSize: '30px', cursor: 'pointer' }}>
        ★
      </span>
    );
  };

  return <div>{[1, 2, 3, 4, 5].map(renderStar)}</div>;
};

export default StarRating;
