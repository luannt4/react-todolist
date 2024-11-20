// src/redux/features/cart/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState,  CartItem } from '../../types/cart.types';
import { 
  fetchProductAndAddToCart,
  calculateTotal,
 } from './cartActions';


const initialState: CartState = {
    items: [],
    total: 0,
    isEmpty: true,
    totalItems: 0,
    isInStock: true,
    isInCart:false,
};
  
const calculateTotals = (state: CartState) => {
  state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.isEmpty = state.items.length === 0;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
     reducers: {
        ADD_ITEM_WITH_QUANTITY(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            calculateTotals(state);
        },
        REMOVE_ITEM_OR_QUANTITY(state, action: PayloadAction<number>) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                if (item.quantity > 1) {
                item.quantity -= 1;
                } else {
                state.items.splice(itemIndex, 1);
                }
                calculateTotals(state);
            }
        },
        ADD_ITEM: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            calculateTotals(state);
        },
        REMOVE_ITEM(state, action: PayloadAction<number>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            calculateTotals(state);
        },
        UPDATE_ITEM(state, action: PayloadAction<CartItem>) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.items[itemIndex] = action.payload;
                calculateTotals(state);
            }
        },
        LOAD_CART(state, action: PayloadAction<CartState>) {
            return { ...state, ...action.payload };
        },
    }
  });
  
export const { 
  ADD_ITEM_WITH_QUANTITY, 
  REMOVE_ITEM_OR_QUANTITY, 
  ADD_ITEM, 
  REMOVE_ITEM, 
  UPDATE_ITEM, 
  LOAD_CART 
} = cartSlice.actions;
export default cartSlice.reducer;