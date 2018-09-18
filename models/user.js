'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['staff', 'student'],
    default: 'student'
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  country: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
