import React from 'react';

const LoanList = ({ loans, onViewSummary, onAddPayment, page, setPage }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Expected Total</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{loan.id}</td>
              <td className="p-4 font-semibold">{loan.customerName}</td>
              <td className="p-4">${loan.totalExpectedAmount}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs ${loan.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {loan.status}
                </span>
              </td>
              <td className="p-4 space-x-2">
                <button onClick={() => onViewSummary(loan.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Summary</button>
                <button onClick={() => onAddPayment(loan.id)} className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600">Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 flex justify-between bg-gray-50">
        <button disabled={page === 0} onClick={() => setPage(page - 1)} className="px-4 py-2 border rounded disabled:opacity-50">Prev</button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(page + 1)} className="px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  );
};

export default LoanList;