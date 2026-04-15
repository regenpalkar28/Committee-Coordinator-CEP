const express = require('express');
const router = express.Router();
const { getMyCommitteeFund } = require('../controllers/fundController');
const { protect } = require('../middleware/authMiddleware');
router.get('/my-committee', protect, getMyCommitteeFund);
module.exports = router;
