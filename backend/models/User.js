const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // --- We removed 'name' and changed 'email' to 'username' ---
  username: {
    type: String,
    required: true,
    unique: true, // No two users can have the same username
  },
  password: {
    type: String,
    required: true, // This will be the "hashed" password
  },
  role: {
    type: String,
    enum: ['student', 'teacher'], 
    required: true,
  },
  committee: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);