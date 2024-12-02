import axios from 'axios';
import {Cart, CartProduct} from './cart.types';

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

    addToCart: async  (data: { userId: number; products: CartProduct[] }) => {
        try {
            const response = await axios.post<Cart>(`${API_BASE_URL}/carts/add`, data);
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
                merge: false,
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
            const response = await axios.put<Cart>(`${API_BASE_URL}/carts/${cartId}`, {
                merge: false,
                products: updatedProducts
            });
            return response.data;

        } catch (error) {
            throw new Error("Failed to delete cart item");
        }
    },
    clearCart : async (cartId: number) => {
        // DummyJSON doesn't have a direct delete endpoint
        try {
            const response = await axios.delete<Cart>(`${API_BASE_URL}/carts/${cartId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to delete cart item");
        }
    }
};
