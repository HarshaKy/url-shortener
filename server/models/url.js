const mongoose = require('mongoose');

var Url = mongoose.model('Url', {
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  originalUrl: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  tags: {
    type: [String],
  },
  hashedUrl: {
    type: String,
    default: null
  },
  createdAt: {
    type: String,
    default: null
  }
});

module.exports = {Url};
