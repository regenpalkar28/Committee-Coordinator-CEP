const Fund = require('../models/Fund');

// @desc    Get the fund data for the logged-in user's committee
// @route   GET /api/funds/my-committee
// @access  Private (Student or Teacher)
const getMyCommitteeFund = async (req, res) => {
  try {
    // 1. Find or create the Fund document for this user's committee
    const fund = await Fund.findOrCreate(req.user.committee);
    
    // 2. Send it back
    res.json(fund);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getMyCommitteeFund,
};