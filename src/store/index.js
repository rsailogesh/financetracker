import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expensesSlice';
import budgetReducer from './slices/budgetSlice';
import goalsReducer from './slices/goalsSlice';
import investmentsReducer from './slices/investmentsSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    budget: budgetReducer,
    goals: goalsReducer,
    investments: investmentsReducer,
  },
});
