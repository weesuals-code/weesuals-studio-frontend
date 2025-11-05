import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminLogin.scss';

function AdminLogin({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        onLogin(result.admin, result.token);
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="contact-header">
          <div className="section-tag">
            <div className="section-tag-inner">
              <div className="dot" />
              <p>Admin</p>
            </div>
          </div>
          <h2 className="contact-title">Admin Access</h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-label">
              <p className="label-text">Email Address</p>
              <div className="form-input">
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="admin@yourdomain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </label>

            <label className="form-label">
              <p className="label-text">Password</p>
              <div className="form-input">
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </label>
          </div>

          {error && (
            <div className="response-note error">
              {error}
            </div>
          )}

          <div className="form-button-wrapper">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              <p>{isLoading ? 'Logging in...' : 'Access Admin Panel'}</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
