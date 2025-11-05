import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../redux/transactionsSlice';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import LineChartComponent from '../components/charts/LineChart';
import PieChartComponent from '../components/charts/PieChart';
import BarChartComponent from '../components/charts/BarChart';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';
import { aggregateByCategory, aggregateIncomeExpenseByMonth } from '../utils/aggregation';
import CategoryPieChart from '../components/graph/CategoryPieChart';
import DynamicLineChart from '../components/graph/DynamicLineChart';

// Helper function to calculate total income/expense
const calculateTotal = (transactions, type) =>
  transactions.filter(transaction => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);

const DashboardPage = ({ userId }) => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [dateRange, setDateRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Fetch transactions from localStorage (or Redux if preferred)
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions.filter(t => t.userId === userId));
    }
  }, [userId]);

  // Filter transactions based on date range and other filters
  const filterTransactions = (transactions, dateRange, categoryFilter, typeFilter) => {
    const today = new Date();
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      let isValidDate = true;

      // Date range filtering
      switch (dateRange) {
        case 'today':
          isValidDate = transactionDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const startOfWeek = today.getDate() - today.getDay();
          const endOfWeek = startOfWeek + 6;
          const weekStart = new Date(today.setDate(startOfWeek));
          const weekEnd = new Date(today.setDate(endOfWeek));
          isValidDate = transactionDate >= weekStart && transactionDate <= weekEnd;
          break;
        case 'month':
          isValidDate = transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear();
          break;
        case 'all':
          isValidDate = true;
          break;
        default:
          isValidDate = true;
      }

      // Apply other filters (category, type)
      return isValidDate &&
        (categoryFilter ? transaction.category === categoryFilter : true) &&
        (typeFilter ? transaction.type === typeFilter : true);
    });
  };

  // Aggregated data (memoized to avoid unnecessary recalculations)
  const filteredTransactions = useMemo(() => filterTransactions(transactions, dateRange, categoryFilter, typeFilter),
    [transactions, dateRange, categoryFilter, typeFilter]);

  const totalIncome = calculateTotal(filteredTransactions, 'Income');
  const totalExpense = calculateTotal(filteredTransactions, 'Expense');
  const totalProfit = totalIncome - totalExpense;

  const aggregatedByCategory = useMemo(() => aggregateByCategory(filteredTransactions), [filteredTransactions]);
  const aggregatedIncomeExpense = useMemo(() => aggregateIncomeExpenseByMonth(filteredTransactions), [filteredTransactions]);

  // Handle transaction deletion
  const handleDelete = (id) => {
    try {
      dispatch(deleteTransaction(id));
      toast.success('Transaction deleted!');
    } catch {
      toast.error('Error deleting transaction');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <CardTitle>Total Income</CardTitle>
            <p className="text-2xl font-bold text-green-600">₹ {totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <CardTitle>Total Expense</CardTitle>
            <p className="text-2xl font-bold text-red-600">₹ {totalExpense.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent className="pt-6">
            <CardTitle>Total Profit</CardTitle>
            <p className="text-2xl font-bold text-yellow-600">₹ {totalProfit.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-gray-600">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div>
          <label className="text-gray-600">Category</label>
          <input
            type="text"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            placeholder="Category"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-gray-600">Transaction Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <h4>Total Expenses and Income</h4>
          <CategoryPieChart data={aggregatedByCategory} title="Income vs Expense by Category" />
        </div>

        <div>
          <h4>Income vs Expense (Month-wise)</h4>
          <DynamicLineChart data={aggregatedIncomeExpense} dataKey="income" xKey="month" title="Income vs Expense by Month" />
        </div>
      </div>

      {/* Bar Chart for Monthly/Weekly Breakdown */}
      <BarChartComponent transactions={filteredTransactions} />

      {/* Transaction List Section */}
      <div className="mt-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions match your filters.</p>
        ) : (
          <table className="w-full border-collapse bg-white shadow-sm rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td>{t.category}</td>
                  <td>{t.amount.toFixed(2)}</td>
                  <td>
                    <Button onClick={() => handleDelete(t.id)} className="bg-red-500 hover:bg-red-600">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
