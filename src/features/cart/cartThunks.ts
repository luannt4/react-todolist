import { createAsyncThunk } from '@reduxjs/toolkit';
import {cartApi} from "./cartAPI";
import axios from 'axios';
import {Cart,  CartProduct, CartState} from "./cart.types";

// Async Actions
const API_BASE_URL = process.env.REACT_APP_API_URL;
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId: number, { rejectWithValue }) => {
        try {
            return  await cartApi.getCart(userId);

        } catch (error) {
            return rejectWithValue('Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ userId, productId, quantity = 1 }: {
        userId: number,
        productId: number,
        quantity: number
    }, { rejectWithValue, getState }) => {
        try {
            const state = getState() as  { cart: CartState };
            const currentCart = state.cart.cartStore;

            // Prepare updated cart payload
            let updatedProducts:  CartProduct[] ;
            if (currentCart) {
                // Find if product already exists in cart
                const existingProduct = currentCart?.products.find((item) => item.id === productId);

                if (existingProduct) {
                    // Update existing product quantity
                    updatedProducts = currentCart!.products.map((item, index) =>
                        item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
                    );
                } else {
                    // Add new product to cart
                    updatedProducts = [...currentCart!.products, { id: productId, quantity }];
                }
                // Update cart via API
                const response = await axios.put<Cart>(`${API_BASE_URL}/carts/${currentCart?.id}`, {
                    merge: false,
                    products: updatedProducts
                });
                return response.data;
            }else{
                // If no cart exists, create a new one
                updatedProducts = [{ id: productId, quantity }];
                const updatedCart = await cartApi.addToCart({
                    userId,
                    products: updatedProducts,
                });
                return updatedCart;
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
            return await cartApi.updateCartItem(cartId, productId, quantity);
        } catch (error) {
            return rejectWithValue('Failed to update cart item');
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async ({ cart, cartId, productId }: { cart:Cart, cartId: number, productId: number }, { rejectWithValue }) => {
        try {
            return await cartApi.deleteCartItem(cart, cartId, productId);

        } catch (error) {
            return rejectWithValue('Failed to delete cart item');
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async ({  cartId, }: { cartId: number }, { rejectWithValue }) => {
        try {
            return await cartApi.clearCart(cartId);
        } catch (error) {
            return rejectWithValue('Failed to clear cart ');
        }
    }
);
