import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `/user/reset-password/${token}`,
        { password, confirmPassword }
      );
      if (response.data.success) {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to reset password. The link may be invalid or expired.'
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
          background: linear-gradient(135deg, #5f9ea0 0%, #8b7355 100%);
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

        .form-group input[type="text"],
        .form-group input[type="password"] {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-group input[type="text"]:focus,
        .form-group input[type="password"]:focus {
          border-color: #5f9ea0;
          box-shadow: 0 0 0 3px rgba(95, 158, 160, 0.1);
        }

        .form-group input[type="text"]:disabled,
        .form-group input[type="password"]:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .checkbox-group {
          margin-bottom: 20px;
        }

        .checkbox-group label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: 400;
          font-size: 14px;
          color: #555;
          user-select: none;
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin-right: 10px;
          cursor: pointer;
          accent-color: #5f9ea0;
          border: 2px solid #5f9ea0;
          border-radius: 4px;
        }

        .checkbox-group input[type="checkbox"]:hover {
          opacity: 0.8;
        }

        .checkbox-group input[type="checkbox"]:focus {
          outline: 2px solid #5f9ea0;
          outline-offset: 2px;
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

          .form-group input[type="text"],
          .form-group input[type="password"] {
            padding: 10px 14px;
            font-size: 14px;
          }

          .login-btn {
            padding: 12px;
            font-size: 15px;
          }

          .checkbox-group label {
            font-size: 13px;
          }

          .checkbox-group input[type="checkbox"] {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          <h2>Reset Password</h2>
          <p className="subtitle">
            Enter your new password below
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                disabled={loading}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show password
              </label>
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
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;