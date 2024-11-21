// src/redux/features/cart/cartSlice.ts
import { createSlice,  PayloadAction, createSelector } from '@reduxjs/toolkit';
import { CartState,  CartItem } from '../../types/cart.types';
import { RootState } from '../../store';
import { Product } from '../../types/Product';


const initialState: CartState = {
    items: [],
    total: 0,
    isEmpty: true,
    totalItems: 0,
    isInStock: true,
    isInCart: () => false,
};
  
const calculateTotals = (state: CartState) => {
    const total         = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems    = state.items.reduce((total, item) => total + item.quantity, 0);
    const isInCart      = ( productId: number): boolean => state.items.some(item => item.id === productId);

    state.total         = total;
    state.totalItems    = totalItems;
    state.isEmpty       = state.items.length === 0;
    state.isInStock     = state.items.every(item => item.quantity <= item.stock);
    state.isInCart      = isInCart;
   
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
     reducers: {
        ADD_ITEM_WITH_QUANTITY(state, action: PayloadAction<{product: Product, quantity: number}>) {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }
            calculateTotals(state);
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
        UPDATE_ITEM(state, action: PayloadAction<{productId: number, quantity: number}>) {
            const { productId, quantity } = action.payload;
            const itemIndex = state.items.findIndex((item) => item.id === productId);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = quantity;
                calculateTotals(state);
            }
        },
        LOAD_CART(state, action: PayloadAction<CartState>) {
            return { ...state, ...action.payload };
        }
    }
});

// Selector for checking if product is in cart and its quantity
export const selectCartItemDetails = createSelector(
    [(state: RootState) => state.cart.items, (_state: RootState, productId: number) => productId],
    (cartItems, productId) => {
      const cartItem = cartItems.find(item => item.id === productId);
      return {
        isInCart: !!cartItem,
        quantity: cartItem?.quantity || 0,
        maxQuantity: cartItem?.stock || 0
      };
    }
);

export const { 
  ADD_ITEM_WITH_QUANTITY, 
  ADD_ITEM, 
  REMOVE_ITEM, 
  UPDATE_ITEM, 
  LOAD_CART 
} = cartSlice.actions;
export default cartSlice.reducer;