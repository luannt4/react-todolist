import axios from 'axios';
import { Cart, CartItem } from '../../types/cart.types';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const cartApi = {
    getCart: async (userId: number) => {
        const response = await axios.get<Cart>(`${API_BASE_URL}/carts/user/${userId}`);
        return response.data;
    },

    addToCart: async (userId: number, productId: number, quantity: number = 1) => {
        const response = await axios.post<Cart>(`${API_BASE_URL}/carts/add`, {
            userId,
            products: [{ id: productId, quantity }]
        });
        return response.data;
    },

    updateCartItem: async (cartId: number, productId: number, quantity: number) => {
        const response = await axios.put<Cart>(`${API_BASE_URL}/carts/${cartId}`, {
            merge: true,
            products: [{ id: productId, quantity }]
        });
        return response.data;
    },

    deleteCartItem: async (cartId: number, productId: number) => {
        const response = await axios.put<Cart>(`${API_BASE_URL}/${cartId}`, {
            merge: true,
            products: [{ id: productId, quantity: 0 }]
        });
        return response.data;
    }
};
