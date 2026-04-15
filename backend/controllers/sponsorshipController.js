const Sponsorship = require('../models/Sponsorship');
const Fund = require('../models/Fund');
const createSponsorship = async (req, res) => {
  try {
    const {
      companyName, companyOrigin, description, documentLink,
      amountPledged, contactPerson, contactEmail
    } = req.body;
    const sponsorship = new Sponsorship({
      companyName, companyOrigin, description, documentLink,
      amountPledged: parseFloat(amountPledged),
      contactPerson, contactEmail,
      user: req.user._id,
      committee: req.user.committee,
    });
    const createdSponsorship = await sponsorship.save();
    res.status(201).json(createdSponsorship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getStudentSponsorships = async (req, res) => {
  try {
    const sponsorships = await Sponsorship.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(sponsorships);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
const getCommitteeSponsorships = async (req, res) => {
  try {
    const sponsorships = await Sponsorship.find({ committee: req.user.committee })
      .sort({ createdAt: -1 })
      .populate('user', 'username');
    res.json(sponsorships);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
const updateSponsorshipStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const sponsorship = await Sponsorship.findById(req.params.id);
    if (!sponsorship) {
      return res.status(404).json({ message: 'Sponsorship not found' });
    }
    if (sponsorship.committee !== req.user.committee) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const wasPending = sponsorship.status === 'pending';
    sponsorship.status = status;
    const updatedSponsorship = await sponsorship.save();
    if (wasPending && status === 'confirmed') {
      const fund = await Fund.findOrCreate(req.user.committee);
      fund.totalFunds += sponsorship.amountPledged;
      await fund.save();
    }
    res.json(updatedSponsorship);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
module.exports = {
  createSponsorship,
  getStudentSponsorships,
  getCommitteeSponsorships,
  updateSponsorshipStatus,
};
