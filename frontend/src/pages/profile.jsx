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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching profile with token:', token);
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Profile fetch response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      setUser(data.user);
      setFormData({
        username: data.user.username,
        email: data.user.email,
        profile_picture: data.user.profile_picture || ''
      });
      setPreviewUrl(data.user.profile_picture || '');
    } catch (error) {
      console.error('Profile fetch error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrorMessage('File size should be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

  
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      if (selectedFile) {
        formDataToSend.append('profile_picture', selectedFile);
      }

      console.log('Sending profile update with data:', {
        username: formData.username,
        email: formData.email,
        hasFile: !!selectedFile
      });

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Profile update response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setUser(data.user);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      setSelectedFile(null);
      
  
      await fetchProfile();
    } catch (error) {
      console.error('Profile update error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
          <button 
            className="close-button" 
            onClick={() => setErrorMessage('')}
            style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
          <button 
            className="close-button" 
            onClick={() => setSuccessMessage('')}
            style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      <div className="profile-content">
        <div className="profile-picture">
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" />
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile_picture">Profile Picture</label>
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                disabled={isLoading}
              />
              <label htmlFor="profile_picture" className="file-input-label">
                {selectedFile ? selectedFile.name : 'Choose a file'}
              </label>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-save"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button" 
                className="btn btn-cancel" 
                onClick={() => {
                  setIsEditing(false);
                  setPreviewUrl(user.profile_picture || '');
                  setSelectedFile(null);
                  setFormData({
                    username: user.username,
                    email: user.email,
                    profile_picture: user.profile_picture || ''
                  });
                }}
                disabled={isLoading}
              >
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
            <button 
              className="btn btn-edit" 
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;