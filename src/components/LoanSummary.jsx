import React from "react";

const LoanSummary = ({ summary, onClose }) => {
  if (!summary) return null;

  const totalPaid = summary["Total Deposit: "] || 0;

  const remainingBalance = summary["Remaining Balance: "] || 0;
  const details = summary.loanDetails || {};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Loan Analytics</h2>
            <p className="text-indigo-100 text-xs">
              Customer: {details.customerName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Calculation Cards */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
            <div>
              <p className="text-[10px] font-bold text-green-600 uppercase">
                Total Paid
              </p>
              <p className="text-2xl font-black text-green-700">
                ${totalPaid.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-200 p-2 rounded-full">💰</div>
          </div>

          <div className="flex justify-between items-center p-4 bg-rose-50 rounded-xl border border-rose-100">
            <div>
              <p className="text-[10px] font-bold text-rose-600 uppercase">
                Remaining Balance
              </p>
              <p className="text-2xl font-black text-rose-700">
                ${remainingBalance.toLocaleString()}
              </p>
            </div>
            <div className="bg-rose-200 p-2 rounded-full">📉</div>
          </div>

          {/* Detailed List */}
          <div className="pt-4 border-t border-dashed space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Principal Amount:</span>
              <span className="font-semibold text-gray-800">
                ${details.principalAmount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">EMI Amount:</span>
              <span className="font-semibold text-indigo-600">
                ${details.emiAmount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Interest Rate:</span>
              <span className="font-semibold text-gray-800">
                {details.interestRate}%
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
