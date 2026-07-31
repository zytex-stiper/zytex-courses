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
    <div className="max-w-7xl mx-auto px-4 py-16 matrix-bg">
      <div className="mb-12">
        <p className="text-hack-cyan text-xs tracking-widest mb-2">// ALL_MODULES</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Available <span className="text-hack-green text-glow">Courses</span>
        </h1>
        <p className="text-hack-muted mt-3 text-sm">
          Apne career ke liye perfect module choose karo
        </p>
      </div>

      {loading ? (
        <div className="text-center py-24">
          <p className="text-hack-green animate-pulse font-mono">scanning modules...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <Link 
              key={course._id} 
              href={`/course/${course.slug}`} 
              className="card group hover:shadow-neon-green transition-all duration-500"
            >
              <div className="aspect-video bg-black relative overflow-hidden">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/400x225/0a0a0a/00ff9d?text=ZYTEX'}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                {course.price === 0 && (
                  <span className="absolute top-3 left-3 bg-hack-green text-black text-xs font-bold px-2.5 py-1 rounded tracking-wider">
                    FREE
                  </span>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs mb-3">
                  <span className="text-hack-cyan border border-hack-cyan/40 px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                  <span className="text-hack-muted">{course.category}</span>
                </div>
                <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-hack-green transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-hack-muted line-clamp-2 mb-4">
                  {course.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-hack-green">
                    {course.price === 0 ? 'FREE' : `₹${course.price}`}
                  </span>
                  <span className="text-xs text-hack-muted group-hover:text-hack-cyan">
                    {course.lessons?.length || 0} lessons →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
