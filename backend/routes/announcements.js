const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, isTeacher } = require('../middleware/authMiddleware');

router.get('/', getAnnouncements);                              // public
router.post('/', protect, isTeacher, createAnnouncement);       // teacher only
router.delete('/:id', protect, isTeacher, deleteAnnouncement);  // teacher only

module.exports = router;
