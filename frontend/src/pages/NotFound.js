import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>الصفحة غير موجودة</h2>
        <p>عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <Link to="/" className="home-button">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 