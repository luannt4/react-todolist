// features/compare/compareSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface CompareState {
    compareList: Product[];
  }
  
const initialState: CompareState = {
    compareList: JSON.parse(localStorage.getItem('compares') || '[]'),
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
      addToCompare(state, action: PayloadAction<Product>) {
        const exists = state.compareList.some(product => product.id === action.payload.id);
        if (!exists) {
          state.compareList.push(action.payload);
          localStorage.setItem('compares', JSON.stringify(state.compareList));
        }
      },
      removeFromCompare(state, action: PayloadAction<number>) {
        state.compareList = state.compareList.filter(product => product.id !== action.payload);
        localStorage.setItem('compares', JSON.stringify(state.compareList));
      },
      clearCompare(state) {
        state.compareList = [];
        localStorage.removeItem('compares');
      },
    },
});
  
  export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
  export default compareSlice.reducer;