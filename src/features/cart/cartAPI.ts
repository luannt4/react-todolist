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
        const productResponse = await axios.get(`https://dummyjson.com/products/${productId}`);
        const stock = productResponse?.data.stock || 0;

        const response = await axios.put(`${API_BASE_URL}/carts/${cartId}`, {
            merge: true,
            products: [{id: productId, quantity}]
        });
        return { productId, quantity, stock };
    },

    deleteCartItem: async (cart: Cart, cartId: number, productId: number) => {
        // DummyJSON doesn't have a direct delete endpoint
        // Use PUT to modify the cart by removing the specific product
        try {
            // Remove the specific product from the cart
            const updatedProducts = cart.products.filter(product => product.id !== productId);

            // Prepare the updated cart payload
            const updatedCartPayload = {
                merge: false,
                products: updatedProducts.map(product => ({
                    id: product.id,
                    quantity: product.quantity
                }))
            };

            // Send PUT request to update the cart
            const response = await axios.put(`${API_BASE_URL}/carts/${cartId}`, updatedCartPayload);
            return response.data;

        } catch (error) {
            throw new Error("Failed to delete cart item");
        }
    }
};
