import React, { useState } from 'react';
import "../assests/Carousel.css";

const CarouselItem = ({ src }) => (
  <div className="carousel-item">
    <div className="col-md-3">
      <div className="card card-body">
        <img className="img-fluid" src={src} />
      </div>
    </div>
  </div>
);

const YourCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = [
    'https://juniortoexpert.com/wp-content/uploads/owl-carousel-responsive-slider.png',
    'https://juniortoexpert.com/wp-content/uploads/owl-carousel-responsive-slider.png',
    'https://juniortoexpert.com/wp-content/uploads/owl-carousel-responsive-slider.png',
    // ... add more URLs as needed
  ];

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      id="myCarousel"
      className="carousel slide container"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner w-100">
        {carouselItems.map((src, index) => (
          <div
            key={src}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
          >
            <CarouselItem src={src} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={goToPrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={goToNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default YourCarousel;
