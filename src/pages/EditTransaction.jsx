import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../redux/transactionsSlice';
import { toast } from 'react-toastify';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from "../components/ui/label";

const EditTransaction = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(transaction.amount);
  const [type, setType] = useState(transaction.type);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);

  const handleUpdate = () => {
    try {
      if (!amount || !category) throw new Error('All fields are required');
      // Dispatch update action
      dispatch(updateTransaction({ ...transaction, amount: parseFloat(amount), type, category, date }));
      toast.success('Transaction updated!');
      onClose();  // Close the modal after update
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="modal">
      <h3>Edit Transaction</h3>
      <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (₹)" />
      <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded-md w-full mt-2">
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <Button onClick={handleUpdate} className="mt-2">Update Transaction</Button>
      <Button onClick={onClose} className="mt-2 bg-gray-400">Cancel</Button>
    </div>
  );
};

export default EditTransaction;
