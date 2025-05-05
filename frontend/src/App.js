import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.js';
import Player from './components/Player/player.js';
import MiniPlayer from './components/MiniPlayer/MiniPlayer.js';
import AudioInfo from './components/AudioInfo/AudioInfo';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Profile from './pages/profile.jsx';
import AboutUs from './pages/AboutUs.jsx';
import { useNavigate } from 'react-router-dom';

import './App.css';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Update localStorage and body class when dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Add or remove dark-mode class from body
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
    <AudioPlayerProvider>
      <div dir="rtl" className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        {/* Custom Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <a href="#" className="navbar-logo">اقرألي</a>
            </div>
            
            <div className="navbar-links">
              <a href="#" className="navbar-link">الرئيسية</a>
              <a href="#" className="navbar-link">الكتب</a>
              <a href="#" className="navbar-link">التصنيفات</a>
              <a href="/AboutUs" onClick={() => navigate('/AboutUs')} className="navbar-link">من نحن</a>
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
                  <i className="fas fa-sun"></i> // Sun icon for light mode
                ) : (
                  <i className="fas fa-moon"></i> // Moon icon for dark mode
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
            <a href="#" className="navbar-link">  الرئيسية</a>
            <a href="#" className="navbar-link">  الكتب</a>
            <a href="#" className="navbar-link">  التصنيفات</a>
            <a href="/AboutUs" onClick={() => navigate('/AboutUs')} className="navbar-link">  من نحن</a>
            
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
        
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="main-heading">عيش رحلة مع كُتبك الصوتية المميزة</h1>
              <p className="subtitle">اقرألي أول منصة كتب صوتية و بودكاست باللغة العربية في الوطن العربي منذ ٢٠٢٥ , توفر لملايين المستمعين الآلاف من الكتب الصوتية.</p>
              <button className="cta-button">اشترك الآن</button>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="section-header">
              <h6 className="section-subtitle">من نحن ؟</h6>
              <h3 className="section-title">عيش رحلة مع كُتبك الصوتية المميزة فقط علي اقرألي</h3>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p>اقرألي أول منصة كتب صوتية و بودكاست باللغة العربية في الوطن العربي منذ ٢٠٢٥ , توفر لملايين المستمعين الآلاف من الكتب الصوتية.</p>
                <p>عيش تجربة استماع مميزة وتمتع بملايين الدقائق من مختلف الكتب والأعمال الأدبية الصوتية علي منصتنا.</p>
                <button className="outline-button">معرفة المزيد</button>
              </div>
              <div className="about-image">
                <div className="pattern-bg"></div>
                <div className="image-container">
                  {/* Placeholder instead of image that may not exist */}
                  <div style={{ height: '300px', background: 'linear-gradient(45deg, #8e44ad, #e67e22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>اقرألي</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <div className="section-header">
              <h6 className="section-subtitle">خدماتنا</h6>
              <h3 className="section-title">أضف الحياة إلى الكتب مع اقرألي</h3>
            </div>
            <p className="services-description">
              بنقدملك أكتر من 1500 كتاب صوتي علي موقع اقرألي والتطبيق علي اندرويد وios 
              تقدر تسمع من مكتبة اقرألي الصوتية المتنوعة مجاناً وعشان تعيش معانا التجربة كاملة 
              اسمع أي كتاب باشتراك شهري أو سنوي مع اقرألي بلس
            </p>
            <button className="cta-button">ابدأ رحلتك الأن</button>
            
            <div className="service-cards">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-book-reader"></i>
                </div>
                <h4>مكتبة متنوعة</h4>
                <p>أكثر من 1500 كتاب صوتي متنوع في جميع المجالات</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h4>استمع في أي وقت</h4>
                <p>استمع للكتب الصوتية في أي وقت وأي مكان عبر التطبيق</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-headphones"></i>
                </div>
                <h4>جودة صوت عالية</h4>
                <p>استمتع بجودة صوت عالية وأداء احترافي للقراء</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Audiobooks */}
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h6 className="section-subtitle">أحدث الكتب</h6>
              <h3 className="section-title">استكشف أحدث الكتب الصوتية</h3>
            </div>
            <div className="featured-container">
              <FeaturedAudiobooks />
            </div>
          </div>
        </section>
        
        {/* Subscription Section */}
        <section className="subscription-section">
          <div className="container">
            <div className="subscription-content">
              <h2 className="subscription-title">انضم إلى ثورة الكتب الصوتية مع اقرألي</h2>
              <h3 className="subscription-subtitle">اختر من بين أكثر من ١٠٠٠كتاب صوتي!</h3>
              <p className="subscription-description">
                تمتع بتجربة فريدة ومميزة مع اقرألي بلس تشكيلة غنية من الكتب الصوتية، 
                مكتبة تحتوي علي +١٠٠٠كتاب و يزدادون إسبوعياً،استمع لها في أي وقت وأي مكان
              </p>
              <div className="subscription-plans">
                <div className="plan">
                  <h4 className="plan-title">اشتراك شهري</h4>
                  <div className="plan-price">100 ج.م</div>
                  <ul className="plan-features">
                    <li>الوصول لكافة الكتب الصوتية</li>
                    <li>استمع بدون إنترنت</li>
                    <li>دعم فني على مدار الساعة</li>
                  </ul>
                  <button className="plan-button">اشترك الآن</button>
                </div>
                <div className="plan featured-plan">
                  <div className="plan-badge">الأكثر توفيراً</div>
                  <h4 className="plan-title">اشتراك سنوي</h4>
                  <div className="plan-price">1500 ج.م </div>
                  <div className="plan-savings">وفر 20%</div>
                  <ul className="plan-features">
                    <li>الوصول لكافة الكتب الصوتية</li>
                    <li>استمع بدون إنترنت</li>
                    <li>دعم فني على مدار الساعة</li>
                    <li>تحديثات أسبوعية</li>
                  </ul>
                  <button className="plan-button">اشترك الآن</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* App Download Section */}
        <section className="app-download-section">
          <div className="container">
            <div className="app-download-content">
              <div className="app-text">
                <h3 className="section-title">حمل تطبيق اقرألي الآن</h3>
                <p>استمع إلى كتبك المفضلة في أي وقت وأي مكان</p>
                <div className="app-buttons">
                  <a href="#" className="app-button">
                    <div style={{ background: '#000', color: 'white', padding: '10px 20px', borderRadius: '8px', textAlign: 'center' }}>App Store</div>
                  </a>
                  <a href="#" className="app-button">
                    <div style={{ background: '#0F9D58', color: 'white', padding: '10px 20px', borderRadius: '8px', textAlign: 'center' }}>Google Play</div>
                  </a>
                </div>
              </div>
              <div className="app-image">
                <div style={{ height: '400px', background: '#8e44ad', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>تطبيق اقرألي</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                <div style={{ color: '#8e44ad', fontSize: '2rem', fontWeight: 'bold' }}>اقرألي</div>
              </div>
              <div className="footer-links">
                <div className="footer-links-column">
                  <h5>روابط سريعة</h5>
                  <ul>
                    <li><a href="#">الرئيسية</a></li>
                    <li><a href="#">قسم المساعدة</a></li>
                    <li><a href="#">شركاء</a></li>
                    <li><a href="#">سياسة الخصوصية</a></li>
                    <li><a href="#">الشروط والأحكام</a></li>
                  </ul>
                </div>
                <div className="footer-links-column">
                  <h5>تابعنا على</h5>
                  <div className="social-links">
                    <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
                <div className="footer-links-column">
                  <h5>جرّب التطبيق</h5>
                  <div className="app-links">
                    <a href="#"><div style={{ background: '#000', color: 'white', padding: '5px 10px', borderRadius: '5px', textAlign: 'center', fontSize: '0.8rem', marginBottom: '5px' }}>App Store</div></a>
                    <a href="#"><div style={{ background: '#0F9D58', color: 'white', padding: '5px 10px', borderRadius: '5px', textAlign: 'center', fontSize: '0.8rem' }}>Google Play</div></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="copyright">كل الحقوق محفوظة. © 2025</p>
            </div>
          </div>
        </footer>
        
        {showFullPlayer && <Player onClose={() => setShowFullPlayer(false)} />}
        <MiniPlayer onExpand={() => setShowFullPlayer(true)} />
      </div>
    </AudioPlayerProvider>
  );
}

