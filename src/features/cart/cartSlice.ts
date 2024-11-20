// src/redux/features/cart/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState,Product,  CartItem } from '../../types/cart.types';
import { 
  fetchProductAndAddToCart,
  calculateTotal,
 } from './cartActions';

const STORAGE_KEY = 'shopy-cart';


const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
};
  
const saveCartToStorage = (items: CartItem[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};
  
const initialState: CartState = {
    items: loadCartFromStorage(),
    total: calculateTotal(loadCartFromStorage()),
    isEmpty: loadCartFromStorage().length === 0,
    loading: false,
    error: null,
};
  

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemWithQuantity: (
          state,
          action: PayloadAction<{ product: Product; quantity: number }>
        ) => {
          
          
          const { product, quantity } = action.payload;
          const existingItem = state.items.find(item => item.id === product.id);
    
          if (existingItem) {
            existingItem.quantity = Math.min(
                existingItem.quantity + quantity,
                product.stock
            );
          } else {
            state.items.push({ ...product, quantity: Math.min(quantity, product.stock) });
          }
    
          state.total = calculateTotal(state.items);
          state.isEmpty = state.items.length === 0;
          saveCartToStorage(state.items);
        },
    
        removeItemOrQuantity: (
          state,
          action: PayloadAction<{ productId: number; quantity?: number }>
        ) => {
          const { productId, quantity } = action.payload;
          const itemIndex = state.items.findIndex(item => item.id === productId);
    
          if (itemIndex > -1) {
            if (quantity && state.items[itemIndex].quantity > quantity) {
              state.items[itemIndex].quantity -= quantity;
            } else {
              state.items.splice(itemIndex, 1);
            }
    
            state.total = calculateTotal(state.items);
            state.isEmpty = state.items.length === 0;
            saveCartToStorage(state.items);
          }
        },
    
        addItem: (state, action: PayloadAction<Product>) => {
          // Ensure `state.items` is always an array
          if (!Array.isArray(state.items)) {
            state.items = [];
          }
          const existingItem = state.items.find(item => item.id === action.payload.id);
    
          if (existingItem) {
            existingItem.quantity = Math.min(existingItem.quantity + 1, action.payload.stock);
          } else {
            state.items.push({ ...action.payload, quantity: 1 });
          }
    
          state.total = calculateTotal(state.items);
          state.isEmpty = state.items.length === 0;
          saveCartToStorage(state.items);
        },
    
        updateItem: (
          state,
          action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
          const { productId, quantity } = action.payload;
          const item = state.items.find(item => item.id === productId);
    
          if (item) {
            item.quantity = Math.min(quantity, item.stock);
            state.total = calculateTotal(state.items);
            state.isEmpty = state.items.length === 0;
            saveCartToStorage(state.items);
          }
        },
    
        removeItem: (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(item => item.id !== action.payload);
          state.total = calculateTotal(state.items);
          state.isEmpty = state.items.length === 0;
          saveCartToStorage(state.items);
        },
    
        clearCart: (state) => {
          state.items = [];
          state.total = 0;
          state.isEmpty = true;
          saveCartToStorage(state.items);
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductAndAddToCart.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductAndAddToCart.fulfilled, (state, action) => {
          state.loading = false;
          const product = action.payload;
          const existingItem = state.items.find(item => item.id === product.id);
  
          if (existingItem) {
            existingItem.quantity = Math.min(existingItem.quantity + 1, product.stock);
          } else {
            state.items.push({ ...product, quantity: 1 });
          }
  
          state.total = calculateTotal(state.items);
          state.isEmpty = state.items.length === 0;
          saveCartToStorage(state.items);
        })
        .addCase(fetchProductAndAddToCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const {
    addItemWithQuantity,
    removeItemOrQuantity,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  } = cartSlice.actions;
  
export default cartSlice.reducer;