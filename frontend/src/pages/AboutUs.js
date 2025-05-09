import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
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
            <Link to="/books" className="navbar-link">الكتب</Link>
            <Link to="/categories" className="navbar-link">التصنيفات</Link>
            <Link to="/about" className="navbar-link active">من نحن</Link>
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
          <Link to="/books" className="navbar-link">الكتب</Link>
          <Link to="/categories" className="navbar-link">التصنيفات</Link>
          <Link to="/about" className="navbar-link active">من نحن</Link>
          
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

      {/* About Us Content */}
      <div className="about-us-container">
        <div className="about-hero">
          <h1>من نحن؟</h1>
          <h2>احصل على نظرة خاصة وحصرية عن منصتنا</h2>
        </div>

        <div className="about-section">
          <div className="mission-section">
            <h3>مهمتنا</h3>
            <p>
              نحن نسعى لتوفير تجربة استماع مميزة للكتب الصوتية، حيث يمكنك الاستماع إلى أي كتاب في أي وقت وأي مكان،
              مما يتيح لك الاستفادة القصوى من وقتك بشكل فعال ومريح.
            </p>
          </div>
           

          <div className="team-section">
            <h3>فريقنا</h3>
            <div className="team-grid">
              {/* Add team members here */}
              <div className="team-member">
                <div className="member-image"></div>
                <h4> محمد فؤاد</h4>
                <p> فريق المحتوى الإبداعي, كاتب ومحرر صوتي</p>
              </div>
              <div className="team-member">
                <div className="member-image"></div>
                <h4> أحمد مصطفى</h4>
                <p>  فريق التطوير التقني, مطور برمجيات رئيسي</p>
              </div>
              <div className="team-member">
                <div className="member-image"></div>
                <h4> سارة عبد الله</h4>
                <p>  فريق التسويق والإعلام, مسؤولة التسويق الرقمي</p>
              </div>
            </div>
          </div>

          <div className="publish-section">
            <h3>انشر كتبك وأعطِ قصتك فرصة</h3>
            <p>
              هل تريد أن تصل أعمالك إلى قلوب وعقول المستمعين؟ انضم إلينا لتحويل كتبك إلى تجارب صوتية ساحرة تلامس الأرواح.
              مع منصتنا، ستحصل على فرصة للوصول إلى الملايين من المستمعين في جميع أنحاء العالم ومشاركة وجهة نظرك الفريدة.
            </p>
            <div className="contact-form">
              <form>
                <input type="text" placeholder="اسم المؤلف" />
                <input type="email" placeholder="البريد الإلكتروني" />
                <input type="tel" placeholder="رقم الهاتف" />
                <input type="text" placeholder="اسم الكتاب" />
                <button type="submit">إرسال</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 