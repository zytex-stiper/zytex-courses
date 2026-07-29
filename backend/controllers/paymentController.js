const Payment = require('../models/Payment');
const Course = require('../models/Course');
const User = require('../models/User');

// Student creates a pending payment after seeing QR
exports.createPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course nahi mila' });
    }
    if (course.price === 0) {
      return res.status(400).json({ success: false, message: 'Yeh free course hai' });
    }

    // Check if already enrolled
    const already = req.user.enrolledCourses.find(
      e => e.course.toString() === courseId
    );
    if (already) {
      return res.status(400).json({ success: false, message: 'Already enrolled ho' });
    }

    // Check existing pending
    const existing = await Payment.findOne({
      user: req.user._id,
      course: courseId,
      status: 'pending'
    });
    if (existing) {
      return res.json({
        success: true,
        message: 'Pending payment already hai',
        payment: existing,
        upiId: '7379126375@fam',
        qrImage: '/upi-qr.png'
      });
    }

    const payment = await Payment.create({
      user: req.user._id,
      course: courseId,
      amount: course.price,
      upiId: '7379126375@fam'
    });

    res.status(201).json({
      success: true,
      message: 'Ab QR scan karke payment karo',
      payment,
      upiId: '7379126375@fam',
      qrImage: '/upi-qr.png'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student submits UPI Transaction ID
exports.submitTxnId = async (req, res) => {
  try {
    const { paymentId, upiTxnId } = req.body;
    if (!upiTxnId || upiTxnId.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Valid UPI Transaction ID daalo' });
    }

    const payment = await Payment.findOne({
      _id: paymentId,
      user: req.user._id,
      status: 'pending'
    });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment nahi mila' });
    }

    payment.upiTxnId = upiTxnId.trim();
    await payment.save();

    res.json({
      success: true,
      message: 'Transaction ID submit ho gaya! Admin verify karega. 1-2 ghante me unlock ho jayega.',
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin verifies payment → enroll student
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, status, notes } = req.body; // status = verified | rejected

    const payment = await Payment.findById(paymentId).populate('user course');
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment nahi mila' });
    }

    payment.status = status;
    payment.notes = notes || '';
    payment.verifiedBy = req.user._id;
    payment.verifiedAt = new Date();
    await payment.save();

    if (status === 'verified') {
      // Enroll the student
      const user = await User.findById(payment.user._id);
      const already = user.enrolledCourses.find(
        e => e.course.toString() === payment.course._id.toString()
      );
      if (!already) {
        user.enrolledCourses.push({
          course: payment.course._id,
          progress: 0,
          completedLessons: []
        });
        await user.save();

        await Course.findByIdAndUpdate(payment.course._id, {
          $inc: { enrolledCount: 1 }
        });
      }
    }

    res.json({
      success: true,
      message: status === 'verified' ? 'Payment verified! Student enroll ho gaya.' : 'Payment rejected.',
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('course', 'title slug thumbnail price')
      .sort('-createdAt');
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('course', 'title price')
      .sort('-createdAt');
    res.json({ success: true, count: payments.length, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
