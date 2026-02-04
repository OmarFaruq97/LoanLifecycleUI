import React from 'react';

const LoanSummary = ({ summary, onClose }) => {
  if (!summary) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border-t-4 border-indigo-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Loan Analytics</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl">×</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-700 font-bold">Total Paid: </span>
            <span className="text-blue-900 font-mono">${summary["Total Paid: "]}</span>
          </div>

          <div className="flex justify-between p-3 bg-red-50 rounded-lg">
            <span className="text-red-700 font-bold">Remaining Balance:</span>
            <span className="text-red-900 font-mono">${summary["Remaining Balance:"]}</span>
          </div>
          
          <div className="pt-4 border-t border-dashed">
            <h4 className="text-xs uppercase text-gray-400 font-bold mb-2">Loan Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p className="text-gray-600">Principal: <span className="text-black font-semibold">${summary.loanDetails.principalAmount}</span></p>
              <p className="text-gray-600">Interest: <span className="text-black font-semibold">{summary.loanDetails.interestRate}%</span></p>
              <p className="text-gray-600">Tenure: <span className="text-black font-semibold">{summary.loanDetails.tenureMonths} Mo.</span></p>
              <p className="text-gray-600">Status: <span className="text-black font-semibold">{summary.loanDetails.status}</span></p>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
        > Close Summary </button>
      </div>
    </div>
  );
};

export default LoanSummary;