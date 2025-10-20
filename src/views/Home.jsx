import React, { useEffect, useState } from 'react';
import Sidebarwithslider from '../components/Sidebarwithslider';
import Cards from '../components/Cards';
import MultiItemCarousel from '../components/MultiItemCarousel'; // Import new carousel
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/getAllDetails');
        const activeProducts = response.data.filter(product => product.isActive === true);
        setCategories(activeProducts);
        setLoader(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = category => setSelectedCategory(category);

  const handleSidebarCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (loader) {
    return (
      <div className="spinner-container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <TailSpin height="80" width="80" color="#2a9d8f" visible={true} />
      </div>
    );
  }

  // Filter products by type
  const flashSaleProducts = categories.filter(item => item.sellType === 'flash');
  const bestSellingProducts = categories.filter(item => item.sellType === 'best');
  const filteredProducts = categories.filter(item =>
    selectedCategory === 'All' ||
    (item.categoryId && item.categoryId.categoryName === selectedCategory)
  );

  return (
    <div className="container-fluid" style={{ backgroundColor: '#ffffff', color: '#264653', position: 'relative' }}>
      {/* Background Video */}
      <div className="video-background">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="../assests/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Sidebarwithslider onCategorySelect={handleSidebarCategorySelect} />

        {/* Flash Sales */}
        {flashSaleProducts.length > 0 && (
          <>
            <div className="text-center mt-5">
              <h4 className="section-title flash-sales-title">Flash Sales</h4>
            </div>
            <MultiItemCarousel items={flashSaleProducts} itemsPerSlide={4} />
            <hr className="section-divider" />
          </>
        )}

        {/* Best Selling Products */}
        {bestSellingProducts.length > 0 && (
          <>
            <div className="text-center mt-5">
              <h4 className="section-title best-selling-title">Best Selling Products</h4>
            </div>
            <MultiItemCarousel items={bestSellingProducts} itemsPerSlide={4} />
            <hr className="section-divider" />
          </>
        )}

        {/* Explore Products */}
        <div className="pt-5">
          <div className="text-center mb-4">
            <h4 className="section-title our-products-title">Our Products</h4>
          </div>
          <div className="d-flex justify-content-end mb-4 flex-wrap gap-3">
            {['All', 'Grocery', 'Baby Needs', 'HouseHold'].map(category => (
              <button
                key={category}
                className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="row">
            {filteredProducts.map(item => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex" key={item._id}>
                <Cards
                  id={item._id}
                  name={item.productName}
                  price={item.price}
                  pic={item.mainImage}
                  subpic={item.additionalImages}
                  ct={item.item_count}
                  weight={item.weight}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Optimized CSS */}
        <style>{`
          /* Background Video Styles */
          .video-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
          }

          .bg-video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translate(-50%, -50%);
            object-fit: cover;
            opacity: 0.15;
            filter: brightness(0.9);
          }

          .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
         
            backdrop-filter: blur(2px);
          }

          /* Section Titles - Modern Teal Theme */
          .section-title {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 3rem;
            font-weight: 800;
            letter-spacing: 1px;
            margin: 2rem 0;
            position: relative;
            cursor: default;
            user-select: none;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(135deg, #2a9d8f 0%, #264653 25%, #2a9d8f 50%, #1a4d5c 75%, #2a9d8f 100%) !important;
            background-size: 300% 300%;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            animation: gradientFlow 8s ease-in-out infinite;
            filter: drop-shadow(0 4px 12px rgba(42, 157, 143, 0.25));
            padding: 0 70px;
            color: transparent !important;
          }

          .section-title:hover {
            transform: scale(1.05);
            filter: drop-shadow(0 8px 20px rgba(42, 157, 143, 0.4));
          }

          .section-title::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(42, 157, 143, 0.3), transparent);
            animation: shimmerEffect 4s ease-in-out infinite;
          }

          /* Title Icons */
          .flash-sales-title::after {
            content: "⚡";
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2.5rem;
            animation: pulse 2s ease-in-out infinite;
            filter: drop-shadow(0 0 12px rgba(231, 111, 81, 0.6));
          }

          .best-selling-title::after {
            content: "⭐";
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2.5rem;
            animation: rotate 4s linear infinite;
            filter: drop-shadow(0 0 12px rgba(231, 111, 81, 0.6));
          }

          .our-products-title::after {
            content: "🛍️";
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2.5rem;
            animation: bounce 2s ease-in-out infinite;
            filter: drop-shadow(0 0 12px rgba(42, 157, 143, 0.6));
          }

          /* Animations */
          @keyframes gradientFlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes pulse {
            0%, 100% { transform: translateY(-50%) scale(1); opacity: 1; }
            50% { transform: translateY(-50%) scale(1.15); opacity: 0.85; }
          }

          @keyframes rotate {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(-50%) translateY(0); }
            50% { transform: translateY(-50%) translateY(-8px); }
          }

          @keyframes shimmerEffect {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          /* Our Products Section - Equal Card Heights */
          .row > [class*="col-"] {
            display: flex;
            flex-direction: column;
          }

          .row > [class*="col-"] > div {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          /* Ensure Cards component fills height */
          .row .card {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .row .card-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          /* Category Filter Buttons */
          .category-filter-btn {
            background: rgba(255, 255, 255, 0.95);
            color: #264653;
            border: 2px solid rgba(42, 157, 143, 0.3);
            border-radius: 12px;
            font-weight: 600;
            padding: 0.75rem 1.8rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            white-space: nowrap;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(42, 157, 143, 0.15);
            font-size: 15px;
            position: relative;
            overflow: hidden;
          }

          .category-filter-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(42, 157, 143, 0.2), transparent);
            transition: left 0.5s ease;
          }

          .category-filter-btn:hover::before {
            left: 100%;
          }
          
          .category-filter-btn:hover {
            background: #2a9d8f;
            color: white;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(42, 157, 143, 0.35);
            border-color: #2a9d8f;
          }
          
          .category-filter-btn.active {
            background: linear-gradient(135deg, #2a9d8f, #264653);
            color: white;
            box-shadow: 0 6px 20px rgba(42, 157, 143, 0.4);
            border-color: #2a9d8f;
            transform: translateY(-2px);
          }

          .category-filter-btn.active:hover {
            background: linear-gradient(135deg, #264653, #2a9d8f);
          }

          /* Section Divider */
          .section-divider {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(42, 157, 143, 0.3), 
              rgba(231, 111, 81, 0.25),
              rgba(42, 157, 143, 0.3),
              transparent
            );
            margin: 4rem 0;
          }

          /* Responsive Design */
          @media (max-width: 992px) {
            .section-title {
              font-size: 2.5rem;
              padding: 0 60px;
            }
            
            .flash-sales-title::after,
            .best-selling-title::after,
            .our-products-title::after {
              font-size: 2rem;
            }
          }

          @media (max-width: 768px) {
            .bg-video {
              opacity: 0.12;
            }

            .section-title {
              font-size: 2rem;
              padding: 0 50px;
            }
            
            .flash-sales-title::after,
            .best-selling-title::after,
            .our-products-title::after {
              font-size: 1.8rem;
            }

            .category-filter-btn { 
              font-size: 0.9rem;
              padding: 0.65rem 1.4rem;
            }
          }

          @media (max-width: 480px) {
            .bg-video {
              opacity: 0.08;
            }

            .section-title {
              font-size: 1.6rem;
              letter-spacing: 0.5px;
              padding: 0 45px;
            }
            
            .flash-sales-title::after,
            .best-selling-title::after,
            .our-products-title::after {
              font-size: 1.5rem;
            }

            .category-filter-btn {
              font-size: 0.85rem;
              padding: 0.6rem 1.2rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;