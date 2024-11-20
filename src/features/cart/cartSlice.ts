// src/redux/features/cart/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState,Product,  CartItem } from '../../types/cart.types';
import { 
  fetchProductAndAddToCart,
  calculateTotal,
 } from './cartActions';


const initialState: CartState = {
    items: [],
    total: 0,
    isEmpty: true,
    isInStock: true,
    isInCart: (id: number) => false,
};
  

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      ADD_ITEM: (state, action: PayloadAction<Product>) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.isEmpty = state.items.length === 0;
      },
      ADD_ITEM_WITH_QUANTITY: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
        const { product, quantity } = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ ...product, quantity });
        }
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.isEmpty = state.items.length === 0;
      },
      REMOVE_ITEM_OR_QUANTITY: (state, action: PayloadAction<{ id: number; quantity?: number }>) => {
        const { id, quantity } = action.payload;
        const itemIndex = state.items.findIndex(item => item.id === id);
        
        if (itemIndex > -1) {
          if (quantity && state.items[itemIndex].quantity > quantity) {
            state.items[itemIndex].quantity -= quantity;
          } else {
            state.items.splice(itemIndex, 1);
          }
        }
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.isEmpty = state.items.length === 0;
      },
      UPDATE_ITEM: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const { id, quantity } = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.isEmpty = state.items.length === 0;
      },
      REMOVE_ITEM: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.isEmpty = state.items.length === 0;
      },
    },
  });
  
export const { ADD_ITEM, ADD_ITEM_WITH_QUANTITY, REMOVE_ITEM_OR_QUANTITY, UPDATE_ITEM, REMOVE_ITEM } = cartSlice.actions;
export default cartSlice.reducer;