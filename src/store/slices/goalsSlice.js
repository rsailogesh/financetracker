import { createSlice } from '@reduxjs/toolkit';

const goalsSlice = createSlice({
  name: 'goals',
  initialState: [],
  reducers: {
    addGoal: (state, action) => {
      const { id, name, targetAmount, currentAmount } = action.payload;
      state.push({ id, name, targetAmount, currentAmount });
    },
    updateGoal: (state, action) => {
      const { id, currentAmount } = action.payload;
      const goal = state.find(goal => goal.id === id);
      if (goal) {
        goal.currentAmount = currentAmount;
      }
    },
    removeGoal: (state, action) => {
      return state.filter(goal => goal.id !== action.payload);
    },
  },
});

export const { addGoal, updateGoal, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
