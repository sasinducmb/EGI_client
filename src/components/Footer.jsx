import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Brand Section */}
        <div className="footer-section logo-section">
          <img
            src="../../img/hocll.png"
            alt="House of Cambridge Logo"
            className="footer-logo"
          />
          <h3>HOUSE OF CAMBRIDGE</h3>
          <p>
            Your trusted partner for quality products </p>
        </div>

        {/* Support Section */}
        <div className="footer-section support-section">
          <h3>Support</h3>
          <p>
            <MdLocationOn /> No 63 Old Road, Pannipitiya
          </p>
          <p>
            <MdEmail /> houseofcambridge.lk@gmail.com
          </p>
          <p>
            <MdPhone /> 076 460 4227 – WhatsApp
            <br />
            0112 847 846
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/Policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/refund">Refund Policy</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2024 Exclusive. All rights reserved. | Designed for better shopping
          experience
        </p>
      </div>
    </footer>
  );
}

export default Footer;
