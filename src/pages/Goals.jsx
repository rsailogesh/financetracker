import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGoal, updateGoal, removeGoal } from '../store/slices/goalsSlice';

function Goals() {
  const goals = useSelector((state) => state.goals);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      dispatch(updateGoal({ id: editingId, currentAmount: parseFloat(currentAmount) }));
      setEditingId(null);
    } else {
      dispatch(addGoal({ id: Date.now(), name, targetAmount: parseFloat(targetAmount), currentAmount: parseFloat(currentAmount) }));
    }
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
  };

  const handleEdit = (goal) => {
    setName(goal.name);
    setTargetAmount(goal.targetAmount);
    setCurrentAmount(goal.currentAmount);
    setEditingId(goal.id);
  };

  const handleDelete = (id) => {
    dispatch(removeGoal(id));
  };

  const calculateProgress = (goal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  return (
    <div>
      <h1>Financial Goals</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Goal Name" 
          required
        />
        <input 
          type="number" 
          value={targetAmount} 
          onChange={(e) => setTargetAmount(e.target.value)} 
          placeholder="Target Amount" 
          required
        />
        <input 
          type="number" 
          value={currentAmount} 
          onChange={(e) => setCurrentAmount(e.target.value)} 
          placeholder="Current Amount" 
          required
        />
        <button type="submit">{editingId !== null ? 'Update' : 'Add'} Goal</button>
      </form>

      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <span>{goal.name} - Target: ${goal.targetAmount.toFixed(2)} - Current: ${goal.currentAmount.toFixed(2)}</span>
            <div>
              <progress value={calculateProgress(goal)} max="100"></progress>
              <span>{calculateProgress(goal).toFixed(2)}% Complete</span>
            </div>
            <button onClick={() => handleEdit(goal)}>Edit</button>
            <button onClick={() => handleDelete(goal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;
