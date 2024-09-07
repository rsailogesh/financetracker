import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    totalBudget: 0,
    categories: [],
  },
  reducers: {
    setTotalBudget: (state, action) => {
      state.totalBudget = action.payload;
    },
    addCategoryBudget: (state, action) => {
      const { category, amount } = action.payload;
      state.categories.push({ category, amount });
    },
    updateCategoryBudget: (state, action) => {
      const { category, amount } = action.payload;
      const categoryBudget = state.categories.find(cat => cat.category === category);
      if (categoryBudget) {
        categoryBudget.amount = amount;
      }
    },
  },
});

export const { setTotalBudget, addCategoryBudget, updateCategoryBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
