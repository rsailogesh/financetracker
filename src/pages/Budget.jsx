import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalBudget, addCategoryBudget, updateCategoryBudget } from '../store/slices/budgetSlice';

function Budget() {
  const totalBudget = useSelector((state) => state.budget.totalBudget);
  const categories = useSelector((state) => state.budget.categories);
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleTotalBudgetSubmit = (e) => {
    e.preventDefault();
    dispatch(setTotalBudget(parseFloat(amount)));
    setAmount('');
  };

  const handleCategoryBudgetSubmit = (e) => {
    e.preventDefault();
    if (editingCategory !== null) {
      dispatch(updateCategoryBudget({ category: editingCategory, amount: parseFloat(amount) }));
      setEditingCategory(null);
    } else {
      dispatch(addCategoryBudget({ category, amount: parseFloat(amount) }));
    }
    setCategory('');
    setAmount('');
  };

  const handleEdit = (category) => {
    const categoryBudget = categories.find(cat => cat.category === category);
    setCategory(categoryBudget.category);
    setAmount(categoryBudget.amount);
    setEditingCategory(categoryBudget.category);
  };

  return (
    <div>
      <h1>Budget Management</h1>
      
      <section>
        <h2>Total Budget</h2>
        <p>Current Total Budget: ${totalBudget.toFixed(2)}</p>
        <form onSubmit={handleTotalBudgetSubmit}>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Set Total Budget" 
            required
          />
          <button type="submit">Set Budget</button>
        </form>
      </section>

      <section>
        <h2>Category Budgets</h2>
        <form onSubmit={handleCategoryBudgetSubmit}>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="Category" 
            required
          />
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Amount" 
            required
          />
          <button type="submit">{editingCategory !== null ? 'Update' : 'Add'} Category Budget</button>
        </form>

        <ul>
          {categories.map((cat) => (
            <li key={cat.category}>
              <span>{cat.category} - ${cat.amount.toFixed(2)}</span>
              <button onClick={() => handleEdit(cat.category)}>Edit</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Budget;
