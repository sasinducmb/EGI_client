import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('/user/forgot-password', {
        email
      });

      if (response.data.success) {
        setMessage('Password reset link has been sent to your email!');
        setEmail('');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to send reset email. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          min-height: 100vh;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        .login-box {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 450px;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-box h2 {
          color: #2c5f5f;
          font-size: 28px;
          margin-bottom: 12px;
          text-align: center;
        }

        .subtitle {
          color: #666;
          font-size: 14px;
          text-align: center;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          color: #2c5f5f;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-group input:focus {
          border-color: #5f9ea0;
          box-shadow: 0 0 0 3px rgba(95, 158, 160, 0.1);
        }

        .form-group input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .success-message {
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          color: #155724;
          padding: 14px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          border-left: 4px solid #28a745;
          animation: slideIn 0.3s ease-out;
        }

        .error-message {
          background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
          color: #721c24;
          padding: 14px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          border-left: 4px solid #dc3545;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #5f9ea0 0%, #4a7a7c 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .login-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #4a7a7c 0%, #3d6365 100%);
          box-shadow: 0 4px 12px rgba(95, 158, 160, 0.3);
          transform: translateY(-2px);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          background: linear-gradient(135deg, #cccccc 0%, #b3b3b3 100%);
          cursor: not-allowed;
          transform: none;
        }

        .login-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .login-footer p {
          color: #666;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .login-footer a {
          color: #5f9ea0;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-footer a:hover {
          color: #4a7a7c;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px 20px;
          }

          .login-box h2 {
            font-size: 24px;
          }

          .subtitle {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          <h2>Forgot Password</h2>
          <p className="subtitle">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {message && (
              <div className="success-message">
                {message}
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Remember your password? <Link to="/login">Login</Link>
            </p>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;