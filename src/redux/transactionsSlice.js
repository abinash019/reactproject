import { createSlice } from '@reduxjs/toolkit';


const loadTransactions = () => {
  const storedTransactions = localStorage.getItem('transactions');
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

const initialState = {
  transactions: loadTransactions(),// {id, userId, type, category, amount, date}
};

// Helper function to save state to localStorage
const saveToLocalStorage = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};


const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      saveToLocalStorage(state.transactions);  // Save to localStorage
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      saveToLocalStorage(state.transactions);  // Save to localStorage
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        saveToLocalStorage(state.transactions);  // Save to localStorage
      }
    },
  },
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
