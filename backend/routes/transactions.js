const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getStudentTransactions,
  getCommitteeTransactions, // --- 1. ADD THIS ---
  updateTransactionStatus,  // --- 2. ADD THIS ---
} = require('../controllers/transactionController');
// --- 3. Import "isTeacher" ---
const { protect, isTeacher } = require('../middleware/authMiddleware');

// --- Student Routes ---
router.post('/', protect, createTransaction);
router.get('/my-transactions', protect, getStudentTransactions);

// --- Teacher Routes ---
// To get transactions, you must be logged in (protect) AND be a teacher (isTeacher)
router.get('/committee', protect, isTeacher, getCommitteeTransactions);

// To update a transaction, you must be logged in AND be a teacher
router.put('/:id/status', protect, isTeacher, updateTransactionStatus);

module.exports = router;