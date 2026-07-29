export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-3">Zytex Courses</h3>
            <p className="text-sm leading-relaxed">
              Quality online courses in Hinglish.  
              Skills seekho, career banao, life change karo.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/courses" className="hover:text-white">All Courses</a></li>
              <li><a href="/auth/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Payment</h4>
            <p className="text-sm">
              UPI ID: <span className="text-green-400 font-mono">7379126375@fam</span>
            </p>
            <p className="text-xs mt-2 text-gray-400">
              FamPay supported • Instant transfer
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          © {new Date().getFullYear()} Zytex Courses. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
