import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../redux/transactionsSlice';
import EditTransaction from './EditTransaction';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';

const TransactionList = ({ userId }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.transactions.filter(t => t.userId === userId));
  const [editing, setEditing] = useState(null);

  const handleDelete = id => {
    try { dispatch(deleteTransaction(id)); toast.success('Deleted!'); }
    catch { toast.error('Error!'); }
  };

  return (
    <div className="mt-4">
      {editing && <EditTransaction transaction={editing} onClose={() => setEditing(null)} />}
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr><th>Date</th><th>Type</th><th>Category</th><th>Amount (₹)</th><th>Action</th></tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className="border-b">
              <td>{t.date}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.amount.toFixed(2)}</td>
              <td>
                <Button onClick={() => setEditing(t)} className="mr-2 bg-green-500 hover:bg-green-600">Edit</Button>
                <Button onClick={() => handleDelete(t.id)} className="bg-red-500 hover:bg-red-600">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
