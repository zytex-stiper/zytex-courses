const Course = require('../models/Course');
const User = require('../models/User');
const Payment = require('../models/Payment');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'name')
      .select('-lessons.videoUrl')
      .sort('-createdAt');
    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isPublished: true })
      .populate('instructor', 'name email avatar');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course nahi mila' });
    }

    // Hide full video URLs for non-enrolled users (except preview lessons)
    let isEnrolled = false;
    if (req.user) {
      isEnrolled = req.user.enrolledCourses.some(
        e => e.course.toString() === course._id.toString()
      );
    }

    const courseObj = course.toObject();
    if (!isEnrolled && course.price > 0) {
      courseObj.lessons = courseObj.lessons.map(l => ({
        ...l,
        videoUrl: l.isPreview ? l.videoUrl : null
      }));
    }

    res.json({ success: true, course: courseObj, isEnrolled });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    req.body.instructor = req.user._id;
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, message: 'Course ban gaya!', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course nahi mila' });
    }

    // Only owner or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, message: 'Course update ho gaya', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.enrollFree = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course nahi mila' });
    }

    if (course.price > 0) {
      return res.status(400).json({ success: false, message: 'Yeh paid course hai. Payment karo pehle.' });
    }

    const already = req.user.enrolledCourses.find(
      e => e.course.toString() === course._id.toString()
    );
    if (already) {
      return res.status(400).json({ success: false, message: 'Already enrolled ho' });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        enrolledCourses: {
          course: course._id,
          progress: 0,
          completedLessons: []
        }
      }
    });

    course.enrolledCount += 1;
    await course.save();

    res.json({ success: true, message: 'Free course me enroll ho gaya! Shuru karo 🚀' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, progress } = req.body;
    const user = await User.findById(req.user._id);

    const enrollment = user.enrolledCourses.find(
      e => e.course.toString() === courseId
    );

    if (!enrollment) {
      return res.status(400).json({ success: false, message: 'Pehle enroll karo' });
    }

    if (lessonId && !enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    if (typeof progress === 'number') {
      enrollment.progress = Math.min(100, Math.max(0, progress));
    }
    enrollment.lastWatched = new Date();

    await user.save();
    res.json({ success: true, message: 'Progress update ho gaya', progress: enrollment.progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
