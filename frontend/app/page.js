'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '../lib/api';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/courses')
      .then(res => setCourses(res.data.courses || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Skills Seekho.<br />
            <span className="text-yellow-300">Career Badhao.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10">
            Zytex Courses pe quality online learning milta hai – simple Hinglish me.
            Practical projects, real skills, affordable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="bg-white text-primary-700 font-bold py-3.5 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg">
              Explore Courses
            </Link>
            <Link href="/auth/signup" className="border-2 border-white text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition">
              Free me Join Karo
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
          <p className="text-gray-600 mt-2">Students ke favourite courses</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading courses...</div>
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
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600">
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

        <div className="text-center mt-12">
          <Link href="/courses" className="btn-primary">
            Saare Courses Dekho →
          </Link>
        </div>
      </section>

      {/* Why Zytex */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Kyun choose karein Zytex?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Hinglish me Padhao', desc: 'Simple language me concepts samjhao – koi confusion nahi.' },
              { title: 'Practical Projects', desc: 'Theory nahi, real projects banake seekho.' },
              { title: 'Affordable Price', desc: 'Quality education jo pocket-friendly ho.' }
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
