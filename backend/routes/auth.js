const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user (for us, the admins)
// @access  Public (for now, can be protected later)
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login a user & get a token
// @access  Public
router.post('/login', loginUser);

module.exports = router;