import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const totalBudget = useSelector((state) => state.budget.totalBudget);
  const goals = useSelector((state) => state.goals);
  const expenses = useSelector((state) => state.expenses);
  const investments = useSelector((state) => state.investments);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalInvestments = investments.reduce((sum, investment) => sum + investment.amount, 0);

  const calculateGoalProgress = (goal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      <section>
        <h2>Total Budget</h2>
        <p>${totalBudget.toFixed(2)}</p>
      </section>

      <section>
        <h2>Goals Overview</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <span>{goal.name}: ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}</span>
              <div>
                <progress value={calculateGoalProgress(goal)} max="100"></progress>
                <span>{calculateGoalProgress(goal).toFixed(2)}% Complete</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Expenses Summary</h2>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <ul>
          {expenses.slice(0, 5).map((expense) => (
            <li key={expense.id}>
              <span>{expense.description} - {expense.category} - ${expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Investments Summary</h2>
        <p>Total Investments: ${totalInvestments.toFixed(2)}</p>
        <ul>
          {investments.slice(0, 5).map((investment) => (
            <li key={investment.id}>
              <span>{investment.name} - {investment.type} - ${investment.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
