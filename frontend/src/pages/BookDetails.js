import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import BookReview from '../components/BookReview';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample book data - Replace with API call
  const sampleBook = {
    id: parseInt(id),
    title: 'هاتف وثلاث جثث - الكتاب الأول',
    author: 'يارا رضوان',
    cover: '/book-covers/book1.jpg',
    description: 'رواية مثيرة للاهتمام تروي قصة غامضة تدور أحداثها حول هاتف وثلاث جثث. تتبع الرواية مسار التحقيق في هذه الجرائم الغامضة وتكشف عن خيوط متشابكة من العلاقات والأسرار.',
    rating: 4.5,
    reviews: 128,
    duration: '8 ساعات و 45 دقيقة',
    narrator: 'أحمد محمد',
    category: 'روايات',
    releaseDate: '2023-01-15',
    language: 'العربية',
    isBookmarked: false
  };

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

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setBook(sampleBook);
      setLoading(false);
    }, 1000);
  }, [id]);

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

  const toggleBookmark = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality with API
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      // TODO: Implement review submission with API
      console.log('Review submitted:', reviewData);
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="book-details-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-details-error">
        <p>حدث خطأ أثناء تحميل تفاصيل الكتاب</p>
        <button onClick={() => window.location.reload()}>إعادة المحاولة</button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-details-error">
        <p>الكتاب غير موجود</p>
        <Link to="/books" className="back-button">العودة إلى الكتب</Link>
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

      {/* Book Details Content */}
      <div className="book-details-container">
        <div className="book-details-content">
          <div className="book-cover">
            <img 
              src={getImageUrl(book.cover)} 
              alt={book.title}
              onError={(e) => handleImageError(e, 'book')}
            />
            <button 
              className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
              onClick={toggleBookmark}
              title={isBookmarked ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            >
              <i className={`fas fa-bookmark ${isBookmarked ? 'active' : ''}`}></i>
            </button>
          </div>
          
          <div className="book-info">
            <h1 className="book-title">{book.title}</h1>
            <h2 className="book-author">تأليف: {book.author}</h2>
            
            <div className="book-rating">
              <div className="stars">
                {renderRatingStars(book.rating)}
              </div>
              <span className="rating-value">{book.rating}</span>
              <span className="reviews-count">({book.reviews} تقييم)</span>
            </div>

            <div className="book-meta">
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>{book.duration}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-microphone"></i>
                <span>{book.narrator}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-book"></i>
                <span>{book.category}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>{book.releaseDate}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-language"></i>
                <span>{book.language}</span>
              </div>
            </div>

            <div className="book-description">
              <h3>نبذة عن الكتاب</h3>
              <p>{book.description}</p>
            </div>

            <div className="book-actions">
              <button className="play-button">
                <i className="fas fa-play"></i>
                تشغيل
              </button>
              <button className="download-button">
                <i className="fas fa-download"></i>
                تحميل
              </button>
            </div>
          </div>
        </div>

        <div className="book-reviews">
          <h3>التقييمات والمراجعات</h3>
          <BookReview
            bookId={book._id}
            onSubmit={handleReviewSubmit}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 