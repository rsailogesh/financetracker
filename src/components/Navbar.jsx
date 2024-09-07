import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/budget">Budget</Link>
      <Link to="/investments">Investments</Link>
      <Link to="/goals">Goals</Link>
    </nav>
  );
}

export default Navbar;
