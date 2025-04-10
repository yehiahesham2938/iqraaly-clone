const express = require('express');
const router = express.Router();
const { 
  addAudiobook, 
  getAllAudiobooks, 
  getAudiobook 
} = require('../controllers/contentController');

const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getAllAudiobooks);
router.get('/:id', getAudiobook);


router.post('/', authenticate, authorize('admin'), addAudiobook);

module.exports = router;