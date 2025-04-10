const express = require('express');
const router = express.Router();
const { 
    register, 
  login, 
  getProfile 
} = require('../controllers/AuthController');
const { authenticate } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);

module.exports = router;