import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/transactionsSlice";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";
import { addTransactionToDB } from "../firebase/transactionService";

const AddTransactionModal = ({ userId, closeModal }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAdd = async () => {
    if (!amount || !category) {
      toast.error("All fields are required");
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      userId,
      amount: parseFloat(amount),
      type,
      category,
      date
    };

    try {
      await addTransactionToDB(newTransaction);
      console.log("🎉 Saved Successfully", newTransaction);

      toast.success("Transaction added!");
      closeModal();
    } catch (error) {
      console.error("🔥 Firebase Error:", error);
      toast.error("Failed to save to Firebase");
    }

  };


  return (
    <div className="space-y-4">
      <div>
        <Label>Amount (₹)</Label>
        <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
      </div>

      <div>
        <Label>Type</Label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
      </div>

      <div>
        <Label>Category</Label>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Eg. Food" />
      </div>

      <div>
        <Label>Date</Label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <Button onClick={handleAdd} className="w-full bg-green-600 hover:bg-green-700">
        Add Transaction
      </Button>
    </div>
  );
};

export default AddTransactionModal;
