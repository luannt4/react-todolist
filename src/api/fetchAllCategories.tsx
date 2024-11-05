// src/api.ts
import { useQuery } from '@tanstack/react-query';
import { Product,category, SearchResponse,QueryOptionsType } from "../type/Product";

const API_URL = "https://dummyjson.com";

// Hàm fetch Categories dữ liệu từ API 
export const fetchAllCategories = async (): Promise<category> => {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};
