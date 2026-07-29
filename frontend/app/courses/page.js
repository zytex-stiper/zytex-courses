'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '../../lib/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/courses')
      .then(res => setCourses(res.data.courses || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">All Courses</h1>
      <p className="text-gray-600 mb-10">Apne career ke liye perfect course choose karo</p>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <Link key={course._id} href={`/course/${course.slug}`} className="card group">
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/400x225'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {course.price === 0 && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    FREE
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded">{course.level}</span>
                  <span>{course.category}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-600">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{course.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-primary-700">
                    {course.price === 0 ? 'Free' : `₹${course.price}`}
                  </span>
                  <span className="text-sm text-gray-500">{course.lessons?.length || 0} lessons</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
