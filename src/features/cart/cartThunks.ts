import { createAsyncThunk } from '@reduxjs/toolkit';
import {cartApi} from "./cartAPI";
//import {Product} from "../../types/Product";
import axios from 'axios';
import {Cart, CartItem,Product, CartState} from "./cart.types";

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
            if (!state.cart.cartStore) return;
            const currentCart = state.cart.cartStore;

            // Find if product already exists in cart
            const existingProductIndex = currentCart?.products.findIndex(
                p => p.id === productId
            );

            // Prepare updated cart payload
            let updatedProducts: Product[];
            if (existingProductIndex !== -1 && existingProductIndex !== undefined) {
                // Update existing product quantity
                updatedProducts = currentCart!.products.map((product, index) =>
                    index === existingProductIndex
                        ? { ...product, quantity: product.quantity + quantity }
                        : product
                );
            } else {
                // Add new product to cart
                const productResponse = await axios.get(`${API_BASE_URL}/products/${productId}`);
                const newProduct = {
                    ...productResponse.data,
                    quantity
                };

                updatedProducts = currentCart
                    ? [...currentCart.products, newProduct]
                    : [newProduct];
                console.log(updatedProducts);
            }

            // Update cart via API
            const response = await axios.put<Cart>(`${API_BASE_URL}/carts//${currentCart?.id}`, {
                merge: false,
                products: updatedProducts
            });

            return response.data;
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
