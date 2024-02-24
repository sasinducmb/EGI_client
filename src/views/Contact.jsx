import React from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';

const Contact = () => {
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: '50%' }}>Home /</h6>
            <h6 className="ms-2 "> Contact</h6>
          </div>
        </div>
      </div>

      <div className="row d-flex pt-5 pb-5">
        <div className="col-lg-4 contact-style d flex ">
          <div className="pt-4 d-flex ">
            <div className="icon-contact d-flex justify-content-center align-items-center">
              <IoCallOutline size={23} />
            </div>
            <div>
              <h6 className="px-3 pt-2" style={{ fontWeight: 'bold' }}>
                Call To Us
              </h6>
            </div>
          </div>
          <div className="pt-3 px-4">
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone:&nbsp; +8801611112222</p>
          </div>
          <hr />
          <div className="pt-4 d-flex ">
            <div className="icon-contact d-flex justify-content-center align-items-center">
              <CiMail size={23} />
            </div>
            <div>
              <h6 className="px-3 pt-2" style={{ fontWeight: 'bold' }}>
                Write To US
              </h6>
            </div>
          </div>
          <div className="pt-3 px-4">
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails:&nbsp; customer@exclusive.com</p>
            <p>Emails:&nbsp; support@exclusive.com</p>
          </div>
        </div>

        <div className="col-lg-8 mx-4 contact-form-style border border-primary ">
          <div class="form-row m-5 justify-content-center align-item- center">
            <div class="row d-flex">
              <div class="form-group col-md-4">
                <input
                  type="first"
                  class="form-control"
                  id="inputFirst"
                  placeholder="First Name"
                  required
                />
              </div>
              <div class="form-group col-md-4">
                <input
                  type="first"
                  class="form-control"
                  id="inputFirst"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="form-group col-md-4">
                <input
                  type="first"
                  class="form-control"
                  id="inputFirst"
                  placeholder="Your Phone"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div className="col-lg-12 pt-3">
                <textarea
                  class="form-control"
                  id="validationTextarea"
                  placeholder="Please enter a message."
                  style={{ height: '230px' }}
                ></textarea>
              </div>
            </div>
            <div className="pt-4 d-flex justify-content-end">
              <button type="submit" class="custom-style">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
