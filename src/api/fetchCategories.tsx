// src/api.ts
import { Category } from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchAllCategories = async (): Promise<Category[]> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok)  throw new Error('Network response was not ok');
    return response.json();
};
