import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookReview.css';

const BookReview = ({ bookId, initialRating = 0, initialReview = '', onSubmit, isAuthenticated }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (value) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!rating) {
      alert('الرجاء اختيار تقييم');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        bookId,
        rating,
        review
      });
      setReview('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('حدث خطأ أثناء إرسال التقييم');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    const displayRating = hoveredRating || rating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`star-btn ${i <= displayRating ? 'active' : ''}`}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleRatingHover(i)}
          onMouseLeave={handleRatingLeave}
          aria-label={`تقييم ${i} نجوم`}
        >
          <i className="fas fa-star"></i>
        </button>
      );
    }

    return stars;
  };

  return (
    <div className="book-review">
      <h4 className="review-title">أضف تقييمك</h4>
      <form onSubmit={handleSubmit}>
        <div className="rating-container">
          <div className="stars-container">
            {renderStars()}
          </div>
          <span className="rating-value">
            {rating ? `${rating} نجوم` : 'اختر تقييمك'}
          </span>
        </div>
        
        <div className="review-input-container">
          <textarea
            className="review-input"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="اكتب تقييمك هنا..."
            rows="4"
            maxLength="500"
          />
          <span className="char-count">
            {review.length}/500
          </span>
        </div>

        <button
          type="submit"
          className="submit-review-btn"
          disabled={isSubmitting || !rating}
        >
          {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
        </button>
      </form>
    </div>
  );
};

export default BookReview; 