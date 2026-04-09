const Transaction = require('../models/Transaction');
const Fund = require('../models/Fund'); // <-- This will work now!

// --- createTransaction (Same as before) ---
const createTransaction = async (req, res) => {
  try {
    const { title, amount, category, description, receiptLink } = req.body;
    const transaction = new Transaction({
      title, amount: parseFloat(amount), category, description, receiptLink,
      user: req.user._id, committee: req.user.committee,
    });
    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// --- getStudentTransactions (Same as before) ---
const getStudentTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// --- getCommitteeTransactions (Same as before) ---
const getCommitteeTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ committee: req.user.committee })
      .sort({ createdAt: -1 })
      .populate('user', 'username');
    res.json(transactions);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};


// --- updateTransactionStatus (CRITICAL UPDATE) ---
const updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    if (transaction.committee !== req.user.committee) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const wasPending = transaction.status === 'pending';

    transaction.status = status;
    const updatedTransaction = await transaction.save();

    // --- "ADD UP" LOGIC ---
    if (wasPending && status === 'approved') {
      const fund = await Fund.findOrCreate(req.user.committee);
      fund.totalExpenses += transaction.amount;
      await fund.save();
    }
    // -----------------------

    res.json(updatedTransaction);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = {
  createTransaction,
  getStudentTransactions,
  getCommitteeTransactions,
  updateTransactionStatus,
};