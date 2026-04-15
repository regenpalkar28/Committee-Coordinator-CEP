const Fund = require('../models/Fund');
const getMyCommitteeFund = async (req, res) => {
  try {
    const fund = await Fund.findOrCreate(req.user.committee);
    res.json(fund);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = {
  getMyCommitteeFund,
};
