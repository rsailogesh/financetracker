import React from 'react';
import { useSelector } from 'react-redux';

function BudgetTracker() {
  const totalBudget = useSelector((state) => state.budget.totalBudget);
  const categories = useSelector((state) => state.budget.categories);
  const expenses = useSelector((state) => state.expenses);

  const calculateCategorySpending = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateRemainingBudget = () => {
    return categories.reduce((sum, category) => {
      const categorySpending = calculateCategorySpending(category.category);
      return sum + Math.max(0, category.amount - categorySpending);
    }, 0);
  };

  return (
    <div>
      <h1>Budget Tracker</h1>

      <section>
        <h2>Total Budget</h2>
        <p>${totalBudget.toFixed(2)}</p>
        <h2>Remaining Budget</h2>
        <p>${calculateRemainingBudget().toFixed(2)}</p>
      </section>

      <section>
        <h2>Category Budgets</h2>
        <ul>
          {categories.map((category) => {
            const categorySpending = calculateCategorySpending(category.category);
            const remainingAmount = category.amount - categorySpending;

            return (
              <li key={category.category}>
                <h3>{category.category}</h3>
                <p>Budgeted: ${category.amount.toFixed(2)}</p>
                <p>Spent: ${categorySpending.toFixed(2)}</p>
                <p>Remaining: ${remainingAmount.toFixed(2)}</p>
                <div>
                  <progress value={categorySpending} max={category.amount}></progress>
                  <span>{((categorySpending / category.amount) * 100).toFixed(2)}% Used</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default BudgetTracker;
