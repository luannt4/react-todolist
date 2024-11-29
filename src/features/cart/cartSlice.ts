// src/redux/features/cart/cartSlice.ts
import { createSlice,  createSelector } from '@reduxjs/toolkit';
import { CartState } from '../../types/cart.types';
import { RootState } from '../../store';
import {addToCart, fetchCart, deleteCartItem, updateCartItem} from "./cartThunks";

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    status: 'idle',
    error: null,
    isEmpty: true
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.totalItems = action.payload.totalQuantity || 0;
                state.totalPrice = action.payload.reduce((total, item) => total + (item.price * item.quantity!), 0);
                state.isEmpty = !action.payload.products || action.payload.products.length === 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;

            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingItem = state.items.find(item => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity = action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
                state.totalItems = action.payload.totalQuantity|| 0;
                state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                state.isEmpty = !action.payload.products || action.payload.products.length === 0;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const item = state.items.find(item => item.id === action.payload.productId);
                if (item) {
                    item.quantity = action.payload.quantity;
                }
                state.totalItems = action.payload.totalQuantity || 0;
                state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                state.isEmpty = !action.payload.products || action.payload.products.length === 0;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.totalItems = action.payload.totalQuantity || 0;
                state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                state.isEmpty = !action.payload.products || action.payload.products.length === 0;
            });
    }
});

// Selector for checking if product is in cart and its quantity
export const selectCartItemDetails = createSelector(
    [(state: RootState) => state.cart.items?.products, (_state: RootState, productId: number) => productId],(cartItems, productId) => {
        const cartItem = cartItems && cartItems.find(item => item.id === productId);
      return {
        isInCart: !!cartItem,
        quantity: cartItem?.quantity || 0,
        maxQuantity: cartItem?.stock || 0
      };
    }
);

export default cartSlice.reducer;