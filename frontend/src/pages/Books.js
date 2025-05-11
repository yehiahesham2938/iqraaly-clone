import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import BookReview from '../components/BookReview';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import './Books.css';

const Books = () => {
  const navigate = useNavigate();
  const { loadTrack } = useAudioPlayer();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mostListenedBooks, setMostListenedBooks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

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
    
    fetch('http://localhost:5000/api/audiobooks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setMostListenedBooks(data.audiobooks);
          setNewReleases(data.audiobooks); // Assuming new releases are part of the same data
        } else {
          console.error('Failed to fetch audiobooks:', data.message);
        }
      })
      .catch(error => console.error('Error fetching audiobooks:', error));
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
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await response.json();
      if (data.success) {
        // Update the book's rating and reviews count
        const updatedBooks = mostListenedBooks.map(book => {
          if (book._id === reviewData.bookId) {
            return {
              ...book,
              rating: data.newRating,
              reviews: book.reviews + 1
            };
          }
          return book;
        });
        setMostListenedBooks(updatedBooks);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  const handleBookClick = (book) => {
    console.log('Book clicked:', book);
    loadTrack(book);
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
            {(mostListenedBooks || []).map(book => (
              <div key={book._id} className="book-card">
                <div className="book-cover" onClick={() => handleBookClick(book)}>
                  <img 
                    src={getImageUrl(book.cover)} 
                    alt={book.title}
                    onError={(e) => handleImageError(e, 'book')}
                  />
                </div>
                <div className="book-info">
                  <h4 className="book-title">{book.title}</h4>
                  <h6 className="book-author">{book.author}</h6>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <BookReview
                    bookId={book._id}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="books-section">
          <h3 className="section-title">جديد اقرألي</h3>
          <div className="books-grid">
            {(newReleases || []).map(book => (
              <div key={book._id} className="book-card">
                <div className="book-cover" onClick={() => handleBookClick(book)}>
                  <img 
                    src={getImageUrl(book.cover)} 
                    alt={book.title}
                    onError={(e) => handleImageError(e, 'book')}
                  />
                </div>
                <div className="book-info">
                  <h4 className="book-title">{book.title}</h4>
                  <h6 className="book-author">{book.author}</h6>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <BookReview
                    bookId={book._id}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
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