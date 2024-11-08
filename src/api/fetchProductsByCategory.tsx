// src/api.ts
import { Product} from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchProductsByCategory = async (category: string | undefined): Promise<Product> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${API_URL}/products/category/${category}?limit=10`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const data = await response.json();
    return data.products;
};
