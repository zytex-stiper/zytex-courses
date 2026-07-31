'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '../../../lib/api';
import { setAuth } from '../../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      setAuth(res.data.token, res.data.user);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Access denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 matrix-bg">
      <div className="w-full max-w-md">
        <div className="terminal p-8 relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-hack-green via-hack-cyan to-transparent"></div>
          
          <div className="terminal-header mb-6">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-hack-green"></div>
            <span className="text-xs text-hack-muted ml-2">auth_login.exe</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">
            <span className="text-hack-green">&gt;</span> ACCESS_SYSTEM
          </h1>
          <p className="text-hack-muted text-sm mb-8">Zytex Courses me login karo</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded mb-5 text-sm font-mono">
              ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-hack-cyan tracking-wider mb-1.5">EMAIL</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full"
                placeholder="user@zytex.com"
              />
            </div>
            <div>
              <label className="block text-xs text-hack-cyan tracking-wider mb-1.5">PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="btn-filled w-full py-3 mt-2"
            >
              {loading ? 'AUTHENTICATING...' : 'LOGIN →'}
            </button>
          </form>

          <p className="text-center text-sm text-hack-muted mt-6">
            Account nahi hai?{' '}
            <Link href="/auth/signup" className="text-hack-green hover:text-glow">
              SIGN_UP
            </Link>
          </p>

          <div className="mt-6 p-3 bg-black/50 border border-hack-border rounded text-xs text-hack-muted font-mono">
            <p className="text-hack-green mb-1">// DEMO_ACCESS</p>
            <p>student@zytex.com / student123</p>
            <p>admin@zytex.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