const FeaturedAudiobooks = () => {
  const { audiobooks, loading, error, loadTrack } = useAudioPlayer();
  
  if (loading) return <FeaturedSkeleton />;
  if (error) return null;
  if (!audiobooks || audiobooks.length === 0) return null;
  
  // Take the first 4 audiobooks as featured
  const featuredBooks = audiobooks.slice(0, 4);
  
  return (
    <div className="audiobook-list">
      {featuredBooks.map(book => (
        <div 
          key={book._id} 
          className="audiobook-item"
          onClick={() => loadTrack(book)}
        >
          <div 
            className="audiobook-cover" 
            style={{ 
              backgroundImage: book.cover_url ? `url(${book.cover_url})` : 'linear-gradient(45deg, #8e44ad, #e67e22)'
            }}
          >
            <div className="audiobook-overlay">
              <button className="play-btn">
                <i className="material-icons">play_arrow</i>
              </button>
            </div>
          </div>
          <div className="audiobook-info">
            <h3 className="audiobook-title">{book.title}</h3>
            <p className="audiobook-author">بقلم {book.author}</p>
          </div>
          <div className="audiobook-actions">
            <button 
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                loadTrack(book);
              }}
            >
              استمع الآن
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const FeaturedSkeleton = () => {
  return (
    <div className="audiobook-list">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="loading-skeleton"></div>
      ))}
    </div>
  );
};

const AudiobookList = () => {
  const { audiobooks, loading, error, loadTrack, currentTrack } = useAudioPlayer();

  if (loading) return <AudiobookSkeleton />;
  if (error) return <div className="error-message">Error loading audiobooks: {error}</div>;
  if (!audiobooks || audiobooks.length === 0) return <div className="empty-message">No audiobooks available.</div>;

  return (
    <div className="audiobook-list">
      {audiobooks.map(book => (
        <div 
          key={book._id} 
          className={`audiobook-item ${currentTrack && currentTrack._id === book._id ? 'active' : ''}`}
        >
          <div 
            className="audiobook-cover" 
            style={{ 
              backgroundImage: book.cover_url ? `url(${book.cover_url})` : 'linear-gradient(45deg, #6200ee, #03dac6)'
            }}
          >
            <div className="audiobook-overlay">
              <button 
                className="play-btn"
                onClick={() => loadTrack(book)}
              >
                <i className="material-icons">play_arrow</i>
              </button>
            </div>
          </div>
          <div className="audiobook-info">
            <h3 className="audiobook-title">{book.title}</h3>
            <p className="audiobook-author">By {book.author}</p>
          </div>
          <div className="audiobook-actions">
            <button 
              className="btn"
              onClick={() => loadTrack(book)}
            >
              Listen Now
            </button>
            <button className="btn-icon">
              <i className="material-icons">favorite_border</i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AudiobookSkeleton = () => {
  return (
    <div className="audiobook-list">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="loading-skeleton"></div>
      ))}
    </div>
  );
};

export default App;