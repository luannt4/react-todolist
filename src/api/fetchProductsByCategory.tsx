// src/api.ts
import { useQuery } from '@tanstack/react-query';
import { Product,category, SearchResponse,QueryOptionsType } from "../type/Product";

const API_URL = "https://dummyjson.com";

// Hàm fetch Categories dữ liệu từ API  'https://dummyjson.com/products/categories'
export const fetchProductsByCategory = async (category: string): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/category/${category}?limit=10`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const data = await response.json();
    return data.products;
};
