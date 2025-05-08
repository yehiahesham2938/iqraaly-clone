import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
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
    </div>
  );
};

export default Home; 