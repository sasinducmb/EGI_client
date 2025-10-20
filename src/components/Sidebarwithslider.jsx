import React, { useState } from 'react';
import './sidebar.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { GiShoppingCart, GiVacuumCleaner, GiBabyBottle } from "react-icons/gi";
import { Link } from 'react-router-dom';
import bgvideo from '../assests/bgvideo.mp4';

const Sidebarwithslider = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState("");

  const scrollUp = () => {
    window.scrollTo({
      top: 2200,
      behavior: "smooth"
    });
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    scrollUp();
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
  };

  const categories = [
    { name: "Grocery", icon: <GiShoppingCart size={20} />, color: "#2a9d8f" },
    { name: "HouseHold", icon: <GiVacuumCleaner size={20} />, color: "#e76f51" },
    { name: "Baby Needs", icon: <GiBabyBottle size={20} />, color: "#f4a261" }
  ];

  return (
    <>
      {/* Background Video Section with Categories */}
      <div className="hero-outer-wrapper">
        <div className="modern-hero-container">
          {/* Background Video */}
          <video
            className="hero-bg-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={bgvideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark Gradient Overlay */}
          <div className="hero-overlay"></div>

          {/* Content Container */}
          <div className="hero-content-wrapper">
            {/* Main Hero Text */}
            <div className="hero-text-section">
              <div className="hero-badge">
                <span className="badge-icon">✨</span>
                <span>Premium Shopping Experience</span>
              </div>
              <h1 className="hero-title">
                Shop Smarter with <span className="brand-highlight">HOC</span>
              </h1>
              <p className="hero-subtitle">
                Discover amazing deals and premium products every single day
              </p>
            </div>

            {/* Category Cards */}
            <div className="category-cards-grid">
              {categories.map((cat, index) => (
                <button
                  key={cat.name}
                  type="button"
                  className={`modern-category-card ${activeCategory === cat.name ? "card-active" : ""}`}
                  onClick={() => handleCategoryClick(cat.name)}
                  style={{
                    '--category-color': cat.color,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="card-icon-wrapper">
                    {cat.icon}
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{cat.name}</h3>
                    <span className="card-subtitle">Explore now</span>
                  </div>
                  <MdOutlineKeyboardArrowRight className="card-arrow" size={22} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS */}
      <style>{`
        .hero-outer-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 20px;
          margin-bottom: 40px;
        }

        .modern-hero-container {
          position: relative;
          width: 100%;
          max-width: 2000px;
          min-height: 450px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .hero-bg-video {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: 1;
          filter: brightness(0.7);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(38, 70, 83, 0.85) 0%,
            rgba(42, 157, 143, 0.75) 50%,
            rgba(231, 111, 81, 0.65) 100%
          );
          z-index: 2;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 3;
          padding: 40px 40px;
          display: flex;
          flex-direction: column;
          gap: 35px;
          min-height: 400px;
          justify-content: center;
        }

        .hero-text-section {
          text-align: center;
          animation: fadeInDown 0.8s ease-out;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 6px 18px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }

        .badge-icon {
          font-size: 14px;
          animation: sparkle 2s ease-in-out infinite;
        }

        .hero-title {
          font-size: 2.8rem;
          font-weight: 800;
          color: white;
          margin-bottom: 15px;
          line-height: 1.2;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          letter-spacing: -1px;
        }

        .brand-highlight {
          background: linear-gradient(135deg, #f3927aff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 400;
          max-width: 600px;
          margin: 0 auto;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .category-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .modern-category-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          animation: slideUp 0.6s ease-out backwards;
        }

        .modern-category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--category-color), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .modern-category-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .modern-category-card:hover::before {
          opacity: 0.15;
        }

        .card-active {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: white !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
        }

        .card-active::before {
          opacity: 0.25 !important;
        }

        .card-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 14px;
          color: white;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .modern-category-card:hover .card-icon-wrapper {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(10deg) scale(1.1);
        }

        .card-content {
          flex: 1;
          text-align: left;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin: 0 0 4px 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .card-subtitle {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
        }

        .card-arrow {
          color: white;
          opacity: 0.7;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .modern-category-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(5px);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .category-cards-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }
        }

        @media (max-width: 768px) {
          .hero-outer-wrapper {
            padding: 0 15px;
          }

          .modern-hero-container {
            min-height: 450px;
            border-radius: 16px;
          }

          .hero-content-wrapper {
            padding: 35px 25px;
            gap: 30px;
            min-height: 450px;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .category-cards-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .modern-category-card {
            padding: 18px;
          }
        }

        @media (max-width: 480px) {
          .modern-hero-container {
            min-height: 420px;
          }

          .hero-content-wrapper {
            min-height: 420px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-subtitle {
            font-size: 0.95rem;
          }

          .card-icon-wrapper {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebarwithslider;