const express = require('express');
const router = express.Router();
const { 
  addRating, 
  getRatings, 
  getUserRating 
} = require('../controllers/ratingController');
const { authenticate } = require('../middleware/auth');

  
router.post('/', authenticate, addRating);

  
router.get('/:audiobook_id', getRatings);

  
router.get('/:audiobook_id/user', authenticate, getUserRating);

module.exports = router; 