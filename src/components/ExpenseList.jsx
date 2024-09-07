import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense, updateExpense } from '../store/slices/expensesSlice';

function ExpenseList() {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const [filterCategory, setFilterCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleDelete = (id) => {
    dispatch(removeExpense(id));
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense.id);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDescription(expense.description);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateExpense({
      id: editingExpense,
      amount: parseFloat(amount),
      category,
      description,
    }));
    setEditingExpense(null);
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const filteredExpenses = filterCategory
    ? expenses.filter(expense => expense.category === filterCategory)
    : expenses;

  return (
    <div>
      <h2>Expense List</h2>

      <div>
        <h3>Filter by Category</h3>
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
            {editingExpense === expense.id ? (
              <form onSubmit={handleUpdate}>
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
                <button type="submit">Update</button>
                <button onClick={() => setEditingExpense(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <span>{expense.description} - {expense.category} - ${expense.amount.toFixed(2)}</span>
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
