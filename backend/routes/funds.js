const express = require('express');
const router = express.Router();
const { getMyCommitteeFund } = require('../controllers/fundController');
const { protect } = require('../middleware/authMiddleware');

// This route is protected. You just need to be logged in.
router.get('/my-committee', protect, getMyCommitteeFund);

module.exports = router;