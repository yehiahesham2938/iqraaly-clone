const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user_id: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: {
    type: Number, min: 1, max: 5, required: true},
  comment: String,
  comments: String
}, { timestamps: true });

module.exports = mongoose.model('review', ReviewSchema);