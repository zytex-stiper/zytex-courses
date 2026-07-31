'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '../../lib/api';
import { getUser, isLoggedIn } from '../../lib/auth';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/auth/login');
      return;
    }
    API.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => router.push('/auth/login'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-32">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">My Learning</h1>
      <p className="text-gray-600 mb-10">Apna progress yahan dekhen 👋</p>

      {user.enrolledCourses?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border">
          <p className="text-gray-500 mb-6">Abhi koi course enroll nahi kiya</p>
          <Link href="/courses" className="btn-primary">
            Courses Explore Karo
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.enrolledCourses.map((enroll, idx) => (
            <div key={idx} className="card p-5">
              <img
                src={enroll.course?.thumbnail || 'https://via.placeholder.com/400x225'}
                alt={enroll.course?.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{enroll.course?.title}</h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{enroll.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-accent-500 h-2 rounded-full transition-all"
                    style={{ width: `${enroll.progress || 0}%` }}
                  />
                </div>
              </div>
              <Link
                href={`/course/${enroll.course?.slug}`}
                className="btn-primary w-full text-center block text-sm"
              >
                Continue Learning
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
