const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
});

module.exports = mongoose.model.user || mongoose.model('User', userSchema);
