const mongoose = require('mongoose');

const AudioBookRatingSchema = new mongoose.Schema({
  audiobook_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'audioBook',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  }
}, { timestamps: true });

// Create a compound index to ensure a user can only rate an audiobook once
AudioBookRatingSchema.index({ audiobook_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('audioBookRating', AudioBookRatingSchema); 