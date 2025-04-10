const mongoose = require('mongoose');

const AudiobookSchema = new mongoose.Schema({
  title: { type: String,  required: true},
  author: { type: String,required: true},
  description: String,
  file_url: {type: String,required: true  },
  duration: Number,  
  category: String,
  ratings: [{user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'},
    rating: { type: Number, min: 1, max: 5}
  }]
}, { timestamps: true });

module.exports = mongoose.model('audioBook', AudiobookSchema);