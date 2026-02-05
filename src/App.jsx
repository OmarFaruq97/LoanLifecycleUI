import { useState, useEffect } from "react";
import { getLoans, getSummary } from "./services/api";
import LoanList from "./components/LoanList";
import LoanSummary from "./components/LoanSummary";
import PaymentModal from "./components/PaymentModal";
import LoanForm from "./components/LoanForm";

function App() {
  const [loans, setLoans] = useState([]);
  const [page, setPage] = useState(0);
  const [summary, setSummary] = useState(null);
  const [payId, setPayId] = useState(null);

  // ডাটা ফেচিং লজিক (useEffect এর ভেতরেই নিরাপদ)
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await getLoans(page);
        if (isMounted) {
          setLoans(res.data.content || res.data);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [page]);

  // পেমেন্ট বা লোন ক্রিয়েশনের পর ডেটা রিফ্রেশ করার কমন ফাংশন
  const refreshData = async () => {
    try {
      const res = await getLoans(page);
      setLoans(res.data.content || res.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleViewSummary = async (id) => {
    try {
      const res = await getSummary(id);
      setSummary(res.data);
    } catch {
      alert("Loan Summary not found!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-black text-indigo-900 tracking-tight">
            Loan Manager Pro
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Streamlined Loan Tracking & Management
          </p>
        </header>

        {/* নতুন লোন যোগ করার ফর্ম */}
        <section className="mb-12">
          <LoanForm onRefresh={refreshData} />
        </section>

        {/* লোনের তালিকা */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Active Loans</h2>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              Total Loans: {loans.length}
            </span>
          </div>

          <LoanList
            loans={loans}
            onViewSummary={handleViewSummary}
            onAddPayment={(id) => setPayId(id)}
            page={page}
            setPage={setPage}
          />
        </section>

        {/* পপ-আপ মডালসমূহ */}
        {summary && (
          <LoanSummary summary={summary} onClose={() => setSummary(null)} />
        )}

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
