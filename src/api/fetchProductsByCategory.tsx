// src/api.ts
import { SearchResponse} from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchProductsByCategory = async (category: string | undefined, page:number,limit:number): Promise<SearchResponse> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const skip = (page - 1) * limit;
    const categoryQuery = category !== 'all' ? `/category/${category}` : '';
    const response = await fetch(`${API_URL}/products/${categoryQuery}?limit=${limit}&skip=${skip}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const data = await response.json();
    
    return data;
};
