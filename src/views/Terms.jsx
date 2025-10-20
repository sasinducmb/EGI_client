import React from "react";

const Terms = () => {
  const containerStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "30px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "40px auto",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    color: "red",
    marginTop: "20px",
  };

  const textStyle = {
    fontSize: "16px",
    lineHeight: "1.6",
  };

  const listStyle = {
    marginLeft: "20px",
  };

  const listItemStyle = {
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>
        <b>Terms and Conditions</b>
      </h2>

      <p style={textStyle}>
        Welcome to House of Cambridge. These Terms and Conditions govern your
        use of our website and the purchase and sale of products from our
        platform. By accessing and using our website, you agree to comply with
        these terms. Please read them carefully before proceeding with any
        transactions.
      </p>

      <h4 style={headingStyle}>
        <b>Use of the Website</b>
      </h4>
      <ul style={{ ...textStyle, ...listStyle }}>
        <li style={listItemStyle}>
          You must be at least 18 years old to use our website or make purchases.
        </li>
        <li style={listItemStyle}>
          You are responsible for maintaining the confidentiality of your account
          information, including your username and password.
        </li>
        <li style={listItemStyle}>
          You agree to provide accurate and current information during the
          registration and checkout process.
        </li>
        <li style={listItemStyle}>
          You may not use our website for any unlawful or unauthorized purposes.
        </li>
      </ul>

      <h4 style={headingStyle}>
        <b>Product Information and Pricing</b>
      </h4>
      <ul style={{ ...textStyle, ...listStyle }}>
        <li style={listItemStyle}>
          We strive to provide accurate product descriptions, images, and
          pricing information. However, we do not guarantee the accuracy or
          completeness of such information.
        </li>
        <li style={listItemStyle}>
          Prices are subject to change without notice. Any promotions or
          discounts are valid for a limited time and may be subject to additional
          terms and conditions.
        </li>
      </ul>

      <h4 style={headingStyle}>
        <b>Orders and Payments</b>
      </h4>
      <ul style={{ ...textStyle, ...listStyle }}>
        <li style={listItemStyle}>
          By placing an order on our website, you are making an offer to purchase
          the selected products.
        </li>
        <li style={listItemStyle}>
          We reserve the right to refuse or cancel any order for any reason,
          including product availability, errors in pricing or suspected
          fraudulent activity.
        </li>
        <li style={listItemStyle}>
          You agree to provide valid and up-to-date payment information and
          authorize us to charge the total order amount, including applicable
          taxes and shipping fees, to your chosen payment method.
        </li>
        <li style={listItemStyle}>
          We use trusted third-party payment processors to handle your payment
          information securely. We do not store or have access to your full
          payment details.
        </li>
      </ul>

      <h4 style={headingStyle}>
        <b>Shipping and Delivery</b>
      </h4>
      <ul style={{ ...textStyle, ...listStyle }}>
        <li style={listItemStyle}>
          We will make reasonable efforts to ensure timely shipping and delivery
          of your orders.
        </li>
        <li style={listItemStyle}>
          Shipping and delivery times provided are estimates and may vary based
          on your location and other factors.
        </li>
      </ul>

      <h4 style={headingStyle}>
        <b>Intellectual Property</b>
      </h4>
      <ul style={{ ...textStyle, ...listStyle }}>
        <li style={listItemStyle}>
          All content and materials on our website, including but not limited to
          text, images, logos, and graphics, are protected by intellectual
          property rights and are the property of House of Cambridge or its
          licensors.
        </li>
        <li style={listItemStyle}>
          You may not use, reproduce, distribute, or modify any content from our
          website without prior written consent.
        </li>
      </ul>

      <h4 style={headingStyle}>
        <b>Limitation of Liability</b>
      </h4>
      <ul style={{ ...textStyle, ...listStyle }}>
        <li style={listItemStyle}>
          In no event shall House of Cambridge, its directors, employees, or
          affiliates be liable for any direct, indirect, incidental, special, or
          consequential damages arising out of or in connection with your use of
          our website or products.
        </li>
        <li style={listItemStyle}>
          We make no warranties or representations, express or implied,
          regarding the quality, accuracy, or suitability of the products offered
          on our website.
        </li>
      </ul>

      <h4 style={headingStyle}>
        <b>Amendments and Termination</b>
      </h4>
      <p style={textStyle}>
        We reserve the right to modify, update, or terminate these Terms and
        Conditions at any time without prior notice. It is your responsibility to
        review these terms periodically for any changes.
      </p>
    </div>
  );
};

export default Terms;
