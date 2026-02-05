import React, { useState } from "react";
import { createLoan } from "../services/api";

const LoanForm = ({ onRefresh }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    principalAmount: "",
    interestRate: "",
    tenureMonths: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLoan({
        ...formData,
        principalAmount: parseFloat(formData.principalAmount),
        interestRate: parseFloat(formData.interestRate),
        tenureMonths: parseInt(formData.tenureMonths),
      });
      alert("Loan Successfully Registered!");
      setFormData({
        customerName: "",
        principalAmount: "",
        interestRate: "",
        tenureMonths: "",
      });
      onRefresh();
    } catch {
      alert("Error: Could not save loan.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center">
        <span className="bg-indigo-600 w-2 h-6 rounded-full mr-3"></span>
        Register New Customer Loan
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Customer Name
          </label>
          <input
            type="text"
            placeholder="e.g. Full Name"
            required
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Principal ($)
          </label>
          <input
            type="number"
            placeholder="5000"
            required
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.principalAmount}
            onChange={(e) =>
              setFormData({ ...formData, principalAmount: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            placeholder="10"
            step="0.1"
            required
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.interestRate}
            onChange={(e) =>
              setFormData({ ...formData, interestRate: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Tenure (Months)
          </label>
          <input
            type="number"
            placeholder="12"
            required
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.tenureMonths}
            onChange={(e) =>
              setFormData({ ...formData, tenureMonths: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="lg:col-span-4 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          Submit Loan Application
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
