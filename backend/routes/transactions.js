const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getStudentTransactions,
  getCommitteeTransactions,
  updateTransactionStatus,
} = require('../controllers/transactionController');
const { protect, isTeacher } = require('../middleware/authMiddleware');
router.post('/', protect, createTransaction);
router.get('/my-transactions', protect, getStudentTransactions);
router.get('/committee', protect, isTeacher, getCommitteeTransactions);
router.put('/:id/status', protect, isTeacher, updateTransactionStatus);
module.exports = router;
