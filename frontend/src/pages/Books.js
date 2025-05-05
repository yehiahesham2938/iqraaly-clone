import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Books.css';

const Books = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sample data - Replace with your actual data from API
  const mostListenedBooks = [
    {
      id: 1,
      title: 'هاتف وثلاث جثث - الكتاب الأول',
      author: 'يارا رضوان',
      cover: '/book-covers/book1.jpg'
    },
    {
      id: 2,
      title: 'جنينة المحروقي',
      author: 'يحيى صفوت',
      cover: '/book-covers/book2.jpg'
    },
    {
      id: 3,
      title: 'أوراق شمعون المصري',
      author: 'أسامة عبد الرؤف الشاذلي',
      cover: '/book-covers/book3.jpg'
    },
    // Add more books as needed
  ];

  const newReleases = [
    {
      id: 1,
      title: 'الخواجاية',
      author: 'فيموني عكاشة',
      cover: '/book-covers/new1.jpg'
    },
    {
      id: 2,
      title: 'كوش كو',
      author: 'ولاء كمال',
      cover: '/book-covers/new2.jpg'
    },
    {
      id: 3,
      title: 'الهندي الاحمر الاخير',
      author: 'طارق الجارد',
      cover: '/book-covers/new3.jpg'
    },
    // Add more books as needed
  ];

  useEffect(() => {
    // Check if user is authenticated
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
            <Link to="/books" className="navbar-link active">الكتب</Link>
            <Link to="/categories" className="navbar-link">التصنيفات</Link>
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
          <Link to="/" className="navbar-link">الرئيسية</Link>
          <Link to="/books" className="navbar-link active">الكتب</Link>
          <Link to="/categories" className="navbar-link">التصنيفات</Link>
          <Link to="/about" className="navbar-link">من نحن</Link>
          
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

      {/* Books Content */}
      <div className="books-container">
        {/* Most Listened Section */}
        <section className="books-section">
          <h3 className="section-title">الأكثر استماعا</h3>
          <div className="books-grid">
            {mostListenedBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-cover">
                  <img src={book.cover} alt={book.title} />
                </div>
                <h4 className="book-title">{book.title}</h4>
                <h6 className="book-author">{book.author}</h6>
              </div>
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="books-section">
          <h3 className="section-title">جديد اقرألي</h3>
          <div className="books-grid">
            {newReleases.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-cover">
                  <img src={book.cover} alt={book.title} />
                </div>
                <h4 className="book-title">{book.title}</h4>
                <h6 className="book-author">{book.author}</h6>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="books-section">
          <h3 className="section-title">اكتشف التصنيفات</h3>
          <div className="categories-grid">
            {/* Add your categories here */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Books; 