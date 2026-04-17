const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, isTeacher } = require('../middleware/authMiddleware');

router.get('/', getAnnouncements);
router.post('/', protect, isTeacher, createAnnouncement);
router.delete('/:id', protect, isTeacher, deleteAnnouncement);

module.exports = router;
