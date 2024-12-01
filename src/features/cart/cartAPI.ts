import axios from 'axios';
import { Cart } from './cart.types';
import {fetchCart} from "./cartThunks";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const cartApi = {
    getCart: async (userId: number) => {
        try {
            const response = await axios.get<Cart>(`${API_BASE_URL}/carts/${userId}`);
            return response.data;
        }catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    addToCart: async (userId: number, productId: number, quantity: number) => {
        try {
            const response = await axios.post<Cart>(`${API_BASE_URL}/carts/add`, {
                userId,
                products: [{ id: productId, quantity }]
            });
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }

    },

    updateCartItem: async (cartId: number, productId: number, quantity: number) => {
        try{
            const productResponse = await axios.get(`${API_BASE_URL}/products/${productId}`);
            const stock = productResponse?.data.stock || 0;

            const response = await axios.put<Cart>(`${API_BASE_URL}/carts/${cartId}`, {
                merge: true,
                products: [{id: productId, quantity}]
            });
            return { productId, quantity, stock };
        } catch (error) {
            console.error('Failed to update cart item', error);
            throw error;
        }

    },

    deleteCartItem: async (cart: Cart, cartId: number, productId: number) => {
        // DummyJSON doesn't have a direct delete endpoint
        try {
            // Remove the specific product from the cart
            const updatedProducts = cart.products.filter(product => product.id !== productId);

            // Send PUT request to update the cart
            const response = await axios.put<Cart>(`https://dummyjson.com/carts/${cartId}`, {
                merge: false,
                products: updatedProducts
            });
            return response.data;

        } catch (error) {
            throw new Error("Failed to delete cart item");
        }
    }
};
