// src/redux/features/cart/cartSlice.ts
import { createSlice,  createSelector } from '@reduxjs/toolkit';
import { CartState } from './cart.types';
import { RootState } from '../../store';
import {addToCart, fetchCart, deleteCartItem, updateCartItem} from "./cartThunks";
import axios from "axios";

const initialState: CartState = {
    cartStore: null,
    totalItems: 0,
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
                state.cartStore = action.payload;
                state.totalItems = action.payload.totalQuantity;
                state.isEmpty =  action.payload.totalQuantity === 0;
            })

            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;

            })
            .addCase(addToCart.fulfilled, (state, action) => {
                // Ensure payload exists before updating state
                if (action.payload) {
                    state.status = 'succeeded';
                    state.cartStore = action.payload;
                    state.totalItems = action.payload.products.reduce(
                        (total, product) => total + product.quantity,
                        0
                    );
                    state.isEmpty = action.payload.products.length === 0;
                }

            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                if (!state.cartStore) return;

                const { productId, quantity,stock } = action.payload;

                // Use findIndex to locate the specific product
                const itemIndex = state.cartStore.products.findIndex(
                    item => item.id === productId
                );

                // If item found, update its quantity and total
                if (itemIndex !== -1) {
                    const updatedProducts = [...state.cartStore.products];
                    const currentItem = updatedProducts[itemIndex];

                    updatedProducts[itemIndex] = {
                        ...currentItem,
                        quantity,
                        stock,
                        total: currentItem.price * quantity
                    };

                    // Recalculate cart totals
                    const totalProducts = updatedProducts.length;
                    const totalQuantity = updatedProducts.reduce((sum, item) => sum + item.quantity, 0);
                    const total = updatedProducts.reduce((sum, item) => sum + item.total, 0);

                    state.cartStore = {
                        ...state.cartStore,
                        products: updatedProducts,
                        totalProducts,
                        totalQuantity,
                        total
                    };
                }

                state.status = 'succeeded';
                state.totalItems =  state.cartStore.totalQuantity;
                state.isEmpty = state.cartStore.products.length === 0;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'succeeded';
                    state.cartStore = action.payload;
                    state.totalItems = action.payload.products.reduce((total, product) => total + product.quantity, 0);
                    state.isEmpty = action.payload.products.length === 0;
                }
            });
    }
});

// Selector for checking if product is in cart and its quantity
export const selectCartItemDetails = createSelector(
    [(state: RootState) => state.cart.cartStore?.products, (_state: RootState, productId: number) => productId],(cartItems, productId) => {
        const cartItem = cartItems?.find(item => item.id === productId);
      return {
        isInCart: !!cartItem,
        quantity: cartItem?.quantity || 0,
        maxQuantity: cartItem?.stock || 0
      };
    }
);

export default cartSlice.reducer;