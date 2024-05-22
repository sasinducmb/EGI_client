import React from 'react'

const Refund = () => {
  return (
    <div className="container">
      <h2 className=" mt-5">
        <b>Refund Policy</b>
      </h2>
      <p>
        Thank you for shopping at House of Cambridge. We value your satisfaction
        and strive to provide you with the best online shopping experience
        possible. If, for any reason, you are not completely satisfied with your
        purchase, we are here to help.
      </p>
      <h4 className="mt-3">
        <b>Returns</b>
      </h4>
      <ul typeof="A">
        <li>
          We accept returns within 7 days from the date of purchase. To be
          eligible for a return, your item must be unused and in the same
          condition that you received it. It must also be in the original
          packaging.
        </li>
      </ul>
      <h4 className="mt-3">
        <b>Refunds</b>
      </h4>
      <ul type="a">
        <li>
          Once we receive your return and inspect the item, we will notify you
          of the status of your refund. If your return is approved, we will
          initiate a refund to your original method of payment. Please note that
          the refund amount will exclude any shipping charges incurred during
          the initial purchase.
        </li>
      </ul>
      <h4 className="mt-3">
        <b>Exchanges</b>
      </h4>
      <ul type="a">
        <li>
          If you would like to exchange your item for a different size, color,
          or style, please contact our customer support team within 7 days of
          receiving your order. We will provide you with further instructions on
          how to proceed with the exchange.
        </li>
      </ul>
      <h4 className="mt-3">
        <b>Non-Returnable Items</b>
      </h4>

      <p>Certain items are non-returnable and non-refundable. These include:</p>
      <ul type="a" className="pt-2">
        <li>Gift cards</li>
        <li>Downloadable software products</li>
        <li>Personalized or custom-made items</li>
        <li>Perishable goods</li>
        <li>Damaged or Defective Items</li>
      </ul>

      <p className="pt-3">
        In the unfortunate event that your item arrives damaged or defective,
        please contact us immediately. We will arrange for a replacement or
        issue a refund, depending on your preference and product availability.
      </p>
      <h4 className="mt-3">
        <b>Return Shipping</b>
      </h4>
      <ul type="a">
        <li>
          You will be responsible for paying the shipping costs for returning
          your item unless the return is due to our error (e.g., wrong item
          shipped, defective product). In such cases, we will provide you with a
          prepaid shipping label.
        </li>
      </ul>
      <h4 className="mt-3">
        <b>Processing Time</b>
      </h4>
      <ul type="a">
        <li>
          Refunds and exchanges will be processed within 5 business days after
          we receive your returned item. Please note that it may take additional
          time for the refund to appear in your account, depending on your
          payment provider.
        </li>
      </ul>
      <h4 className="mt-3">
        <b>Contact Us</b>
      </h4>
      <p>
        If you have any questions or concerns regarding our refund policy,
        please contact our customer support team. We are here to assist you and
        ensure your shopping experience with us is enjoyable and hassle-free.
      </p>
    </div>
  );
}

export default Refund