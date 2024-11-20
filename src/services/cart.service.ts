// src/services/cart.service.ts
import { Product } from '../types/Product';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const cartService = {
  async fetchProducts(): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products`);
    return response.data.products;
  },

  async fetchProduct(productId: number): Promise<Product> {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  },
};
