import React, { useState, useEffect } from 'react';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profile_picture: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      setUser(data.user);
      setFormData({
        username: data.user.username,
        email: data.user.email,
        profile_picture: data.user.profile_picture || ''
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setUser(data.user);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {errorMessage && (
        <div className="alert alert-error">{errorMessage}</div>
      )}

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="profile-content">
        <div className="profile-picture">
          {user.profile_picture ? (
            <img src={user.profile_picture} alt="Profile" />
          ) : (
            <div className="profile-placeholder">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile_picture">Profile Picture URL</label>
              <input
                type="url"
                id="profile_picture"
                name="profile_picture"
                value={formData.profile_picture}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-save">Save Changes</button>
              <button type="button" className="btn btn-cancel" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-group">
              <label>Username</label>
              <p>{user.username}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-group">
              <label>Subscription</label>
              <p className={`subscription ${user.subscription_status}`}>
                {user.subscription_status.charAt(0).toUpperCase() + user.subscription_status.slice(1)}
              </p>
            </div>
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 