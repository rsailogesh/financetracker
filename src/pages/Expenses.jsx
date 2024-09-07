import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, removeExpense } from '../store/slices/expensesSlice';

function Expenses() {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense({
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      description,
    }));
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const handleDelete = (id) => {
    dispatch(removeExpense(id));
  };

  const filteredExpenses = filterCategory
    ? expenses.filter(expense => expense.category === filterCategory)
    : expenses;

  return (
    <div>
      <h1>Expenses</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount" 
          required
        />
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <div>
        <h2>Filter by Category</h2>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.description} - {expense.category} - ${expense.amount.toFixed(2)}</span>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
