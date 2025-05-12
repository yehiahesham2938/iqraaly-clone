import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordStrength(calculateStrength(value));
    setFormData(prev => ({
      ...prev,
      password: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length > 0) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 5);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return '#e63946';
    if (passwordStrength <= 3) return '#f4a261';
    return '#2a9d8f';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

  
      console.log('Registration successful:', data);
  
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join our community today</p>
      </div>

      {errorMessage && (
        <div className="alert alert-error">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
              {passwordVisible ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="password-strength">
            <div className="strength-meter" style={{ width: `${passwordStrength * 20}%`, background: getStrengthColor() }}></div>
          </div>
        </div>
        
        <button type="submit" className="btn btn-register">Register</button>
      </form>

      <div className="auth-footer">
        Already have an account? <a href="/login" className="auth-link">Login here</a>
      </div>
    </div>
  );
};

export default Register;
