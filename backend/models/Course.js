const mongoose = require('mongoose');
const slugify = require('slugify');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0 // in seconds
  },
  order: {
    type: Number,
    default: 0
  },
  isPreview: {
    type: Boolean,
    default: false
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  thumbnail: {
    type: String,
    default: '/default-course.jpg'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: 'General'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  lessons: [lessonSchema],
  metaTitle: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  enrolledCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

courseSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.lessons && this.lessons.length > 0) {
    this.totalDuration = this.lessons.reduce((acc, l) => acc + (l.duration || 0), 0);
  }
  if (!this.metaTitle) {
    this.metaTitle = `${this.title} | Zytex Courses`;
  }
  if (!this.metaDescription) {
    this.metaDescription = this.shortDescription;
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
