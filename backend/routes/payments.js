const express = require('express');
const router = express.Router();
const {
  createPayment,
  submitTxnId,
  verifyPayment,
  getMyPayments,
  getAllPayments
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/create', protect, createPayment);
router.post('/submit-txn', protect, submitTxnId);
router.get('/my', protect, getMyPayments);

// Admin only
router.get('/all', protect, authorize('admin'), getAllPayments);
router.post('/verify', protect, authorize('admin'), verifyPayment);

module.exports = router;
