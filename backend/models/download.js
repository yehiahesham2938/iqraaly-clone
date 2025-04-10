const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('download', DownloadSchema);