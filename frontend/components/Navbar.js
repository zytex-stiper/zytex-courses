'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUser, logout } from '../lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-hack-green/30 shadow-neon-green' 
        : 'bg-black/70 backdrop-blur-sm border-hack-border'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-hack-green text-xl font-bold tracking-widest group-hover:text-glow transition-all">
              &gt;_ZYTEX
            </span>
            <span className="text-xs text-hack-muted hidden sm:inline border border-hack-border px-2 py-0.5 rounded">
              COURSES
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-hack-muted hover:text-hack-green transition-colors tracking-wide">
              HOME
            </Link>
            <Link href="/courses" className="text-sm text-hack-muted hover:text-hack-green transition-colors tracking-wide">
              COURSES
            </Link>
            {user && (
              <Link href="/dashboard" className="text-sm text-hack-muted hover:text-hack-cyan transition-colors tracking-wide">
                MY_LEARNING
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-sm text-hack-purple hover:text-hack-pink transition-colors tracking-wide">
                ADMIN
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-hack-green hidden sm:inline border border-hack-green/30 px-2 py-1 rounded">
                  {user.name.split(' ')[0]}@zytex
                </span>
                <button 
                  onClick={handleLogout} 
                  className="text-xs border border-hack-muted text-hack-muted hover:border-red-500 hover:text-red-400 px-3 py-1.5 rounded transition-all"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-hack-muted hover:text-hack-green transition-colors">
                  LOGIN
                </Link>
                <Link href="/auth/signup" className="btn-primary text-xs py-1.5 px-4">
                  SIGN_UP
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
