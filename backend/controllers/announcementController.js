const Announcement = require('../models/Announcement');

// POST /api/announcements — teacher creates announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, body } = req.body;
    const announcement = new Announcement({
      title,
      body,
      postedBy: req.user._id,
      committee: req.user.committee,
    });
    const created = await announcement.save();
    await created.populate('postedBy', 'username committee');
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server Error' });
  }
};

// GET /api/announcements — all users can read all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .populate('postedBy', 'username committee');
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE /api/announcements/:id — teacher deletes own announcement
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Not found' });
    if (announcement.committee !== req.user.committee) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await announcement.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createAnnouncement, getAnnouncements, deleteAnnouncement };
