import React, { useEffect, useState, useContext } from "react";
import ManualRating from "../components/ManualRating";
import { FaRegHeart } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsArrowRepeat } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import Cards from "../components/Cards";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState("");
  const { addToCart } = useContext(CartContext);
  const { cart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/oneProductDetails/${id}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/products/getAllDetails");
        const activeProduct = response.data.filter(
          (product) => product.isActive === true
        );
        setCategories(activeProduct);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProduct();
  }, []);

  const handelCart = () => {
    addToCart({
      _id: productDetails._id, // ✅ Fixed: use _id
      name: productDetails.productName,
      price: productDetails.price,
      pic: productDetails.mainImage,
      ct: productDetails.item_count,
      weight: productDetails.weight,
      description: productDetails.description,
    });
    setMessage('✅ Successfully added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleWishlistClick = () => {
    addToWishlist({
      _id: productDetails._id, // ✅ Fixed: use _id
      name: productDetails.productName,
      price: productDetails.price,
      pic: productDetails.mainImage,
    });
  };

  const getPath = (pic) => {
    const separator = pic.includes("\\") ? "\\" : "/";
    return `${process.env.REACT_APP_API_URL}/uploads/${pic
      .split(separator)
      .pop()}`;
  };

  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>
              account /{productDetails?.brandId?.category?.categoryName}/
            </h6>
            <h6 className="ms-2 ">{productDetails.productName}</h6>
          </div>
        </div>
      </div>

      <div className="row pt-5">
        <div className="col-lg-7 col-md-12">
          <div className="row">
            <div
              className="col-lg-4 col-md-12 d-lg-flex d-md-none d-sm-none justify-content-between"
              style={{ flexDirection: "column" }}
            >
              {productDetails.additionalImages &&
                productDetails.additionalImages.length > 0 &&
                productDetails.additionalImages.map((image, index) => (
                  <div key={index} className="detail-product-small mb-3">
                    <img
                      src={getPath(image)}
                      alt={`Additional Image ${index}`}
                      className="img-fluid"
                    />
                  </div>
                ))}
            </div>
            <div className="col-lg-8 col-md-12 detail-product-large">
              {productDetails && productDetails.mainImage ? (
               <img
               src={`${process.env.REACT_APP_API_URL}/uploads/${productDetails.mainImage.split(productDetails.mainImage.includes("\\") ? "\\" : "/").pop()}`}
               className="img-fluid"
             />
             
              ) : (
                <div>Loading image or image not available...</div>
              )}
            </div>
            <div className="col-md-12 d-lg-none d-md-flex d-sm-flex justify-content-between mt-3">
              {productDetails.additionalImages &&
                productDetails.additionalImages.length > 0 &&
                productDetails.additionalImages.map((image, index) => (
                  <div key={index} className="detail-product-small mb-3">
                   <img
                      src={getPath(image)}
                      alt={`Additional Image ${index}`}
                      className="img-fluid"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5 mt-3 ">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <h4>{productDetails.productName}</h4>
              <div className="d-flex align-items-center">
                <ManualRating />
                <p className="m-2" style={{ opacity: "50%" }}>
                </p>
                <p className="m-2" style={{ color: "#00FF66" }}>
                </p>
              </div>
              <h5 className="p-1">Rs:{productDetails.price}</h5>
              <p className="p-1 pb-2 text-align-justify" style={{textAlign:'justify'}}>
               {productDetails.description}
              </p>
              <hr />
              <div className="d-flex">
              </div>
              <div className="d-flex pt-2">
              </div>
              <div className="d-flex pt-3">
                <button
                  className="product-buynow mb-3"
                  style={{ border: "none" }}
                  onClick={handelCart}
                >
                  Buy Now
                </button>
                <div className="product-heart ">
                  <Link to={"/wishlist"} style={{ color: "black" }}>
                    <FaRegHeart
                      size={23}
                      style={{ cursor: "pointer" }}
                      onClick={handleWishlistClick}
                    />
                  </Link>
                </div>
              </div>
              {/* ✅ Added success message */}
              {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
              <div className="pt-2">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="d-flex align-items-center red-box ">
          <div>
            <h6 className="pt-1 px-4"> Related&nbsp;Item</h6>
          </div>
        </div>
      </div>
      <div className="row">
        {categories.slice(0, 4).map((category, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div className="item" style={{ height: "400px" }}>
              <Cards
                 id={category._id}
                 name={category.productName}
                 price={category.price}
                 pic={category.mainImage}
                 subpic={category.additionalImages}
                 ct={category.item_count}
                 weight={category.weight}
                 description={category.description}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;