import React, { useState, useEffect } from 'react';
import './BookReview.css';

const BookReview = ({ bookId, isAuthenticated }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [allRatings, setAllRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [error, setError] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchRatings();
    if (isAuthenticated) {
      fetchUserRating();
    }
  }, [bookId, isAuthenticated]);

  const fetchRatings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ratings/${bookId}`);
      const data = await response.json();
      if (data.success) {
        setAllRatings(data.ratings);
        setAverageRating(data.averageRating);
        setTotalRatings(data.totalRatings);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ratings/${bookId}/user`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success && data.rating) {
        setUserRating(data.rating);
        setRating(data.rating.rating);
        setComment(data.rating.comment || '');
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login to submit a rating');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          audiobook_id: bookId,
          rating,
          comment
        })
      });

      const data = await response.json();
      if (data.success) {
        setUserRating(data.rating);
        setAverageRating(data.averageRating);
        setTotalRatings(data.totalRatings);
        setError(null);
        fetchRatings();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to submit rating');
      console.error('Error submitting rating:', error);
    }
  };

  
  const renderAverageStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= value ? 'active' : ''}`}
        />
      );
    }
    return stars;
  };

  
  const renderUserRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= (hoverRating || rating) ? 'active' : ''} interactive`}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="book-review">
      <div className="rating-summary">
        <div className="average-rating">
          <span className="rating-value">{averageRating}</span>
          <div className="stars">{renderAverageStars(Math.round(averageRating))}</div>
          <span className="total-ratings">({totalRatings} تقييم)</span>
        </div>
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="rating-form">
          <div className="rating-input">
            <label>تقييمك:</label>
            <div className="stars user-rating-stars">
              {renderUserRatingStars()}
            </div>
          </div>
          <div className="comment-input">
            <label>تعليقك:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              rows="3"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            {userRating ? 'تحديث التقييم' : 'إرسال التقييم'}
          </button>
        </form>
      ) : (
        <div className="login-prompt">
          <p>يرجى تسجيل الدخول لإضافة تقييم</p>
        </div>
      )}

      <div className="ratings-list">
        <h4>التقييمات الأخيرة</h4>
        {allRatings.map((rating) => (
          <div key={rating._id} className="rating-item">
            <div className="rating-header">
              <span className="username">{rating.user_id.username}</span>
              <div className="stars">{renderAverageStars(rating.rating)}</div>
            </div>
            {rating.comment && <p className="comment">{rating.comment}</p>}
            <span className="date">{new Date(rating.createdAt).toLocaleDateString('ar-SA')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReview; 