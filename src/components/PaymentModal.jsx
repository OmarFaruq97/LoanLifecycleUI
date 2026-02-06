import { useState } from 'react';
import { postPayment } from '../services/api';

const PaymentModal = ({ loanId, onClose, onRefresh }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postPayment({ loanId, amountPaid: parseFloat(amount) });
    onRefresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-lg font-bold mb-4">Make Payment for ID: {loanId}</h3>
        <input 
          type="number" 
          placeholder="Enter Amount" 
          className="w-full border p-2 rounded mb-4" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <div className="flex space-x-2">
          <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded">Cancel</button>
          <button type="submit" className="flex-1 bg-emerald-500 text-white py-2 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentModal;