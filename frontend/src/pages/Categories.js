import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import './Categories.css';

const Categories = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const sampleCategories = [
    {
      id: 1,
      name: 'روايات',
      description: 'أفضل الروايات العربية والعالمية',
      icon: 'https://images.media.iqraaly.com:444/users/1/shows/1539_1685831290.jpg',
      bookCount: 150
    },
    {
      id: 2,
      name: 'تنمية بشرية',
      description: 'كتب تطوير الذات والتنمية البشرية',
      icon: 'https://images.media.iqraaly.com:444/users/1/shows/3047_1741993665.png',
      bookCount: 80
    },
    {
      id: 3,
      name: 'تاريخ',
      description: 'كتب التاريخ والحضارات',
      icon: 'https://images.media.iqraaly.com:444/users/1/shows/3026_1741036981.jpg',
      bookCount: 65
    },
    {
      id: 4,
      name: 'علوم',
      description: 'كتب العلوم والمعرفة',
      icon: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSBTdDKXYdfaS7wr1yGkCekaST01ZVDJu44Ks6bFr3XClzzLw0X',
      bookCount: 45
    }
  ];

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
  
    setLoading(true);
    setTimeout(() => {
      setCategories(sampleCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="categories-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-error">
        <p>حدث خطأ أثناء تحميل التصنيفات</p>
        <button onClick={() => window.location.reload()}>إعادة المحاولة</button>
      </div>
    );
  }

  return (
    <div dir="rtl" className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">اقرألي</Link>
          </div>
          
          <div className="navbar-links">
            <Link to="/" className="navbar-link">الرئيسية</Link>
            <Link to="/books" className="navbar-link">الكتب</Link>
            <Link to="/categories" className="navbar-link active">التصنيفات</Link>
            <Link to="/about" className="navbar-link">من نحن</Link>
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
      </nav>

      {/* Categories Content */}
      <div className="categories-container">
        <h1 className="categories-title">تصفح التصنيفات</h1>
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`}
              className="category-card"
            >
              <div className="category-icon">
                <img 
                  src={getImageUrl(category.icon, 'categoryIcons')} 
                  alt={category.name}
                  onError={(e) => handleImageError(e, 'category')}
                />
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <span className="category-count">{category.bookCount} كتاب</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 