const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  enrollFree,
  updateProgress
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

// Public
router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);

// Protected
router.post('/', protect, authorize('admin', 'instructor'), createCourse);
router.put('/:id', protect, authorize('admin', 'instructor'), updateCourse);
router.post('/:id/enroll', protect, enrollFree);
router.post('/progress', protect, updateProgress);

module.exports = router;
