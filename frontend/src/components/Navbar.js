import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, user, darkMode, toggleDarkMode, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">اقرألي</Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${isActive('/')}`}>الرئيسية</Link>
          <Link to="/books" className={`navbar-link ${isActive('/books')}`}>الكتب</Link>
          <Link to="/categories" className={`navbar-link ${isActive('/categories')}`}>التصنيفات</Link>
          <Link to="/about" className={`navbar-link ${isActive('/about')}`}>من نحن</Link>
        </div>
        
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <button
                className="auth-button profile-button"
                onClick={() => navigate('/profile')}
              >
                {user?.username}
              </button>
              <button
                className="auth-button logout-button"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <button
                className="auth-button login-button"
                onClick={() => navigate('/login')}
              >
                تسجيل الدخول
              </button>
              <button
                className="btn btn-register"
                onClick={() => navigate('/register')}
              >
                إنشاء حساب
              </button>
            </>
          )}
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
            title={darkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
          >
            {darkMode ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
          <button 
            className="navbar-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={showMobileMenu ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <i className={showMobileMenu ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
      </div>
      
      <div className={`navbar-mobile-menu ${showMobileMenu ? 'open' : ''}`}>
        <Link to="/" className={`navbar-link ${isActive('/')}`}>الرئيسية</Link>
        <Link to="/books" className={`navbar-link ${isActive('/books')}`}>الكتب</Link>
        <Link to="/categories" className={`navbar-link ${isActive('/categories')}`}>التصنيفات</Link>
        <Link to="/about" className={`navbar-link ${isActive('/about')}`}>من نحن</Link>
        
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <button
                className="auth-button profile-button"
                onClick={() => navigate('/profile')}
              >
                {user?.username}
              </button>
              <button
                className="auth-button logout-button"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <button
                className="auth-button login-button"
                onClick={() => navigate('/login')}
              >
                تسجيل الدخول
              </button>
              <button
                className="auth-button btn-register"
                onClick={() => navigate('/register')}
              >
                إنشاء حساب
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;