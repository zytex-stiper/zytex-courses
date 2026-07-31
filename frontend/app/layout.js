import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'Zytex Courses – Hack Your Skills | Online Learning',
    template: '%s | Zytex Courses'
  },
  description: 'Zytex Courses – Quality online courses in Hinglish. Web Development, Python, Digital Marketing.',
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
