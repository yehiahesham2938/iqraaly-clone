const express = require('express');
const router = express.Router();
const { 
  addRating, 
  getRatings, 
  getUserRating 
} = require('../controllers/ratingController');
const { authenticate } = require('../middleware/auth');

// Add or update rating (requires authentication)
router.post('/', authenticate, addRating);

// Get all ratings for an audiobook
router.get('/:audiobook_id', getRatings);

// Get user's rating for an audiobook (requires authentication)
router.get('/:audiobook_id/user', authenticate, getUserRating);

module.exports = router; 