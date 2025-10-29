import React, { useState, useEffect } from 'react';
import Cards from './Cards';

const MultiItemCarousel = ({ items, itemsPerSlide = 4 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerSlide);

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) setItemsToShow(1);
      else if (width < 768) setItemsToShow(2);
      else if (width < 992) setItemsToShow(3);
      else setItemsToShow(itemsPerSlide);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerSlide]);

  const totalSlides = Math.ceil(items.length / itemsToShow);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  if (!items || items.length === 0) {
    return <div className="text-center py-5">No items to display</div>;
  }

  return (
    <div className="multi-carousel-container">
      <div className="carousel-wrapper">
        {/* Carousel Items */}
        <div className="carousel-track-container">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              display: 'flex',
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {items.map((item, index) => (
              <div 
                key={item._id || index} 
                className="carousel-card-wrapper"
                style={{
                  minWidth: `${100 / itemsToShow}%`,
                  maxWidth: `${100 / itemsToShow}%`,
                  padding: '0 12px',
                  boxSizing: 'border-box'
                }}
              >
                <Cards
                  id={item._id}
                  name={item.productName}
                  price={item.price}
                  pic={item.mainImage}
                  subpic={item.additionalImages}
                  ct={item.item_count}
                  weight={item.weight}
                  description={item.description}
                  discount={item.discount}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="carousel-indicators">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        .multi-carousel-container {
          position: relative;
          width: 100%;
          margin: 2rem 0;
          padding: 0 10px;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .carousel-track-container {
          overflow: hidden;
          flex: 1;
          border-radius: 12px;
        }

        .carousel-track {
          display: flex;
          width: 100%;
        }

        .carousel-card-wrapper {
          flex-shrink: 0;
        }

        /* Dot Indicators */
        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 30px;
        }

        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #2a9d8f;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator-dot:hover {
          background: rgba(42, 157, 143, 0.5);
          transform: scale(1.2);
        }

        .indicator-dot.active {
          background: #2a9d8f;
          width: 32px;
          border-radius: 6px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .carousel-indicators {
            margin-top: 25px;
          }
        }

        @media (max-width: 768px) {
          .multi-carousel-container {
            padding: 0 5px;
          }

          .carousel-card-wrapper {
            padding: 0 8px;
          }

          .indicator-dot {
            width: 10px;
            height: 10px;
          }

          .indicator-dot.active {
            width: 28px;
          }

          .carousel-indicators {
            gap: 10px;
            margin-top: 20px;
          }
        }

        @media (max-width: 576px) {
          .multi-carousel-container {
            padding: 0;
          }

          .carousel-card-wrapper {
            padding: 0 6px;
          }

          .indicator-dot {
            width: 8px;
            height: 8px;
          }

          .indicator-dot.active {
            width: 24px;
          }

          .carousel-indicators {
            gap: 8px;
            margin-top: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default MultiItemCarousel;