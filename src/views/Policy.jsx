import React from 'react';
import { Link } from 'react-router-dom';

const Policy = () => {
  return (
    <div>
      {/* Inline CSS for theme */}
      <style>
        {`
          .policy-container {
            background-color: white;
            color: black;
            padding: 30px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 40px auto;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .policy-container h2,
          .policy-container h4 {
            color: red;
            margin-top: 20px;
          }

          .policy-container p,
          .policy-container ul {
            font-size: 16px;
            line-height: 1.6;
          }

          .policy-container ul li {
            margin-bottom: 10px;
          }

          .policy-container hr {
            border: none;
            border-top: 2px solid red;
            margin: 30px 0;
          }
        `}
      </style>

      <div className="policy-container">
        <h2><b>Privacy Policy</b></h2>

        <p>
          At House of Cambridge, we are committed to protecting the privacy and
          security of our customers' personal information. This Privacy Policy
          outlines how we collect, use, and safeguard your information when you
          visit or make a purchase on our website. By using our website, you
          consent to the practices described in this policy.
        </p>

        <h4><b>Information We Collect</b></h4>
        <p>
          When you visit our website, we may collect certain information about
          you, including:
        </p>
        <ul>
          <li>
            Personal identification information (HOC,
            houseofcambridge.lk@gmail.com, TP: 0112 847 846) provided voluntarily
            by you during registration or checkout.
          </li>
          <li>
            Payment and billing information necessary to process your orders,
            including credit card details, which are securely handled by trusted
            third-party payment processors.
          </li>
          <li>
            Browsing information, such as your IP address, browser type, and
            device information, collected automatically using cookies and similar
            technologies.
          </li>
        </ul>

        <h4><b>Use of Information</b></h4>
        <p>We may use the collected information for the following purposes:</p>
        <ul>
          <li>To process and fulfill your orders, including shipping and delivery.</li>
          <li>To communicate with you regarding your purchases and provide support.</li>
          <li>To personalize your shopping experience and present relevant promotions.</li>
          <li>To improve our website, products, and services.</li>
          <li>To detect and prevent fraud, unauthorized activities, and misuse.</li>
        </ul>

        <h4><b>Information Sharing</b></h4>
        <p>
          We respect your privacy and do not sell, trade, or otherwise transfer
          your personal information to third parties without your consent, except
          in the following cases:
        </p>
        <ul>
          <li>
            <b>Trusted service providers:</b> who help us operate our website,
            process payments, or deliver products—under strict confidentiality.
          </li>
          <li>
            <b>Legal requirements:</b> where disclosure is required by law or
            government authorities.
          </li>
        </ul>

        <h4><b>Data Security</b></h4>
        <p>
          We use industry-standard security measures to protect your personal
          data. However, no method of transmission over the internet or
          electronic storage is 100% secure.
        </p>

        <h4><b>Cookies and Tracking Technologies</b></h4>
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience. You can disable cookies through your browser settings, but
          this may affect certain website features.
        </p>

        <h4><b>Changes to the Privacy Policy</b></h4>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          reflected on this page with a new “last updated” date. Please review it
          periodically.
        </p>

        <h4><b>Contact Us</b></h4>
        <p>
          For questions or concerns about this Privacy Policy or your personal
          data, please contact us through the details provided on our website.
        </p>

        <hr />
        <p>
          <Link to="/" style={{ color: 'red', textDecoration: 'underline' }}>
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Policy;
