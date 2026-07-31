'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '../lib/api';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Skills seekho. Career badhao. System hacked.';

  useEffect(() => {
    API.get('/courses')
      .then(res => setCourses(res.data.courses || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Typing animation
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="matrix-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#00ff9d11 1px, transparent 1px), linear-gradient(90deg, #00ff9d11 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="text-center">
            {/* Terminal badge */}
            <div className="inline-flex items-center gap-2 border border-hack-green/40 bg-black/60 px-4 py-1.5 rounded mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-hack-green rounded-full animate-pulse"></span>
              <span className="text-xs text-hack-green tracking-widest">SYSTEM ONLINE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">ZYTEX</span>{' '}
              <span className="text-hack-green text-glow">COURSES</span>
            </h1>

            <p className="text-hack-cyan text-lg md:text-xl max-w-2xl mx-auto mb-4 h-8 font-mono">
              {typedText}<span className="animate-pulse">_</span>
            </p>

            <p className="text-hack-muted max-w-xl mx-auto mb-12 text-sm md:text-base">
              Quality online learning in Hinglish. Practical projects. Real skills.  
              Affordable prices. Built for the next generation of builders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="btn-filled text-sm px-8 py-3.5 animate-float">
                EXPLORE_COURSES
              </Link>
              <Link href="/auth/signup" className="btn-primary text-sm px-8 py-3.5">
                JOIN_THE_SYSTEM
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hack-green to-transparent"></div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-hack-cyan text-xs tracking-widest mb-2">// FEATURED_MODULES</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Popular <span className="text-hack-green">Courses</span>
            </h2>
          </div>
          <Link href="/courses" className="hidden sm:inline-flex text-sm text-hack-muted hover:text-hack-green transition-colors">
            VIEW_ALL →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-hack-green animate-pulse font-mono">loading modules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <Link 
                key={course._id} 
                href={`/course/${course.slug}`} 
                className="card group hover:shadow-neon-green transition-all duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
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
                  
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <span className="text-xs text-hack-cyan border border-hack-cyan/40 px-2 py-0.5 rounded">
                      {course.level}
                    </span>
                    <span className="text-xs text-hack-muted">
                      {course.lessons?.length || 0} lessons
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-hack-green transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-hack-muted line-clamp-2 mb-4">
                    {course.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-hack-green text-lg">
                      {course.price === 0 ? 'FREE_ACCESS' : `₹${course.price}`}
                    </span>
                    <span className="text-xs text-hack-muted group-hover:text-hack-cyan transition-colors">
                      ENTER →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Why Zytex - Terminal style */}
      <section className="py-20 border-t border-hack-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-hack-purple text-xs tracking-widest mb-2">// WHY_ZYTEX</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              System <span className="text-hack-green">Advantages</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                code: '01', 
                title: 'HINGLISH_MODE', 
                desc: 'Simple language me concepts samjhao. Zero confusion. Maximum clarity.' 
              },
              { 
                code: '02', 
                title: 'PRACTICAL_BUILD', 
                desc: 'Theory nahi. Real projects banake seekho. Portfolio ready skills.' 
              },
              { 
                code: '03', 
                title: 'LOW_COST_NODE', 
                desc: 'Quality education jo pocket-friendly ho. High value, low price.' 
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="terminal group hover:border-hack-green/50 transition-all duration-300 hover:shadow-neon-green"
              >
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-hack-green"></div>
                  <span className="text-xs text-hack-muted ml-2">module_{item.code}.exe</span>
                </div>
                <h3 className="text-hack-green font-bold mb-2 tracking-wider group-hover:text-glow transition-all">
                  {item.title}
                </h3>
                <p className="text-sm text-hack-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="terminal p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hack-green via-hack-cyan to-hack-purple"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to <span className="text-hack-green text-glow">hack</span> your career?
            </h2>
            <p className="text-hack-muted mb-8 text-sm">
              Join Zytex Courses today. Start learning. Level up.
            </p>
            <Link href="/auth/signup" className="btn-filled px-10 py-3.5">
              INITIALIZE_ACCOUNT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
