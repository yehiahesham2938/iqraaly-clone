import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subscription.css';

const Subscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    console.log('Form submitted:', formData);
    
    // Store premium status in localStorage
    localStorage.setItem('isPremium', 'true');
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <h3>🎉 تهانينا!</h3>
        <p>لقد أصبحت الآن مستخدم مميز في اقرألي</p>
        <p>يمكنك الآن الاستمتاع بجميع مميزات الاشتراك المميز</p>
      </div>
    `;
    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="subscription-page">
      <div className="container">
        <h1>اشترك في اقرألي بلس</h1>
        <div className="subscription-form-container">
          <form onSubmit={handleSubmit} className="subscription-form">
            <div className="form-group">
              <label htmlFor="fullName">الاسم الكامل</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">رقم البطاقة</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">تاريخ الانتهاء</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="subscription-summary">
              <h3>ملخص الاشتراك</h3>
              <div className="plan-details">
                <p>اشتراك سنوي - اقرألي بلس</p>
                <p className="price">1500 ج.م</p>
              </div>
            </div>

            <button type="submit" className="submit-button">
              تأكيد الاشتراك
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscription; 