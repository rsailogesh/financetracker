import { createSlice } from '@reduxjs/toolkit';

const investmentsSlice = createSlice({
  name: 'investments',
  initialState: [],
  reducers: {
    addInvestment: (state, action) => {
      const { id, name, amount, type } = action.payload;
      state.push({ id, name, amount, type });
    },
    updateInvestment: (state, action) => {
      const { id, amount } = action.payload;
      const investment = state.find(investment => investment.id === id);
      if (investment) {
        investment.amount = amount;
      }
    },
    removeInvestment: (state, action) => {
      return state.filter(investment => investment.id !== action.payload);
    },
  },
});

export const { addInvestment, updateInvestment, removeInvestment } = investmentsSlice.actions;
export default investmentsSlice.reducer;
