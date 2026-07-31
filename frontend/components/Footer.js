export default function Footer() {
  return (
    <footer className="bg-black border-t border-hack-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-hack-green text-xl font-bold tracking-widest mb-4 text-glow">
              &gt;_ZYTEX
            </h3>
            <p className="text-sm text-hack-muted leading-relaxed">
              Quality online courses in Hinglish.<br />
              Skills seekho. Career badhao.<br />
              <span className="text-hack-green">System online.</span>
            </p>
          </div>
          
          <div>
            <h4 className="text-hack-cyan font-semibold mb-4 tracking-wider text-sm">// QUICK_LINKS</h4>
            <ul className="space-y-2 text-sm text-hack-muted">
              <li><a href="/" className="hover:text-hack-green transition-colors">→ Home</a></li>
              <li><a href="/courses" className="hover:text-hack-green transition-colors">→ All Courses</a></li>
              <li><a href="/auth/login" className="hover:text-hack-green transition-colors">→ Login</a></li>
              <li><a href="/dashboard" className="hover:text-hack-green transition-colors">→ My Learning</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-hack-purple font-semibold mb-4 tracking-wider text-sm">// PAYMENT_NODE</h4>
            <p className="text-sm text-hack-muted mb-2">
              UPI_ID:
            </p>
            <p className="text-hack-green font-mono text-sm border border-hack-green/30 px-3 py-2 rounded inline-block">
              7379126375@fam
            </p>
            <p className="text-xs text-hack-muted mt-3">
              FamPay • GPay • PhonePe supported
            </p>
          </div>
        </div>
        
        <div className="border-t border-hack-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-hack-muted">
            © {new Date().getFullYear()} ZYTEX_COURSES // ALL_RIGHTS_RESERVED
          </p>
          <p className="text-xs text-hack-green/60">
            status: <span className="text-hack-green">ONLINE</span> ●
          </p>
        </div>
      </div>
    </footer>
  );
}
