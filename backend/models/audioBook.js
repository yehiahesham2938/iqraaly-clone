const mongoose = require('mongoose');

const AudiobookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  file_url: { type: String, required: true },
  duration: Number,
  category: String,
  comments: String,
  cover: String,            
  rating: Number,             
  reviews: Number 
}, { timestamps: true });

module.exports = mongoose.model('audioBook', AudiobookSchema);
