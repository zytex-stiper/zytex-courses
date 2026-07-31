'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import API from '../../../lib/api';
import { getUser, isLoggedIn } from '../../../lib/auth';
import Link from 'next/link';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [payment, setPayment] = useState(null);
  const [txnId, setTxnId] = useState('');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
    API.get(`/courses/${slug}`)
      .then(res => {
        setCourse(res.data.course);
        setIsEnrolled(res.data.isEnrolled);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleEnroll = async () => {
    if (!isLoggedIn()) {
      router.push('/auth/login');
      return;
    }

    if (course.price === 0) {
      try {
        const res = await API.post(`/courses/${course._id}/enroll`);
        setMsg(res.data.message);
        setIsEnrolled(true);
      } catch (err) {
        setMsg(err.response?.data?.message || 'Error');
      }
    } else {
      // Paid course → create payment & show QR
      try {
        const res = await API.post('/payments/create', { courseId: course._id });
        setPayment(res.data.payment);
        setShowPayment(true);
      } catch (err) {
        setMsg(err.response?.data?.message || 'Error creating payment');
      }
    }
  };

  const submitTxn = async () => {
    if (!txnId.trim()) {
      setMsg('Transaction ID daalo');
      return;
    }
    try {
      const res = await API.post('/payments/submit-txn', {
        paymentId: payment._id,
        upiTxnId: txnId
      });
      setMsg(res.data.message);
      setShowPayment(false);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  if (loading) return <div className="text-center py-32">Loading course...</div>;
  if (!course) return <div className="text-center py-32">Course nahi mila</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* SEO-friendly header */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 mb-6">
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{course.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{course.shortDescription}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
            <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">{course.level}</span>
            <span>{course.category}</span>
            <span>{course.lessons?.length || 0} Lessons</span>
            <span>{Math.floor((course.totalDuration || 0) / 60)} min</span>
          </div>

          <div className="prose max-w-none mb-10">
            <h2 className="text-xl font-bold mb-3">Course Details</h2>
            <p className="whitespace-pre-line text-gray-700">{course.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Yeh course kis ke liye hai?</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Beginners jo coding / marketing start karna chahte hain</li>
              <li>• Students jo practical skills seekhna chahte hain</li>
              <li>• Working professionals jo upskill karna chahte hain</li>
            </ul>
          </div>

          {/* Lessons list */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.lessons?.map((lesson, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      {lesson.isPreview && <span className="text-xs text-green-600">Preview available</span>}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{Math.floor(lesson.duration / 60)} min</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Enroll / Payment */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-primary-700">
                {course.price === 0 ? 'FREE' : `₹${course.price}`}
              </p>
              {course.price > 0 && <p className="text-sm text-gray-500 mt-1">One-time payment</p>}
            </div>

            {msg && (
              <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">{msg}</div>
            )}

            {isEnrolled ? (
              <div className="text-center">
                <p className="text-green-600 font-semibold mb-4">✅ You are enrolled!</p>
                <Link href="/dashboard" className="btn-primary w-full block text-center">
                  Apna progress yahan dekhen
                </Link>
              </div>
            ) : showPayment ? (
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Payment – Zytex Courses</h3>
                <p className="text-gray-600 mb-4">Amount: ₹{course.price}</p>

                <img
                  src="/upi-qr.png"
                  alt="FamPay QR Code - 7379126375@fam"
                  className="mx-auto w-56 h-56 object-contain border rounded-xl mb-4"
                />

                <p className="font-medium mb-1">
                  UPI ID: <span className="text-green-600 font-mono font-bold">7379126375@fam</span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Scan karo ya UPI ID copy karke payment karo (FamPay / GPay / PhonePe)
                </p>

                <input
                  type="text"
                  placeholder="UPI Transaction ID yahan daalo"
                  value={txnId}
                  onChange={e => setTxnId(e.target.value)}
                  className="w-full border rounded-lg p-3 mb-3 text-sm"
                />
                <button onClick={submitTxn} className="btn-accent w-full">
                  Submit & Wait for Verification
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Admin 1-2 ghante me verify karega. Uske baad course unlock.
                </p>
              </div>
            ) : (
              <button onClick={handleEnroll} className="btn-primary w-full text-lg py-3">
                {course.price === 0 ? 'Abhi Free me shuru karo' : 'Enroll Now'}
              </button>
            )}

            <div className="mt-6 pt-6 border-t text-sm text-gray-600 space-y-2">
              <p>✅ Lifetime access</p>
              <p>✅ Mobile + Desktop</p>
              <p>✅ Certificate (coming soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
