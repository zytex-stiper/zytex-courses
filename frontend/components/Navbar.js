'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUser, logout, isLoggedIn } from '../lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-700">Zytex</span>
            <span className="text-sm text-gray-500 font-medium">Courses</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-primary-600 font-medium">
              All Courses
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">
                My Learning
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-gray-600 hover:text-primary-600 font-medium">
                Admin Panel
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Hi, {user.name.split(' ')[0]} 👋
                </span>
                <button onClick={handleLogout} className="btn-outline text-sm py-1.5 px-3">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-primary-600 font-medium hover:underline">
                  Login
                </Link>
                <Link href="/auth/signup" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
