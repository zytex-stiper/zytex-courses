'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../lib/api';
import { getUser, isLoggedIn } from '../../lib/auth';

export default function AdminPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/auth/login');
      return;
    }
    const user = getUser();
    if (user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    API.get('/payments/all')
      .then(res => setPayments(res.data.payments || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleVerify = async (paymentId, status) => {
    try {
      const res = await API.post('/payments/verify', { paymentId, status });
      setMsg(res.data.message);
      fetchPayments();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  if (loading) return <div className="text-center py-32">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
      <p className="text-gray-600 mb-8">Payments verify karo</p>

      {msg && <div className="mb-6 p-3 bg-blue-50 text-blue-800 rounded-lg">{msg}</div>}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4">Student</th>
              <th className="text-left p-4">Course</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">UPI Txn ID</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No payments yet
                </td>
              </tr>
            ) : (
              payments.map(p => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium">{p.user?.name}</div>
                    <div className="text-xs text-gray-500">{p.user?.email}</div>
                  </td>
                  <td className="p-4">{p.course?.title}</td>
                  <td className="p-4 font-medium">₹{p.amount}</td>
                  <td className="p-4 font-mono text-xs">{p.upiTxnId || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.status === 'verified' ? 'bg-green-100 text-green-700' :
                      p.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {p.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVerify(p._id, 'verified')}
                          className="bg-green-600 text-white text-xs px-3 py-1.5 rounded hover:bg-green-700"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleVerify(p._id, 'rejected')}
                          className="bg-red-600 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
