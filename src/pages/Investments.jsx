import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInvestment, updateInvestment, removeInvestment } from '../store/slices/investmentsSlice';

function Investments() {
  const investments = useSelector((state) => state.investments);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      dispatch(updateInvestment({ id: editingId, amount: parseFloat(amount) }));
      setEditingId(null);
    } else {
      dispatch(addInvestment({ id: Date.now(), name, amount: parseFloat(amount), type }));
    }
    setName('');
    setAmount('');
    setType('');
  };

  const handleEdit = (investment) => {
    setName(investment.name);
    setAmount(investment.amount);
    setType(investment.type);
    setEditingId(investment.id);
  };

  const handleDelete = (id) => {
    dispatch(removeInvestment(id));
  };

  return (
    <div>
      <h1>Investments</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Investment Name" 
          required
        />
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount" 
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="Stocks">Stocks</option>
          <option value="Bonds">Bonds</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Cryptocurrency">Cryptocurrency</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">{editingId !== null ? 'Update' : 'Add'} Investment</button>
      </form>

      <ul>
        {investments.map((investment) => (
          <li key={investment.id}>
            <span>{investment.name} - {investment.type} - ${investment.amount.toFixed(2)}</span>
            <button onClick={() => handleEdit(investment)}>Edit</button>
            <button onClick={() => handleDelete(investment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Investments;
