const express = require('express');
const router = express.Router();
const {
  createSponsorship,
  getStudentSponsorships,
  getCommitteeSponsorships,
  updateSponsorshipStatus,
} = require('../controllers/sponsorshipController');
const { protect, isTeacher } = require('../middleware/authMiddleware');

// --- Student Routes ---
router.post('/', protect, createSponsorship);
router.get('/my-sponsorships', protect, getStudentSponsorships);

// --- Teacher Routes ---
router.get('/committee', protect, isTeacher, getCommitteeSponsorships);
router.put('/:id/status', protect, isTeacher, updateSponsorshipStatus);

module.exports = router;