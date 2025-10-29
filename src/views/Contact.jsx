import React, { useState } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Using EmailJS - You need to replace these with your actual IDs from emailjs.com
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_2dwjokt', // Replace with your EmailJS service ID
          template_id: 'template_442923q', // Replace with your EmailJS template ID
          user_id: 'EuxkJ7j1Vj2n0h9b_', // Replace with your EmailJS public key
          template_params: {
            from_name: formData.firstName,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_email: 'raveesharh@gmail.com'
          }
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container contact-container">
      {/* Breadcrumb */}
      <div className="row pt-5">
        <div className="d-flex justify-content-start">
          <h6 className="breadcrumb-home">Home /</h6>
          <h6 className="breadcrumb-current ms-2">Contact</h6>
        </div>
      </div>

      <div className="row pt-5 pb-5">
        {/* Contact Info (Left Side) */}
        <div className="col-lg-6 contact-info">
          <div className="contact-item d-flex align-items-center pt-4 card-hover">
            <div className="icon-contact d-flex justify-content-center align-items-center pulse-icon">
              <IoCallOutline size={23} />
            </div>
            <h6 className="contact-title px-3 pt-2">Call To Us</h6>
          </div>
          <div className="contact-details pt-3 px-4">
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: 0112 847 846</p>
          </div>

          <hr className="contact-hr" />

          <div className="contact-item d-flex align-items-center pt-4 card-hover">
            <div className="icon-contact d-flex justify-content-center align-items-center pulse-icon">
              <CiMail size={23} />
            </div>
            <h6 className="contact-title px-3 pt-2">Write To Us</h6>
          </div>
          <div className="contact-details pt-3 px-4">
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Email: houseofcambridge.lk@gmail.com</p>
          </div>
        </div>

        {/* Contact Form (Right Side) */}
        <div className="col-lg-6 contact-form">
          <form className="form-container m-3" onSubmit={handleSubmit}>
            {submitStatus === 'success' && (
              <div className="alert alert-success" role="alert">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert alert-danger" role="alert">
                Failed to send message. Please try again or email us directly.
              </div>
            )}
            
            <div className="mb-3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control input-custom interactive-input"
                placeholder="First Name"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control input-custom interactive-input"
                placeholder="Your Email"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control input-custom interactive-input"
                placeholder="Your Phone"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control input-custom textarea-custom interactive-input"
                placeholder="Please enter a message."
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            <div className="pt-3 d-flex justify-content-end">
              <button 
                type="submit" 
                className="btn btn-teal interactive-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
  .contact-container { 
    color: #264653; 
    font-family: 'Poppins', sans-serif; 
  }

  /* Breadcrumb */
  .breadcrumb-home { 
    opacity: 0.6; 
    color: #264653;
  }
  .breadcrumb-current { 
    font-weight: 600; 
    color: #2a9d8f;
  }

  /* Contact Info */
  .contact-info { 
    background: linear-gradient(135deg, rgba(42, 157, 143, 0.1), rgba(244, 249, 248, 0.8));
    padding: 35px; 
    border-radius: 15px; 
    border: 1px solid rgba(42, 157, 143, 0.2);
    box-shadow: 0 8px 25px rgba(42, 157, 143, 0.15);
  }
  
  .contact-item { 
    margin-bottom: 10px; 
    transition: transform 0.3s ease; 
  }
  
  .card-hover:hover { 
    transform: translateY(-5px); 
  }

  .icon-contact { 
    background: linear-gradient(135deg, #2a9d8f, #26867a);
    color: #fff; 
    width: 50px; 
    height: 50px; 
    border-radius: 50%; 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 15px rgba(42, 157, 143, 0.3);
  }
  
  .pulse-icon:hover { 
    animation: pulse 1s infinite; 
  }

  @keyframes pulse {
    0% { 
      transform: scale(1); 
      box-shadow: 0 0 5px rgba(42, 157, 143, 0.5); 
    }
    50% { 
      transform: scale(1.2); 
      box-shadow: 0 0 20px rgba(42, 157, 143, 0.8); 
    }
    100% { 
      transform: scale(1); 
      box-shadow: 0 0 5px rgba(42, 157, 143, 0.5); 
    }
  }

  .contact-title { 
    font-weight: bold; 
    font-size: 16px; 
    color: #264653;
  }
  
  .contact-details p { 
    margin: 0; 
    font-size: 14px; 
    color: #264653;
    opacity: 0.8;
  }
  
  .contact-hr { 
    border-top: 2px solid rgba(42, 157, 143, 0.2); 
    margin: 20px 0; 
  }

  /* Contact Form */
  .form-container { 
    background: linear-gradient(135deg, rgba(42, 157, 143, 0.1), rgba(244, 249, 248, 0.8));
    padding: 35px; 
    border-radius: 15px; 
    border: 1px solid rgba(42, 157, 143, 0.2);
    box-shadow: 0 8px 25px rgba(42, 157, 143, 0.15);
  }
  
  .input-custom { 
    background-color: #ffffff; 
    border: 2px solid rgba(42, 157, 143, 0.3); 
    color: #264653; 
    border-radius: 10px; 
    height: 50px; 
    transition: all 0.3s ease;
    padding: 12px 16px;
  }
  
  .textarea-custom { 
    background-color: #ffffff; 
    border: 2px solid rgba(42, 157, 143, 0.3); 
    color: #264653; 
    border-radius: 10px; 
    transition: all 0.3s ease; 
    min-height: 140px;
    padding: 12px 16px;
  }

  .input-custom::placeholder,
  .textarea-custom::placeholder {
    color: rgba(42, 157, 143, 0.6);
    opacity: 1;
  }

  .interactive-input:focus { 
    border-color: #2a9d8f; 
    box-shadow: 0 0 15px rgba(42, 157, 143, 0.4); 
    transform: scale(1.02);
    outline: none;
  }

  .input-custom:disabled,
  .textarea-custom:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Alert Messages */
  .alert {
    padding: 12px 16px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 14px;
  }

  .alert-success {
    background-color: rgba(42, 157, 143, 0.1);
    border: 1px solid #2a9d8f;
    color: #264653;
  }

  .alert-danger {
    background-color: rgba(231, 111, 81, 0.1);
    border: 1px solid #e76f51;
    color: #264653;
  }

  /* Button */
  .btn-teal { 
    background: linear-gradient(135deg, #2a9d8f, #26867a);
    color: #fff; 
    border: none; 
    padding: 12px 30px; 
    border-radius: 10px; 
    transition: all 0.3s ease;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(42, 157, 143, 0.3);
  }
  
  .interactive-btn:hover:not(:disabled) { 
    background: linear-gradient(135deg, #e76f51, #f4a261);
    transform: scale(1.05); 
    box-shadow: 0 6px 20px rgba(231, 111, 81, 0.4); 
  }

  .interactive-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .interactive-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .contact-info { 
      margin-bottom: 30px; 
    }
    .icon-contact { 
      width: 45px; 
      height: 45px; 
    }
    .form-container,
    .contact-info {
      padding: 25px;
    }
  }
`}</style>
    </div>
  );
};

export default Contact;