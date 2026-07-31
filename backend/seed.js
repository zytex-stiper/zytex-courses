const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zytex-courses');
    console.log('Connected to MongoDB');

    // Clear existing
    await User.deleteMany({});
    await Course.deleteMany({});

    // Create Admin
    const admin = await User.create({
      name: 'Zytex Admin',
      email: 'admin@zytex.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create Instructor
    const instructor = await User.create({
      name: 'Rahul Sharma',
      email: 'instructor@zytex.com',
      password: 'instructor123',
      role: 'instructor'
    });

    // Create Student
    const student = await User.create({
      name: 'Amit Kumar',
      email: 'student@zytex.com',
      password: 'student123',
      role: 'student'
    });

    // Sample Courses
    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: `Is course me aap zero se full-stack web development seekhoge.
        
HTML, CSS, JavaScript, React, Node.js, MongoDB – sab kuch practical projects ke saath.
        
Perfect for beginners jo coding career start karna chahte hain.`,
        shortDescription: 'HTML, CSS, JS, React, Node – zero se hero tak. Practical projects ke saath.',
        price: 999,
        category: 'Web Development',
        level: 'Beginner',
        instructor: instructor._id,
        isPublished: true,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        lessons: [
          { title: 'Introduction to Web Development', description: 'Course overview', duration: 600, order: 1, isPreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'HTML Basics', description: 'Tags, forms, semantic HTML', duration: 1200, order: 2, isPreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'CSS Flexbox & Grid', description: 'Modern layouts', duration: 1500, order: 3, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'JavaScript Fundamentals', description: 'Variables, loops, functions', duration: 1800, order: 4, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'React Crash Course', description: 'Components, hooks, state', duration: 2400, order: 5, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Node.js & Express', description: 'Backend basics', duration: 2100, order: 6, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'MongoDB & Mongoose', description: 'Database', duration: 1800, order: 7, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Final Project', description: 'Full stack app', duration: 3600, order: 8, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        title: 'Python for Beginners – Free',
        description: `Python bilkul zero se seekho – Hinglish me simple explanation.
        
Variables, loops, functions, lists, dictionaries, file handling aur mini projects.`,
        shortDescription: 'Python basics Hinglish me samjhao. Completely free!',
        price: 0,
        category: 'Programming',
        level: 'Beginner',
        instructor: instructor._id,
        isPublished: true,
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
        lessons: [
          { title: 'Python Install & Setup', description: 'Environment setup', duration: 480, order: 1, isPreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Variables & Data Types', description: 'Numbers, strings, booleans', duration: 900, order: 2, isPreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'If-Else & Loops', description: 'Control flow', duration: 1200, order: 3, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Functions & Modules', description: 'Reusable code', duration: 1100, order: 4, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Lists & Dictionaries', description: 'Data structures', duration: 1300, order: 5, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        title: 'Digital Marketing Mastery',
        description: `SEO, Google Ads, Facebook/Instagram Ads, Content Marketing aur Analytics.
        
Practical strategy jo aaj ke market me kaam karti hai.`,
        shortDescription: 'SEO, Ads, Instagram Growth – practical course for beginners.',
        price: 1499,
        category: 'Marketing',
        level: 'Intermediate',
        instructor: instructor._id,
        isPublished: true,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        lessons: [
          { title: 'Digital Marketing Overview', description: 'What is DM?', duration: 700, order: 1, isPreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'SEO Fundamentals', description: 'On-page & Off-page', duration: 1600, order: 2, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Google Ads Mastery', description: 'Search & Display campaigns', duration: 2000, order: 3, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Social Media Marketing', description: 'Instagram & Facebook', duration: 1800, order: 4, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Analytics & Optimization', description: 'Google Analytics', duration: 1400, order: 5, isPreview: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ];

    for (const c of courses) {
      await Course.create(c);
    }

    console.log('✅ Seed completed successfully!');
    console.log('--------------------------------');
    console.log('Admin    → admin@zytex.com / admin123');
    console.log('Instructor → instructor@zytex.com / instructor123');
    console.log('Student  → student@zytex.com / student123');
    console.log('--------------------------------');
    console.log('3 sample courses created (1 free + 2 paid)');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
