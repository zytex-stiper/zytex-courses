import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'Zytex Courses – Quality Online Learning in Hinglish',
    template: '%s | Zytex Courses'
  },
  description: 'Zytex Courses pe best online courses milenge Hinglish me. Web Development, Python, Digital Marketing aur bahut kuch.',
  keywords: 'online courses, zytex, hinglish courses, web development, python, digital marketing'
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
