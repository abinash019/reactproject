// Helper functions for data aggregation (Income and Expenses by Category)

// Aggregate transactions by category (Income vs Expense)
export const aggregateByCategory = (transactions) => {
  const aggregated = transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) {
      acc[category] = { income: 0, expense: 0 };
    }
    if (type === 'Income') {
      acc[category].income += amount;
    } else if (type === 'Expense') {
      acc[category].expense += amount;
    }
    return acc;
  }, {});

  // Convert aggregated data to an array format suitable for the pie chart
  return Object.keys(aggregated).map(category => ({
    name: category,
    value: aggregated[category].income + aggregated[category].expense, // Total income + expense for the category
  }));
};

// Aggregate transactions by month (Income vs Expense per month)
export const aggregateIncomeExpenseByMonth = (transactions) => {
  const aggregated = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    if (transaction.type === 'Income') {
      acc[month].income += transaction.amount;
    } else if (transaction.type === 'Expense') {
      acc[month].expense += transaction.amount;
    }
    return acc;
  }, {});

  // Convert the aggregated object to an array format suitable for the line chart
  return Object.keys(aggregated).map(month => ({
    month,
    income: aggregated[month].income,
    expense: aggregated[month].expense,
  }));
};
