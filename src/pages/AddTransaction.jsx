import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/transactionsSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// IMPORT COMPONENTS FROM UI FOLDER
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";

const AddTransaction = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAdd = () => {
    try {
      // Check if all fields are filled
      if (!amount || !category) throw new Error("All fields are required");

      // Dispatch the addTransaction action
      dispatch(
        addTransaction({
          id: uuidv4(),
          userId,
          amount: parseFloat(amount),
          type,
          category,
          date,
        })
      );

      // Delay the toast and navigation
      setTimeout(() => {
        toast.success("Transaction added!");  // Show success message after a short delay
        navigate("/showtransaction");  // Navigate to the /showtransaction route
      }, 500);  // 500ms delay

      // Reset the form fields
      setAmount("");
      setCategory("");
    } catch (err) {
      // Show error toast if something goes wrong
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">Add Transaction</h3>

      <div className="grid gap-4">
        {/* Amount */}
        <div>
          <Label htmlFor="amount" className="text-gray-600">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-1 px-4 py-2 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type */}
        <div>
          <Label htmlFor="type" className="text-gray-600">Type</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500"
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category" className="text-gray-600">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            className="mt-1 px-4 py-2 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date" className="text-gray-600">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <Button
        onClick={handleAdd}
        className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add Transaction
      </Button>
    </div>
  );
};

export default AddTransaction;
