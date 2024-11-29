import { createAsyncThunk } from '@reduxjs/toolkit';
import {cartApi} from "./cartAPI";
import {Product} from "../../types/Product";
import {RootState} from "../../store";

// Async Actions
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId: number, { rejectWithValue }) => {
        try {
            const cart = await cartApi.getCart(userId);
            // Map API response to CartItem[]
            return cart.products.map(p => ({
                id: p.id,
                title: p.title,
                price: p.price,
                quantity: p.quantity,
                thumbnail: '' // You might want to fetch product details separately
            }));
        } catch (error) {
            return rejectWithValue('Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ userId, product, quantity = 1 }: {
        userId: number,
        product: Product,
        quantity?: number
    }, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const existingCartItem = state.cart.items.find(item => item.id === product.id);

            if (existingCartItem) {
                // If product exists, update quantity
                const updatedCart = await cartApi.updateCartItem(
                    userId,
                    product.id,
                    existingCartItem.quantity + quantity
                );
                return {
                    ...product,
                    quantity: existingCartItem.quantity + quantity
                };
            } else {
                // If product doesn't exist, add to cart
                const updatedCart = await cartApi.addToCart(userId, product.id, quantity);
                return {
                    ...product,
                    quantity
                };
            }
        } catch (error) {
            return rejectWithValue('Failed to add to cart');
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ cartId, productId, quantity }: { cartId: number, productId: number, quantity: number }, { rejectWithValue }) => {
        try {
            await cartApi.updateCartItem(cartId, productId, quantity);
            return { productId, quantity };
        } catch (error) {
            return rejectWithValue('Failed to update cart item');
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async ({ cartId, productId }: { cartId: number, productId: number }, { rejectWithValue }) => {
        try {
            await cartApi.deleteCartItem(cartId, productId);
            return productId;
        } catch (error) {
            return rejectWithValue('Failed to delete cart item');
        }
    }
);