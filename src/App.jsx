import { useState, useEffect } from 'react';
import { getLoans, getSummary } from './services/api';
import LoanList from './components/LoanList';
import LoanSummary from './components/LoanSummary';
import PaymentModal from './components/PaymentModal';

function App() {
  const [loans, setLoans] = useState([]);
  const [page, setPage] = useState(0);
  const [summary, setSummary] = useState(null);
  const [payId, setPayId] = useState(null);

  // Cascading render এরর ফিক্স করার জন্য useEffect এর ভেতরেই fetch লজিক
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await getLoans(page);
        if (isMounted) {
          // Spring Boot Pagination handle করার জন্য .content ব্যবহার করা হয়েছে
          setLoans(res.data.content || res.data);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [page]);

  const handleViewSummary = async (id) => {
    try {
      const res = await getSummary(id);
      setSummary(res.data);
    } catch {
      // err ব্যবহার না করলে ESLint warning যাবে না
      alert("Loan Summary not found!");
    }
  };

  const refreshData = () => {
    // পেমেন্টের পর ডাটা রিফ্রেশ করার জন্য
    getLoans(page).then(res => setLoans(res.data.content || res.data));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Loan Manager Pro</h1>
          <p className="text-gray-500 mt-2">Manage customer loans and payments efficiently</p>
        </header>

        <LoanList 
          loans={loans} 
          onViewSummary={handleViewSummary} 
          onAddPayment={(id) => setPayId(id)}
          page={page}
          setPage={setPage}
        />

        {summary && <LoanSummary summary={summary} onClose={() => setSummary(null)} />}

        {payId && (
          <PaymentModal 
            loanId={payId} 
            onClose={() => setPayId(null)} 
            onRefresh={refreshData} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
