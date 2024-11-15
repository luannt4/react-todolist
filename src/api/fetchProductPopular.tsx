// src/api.ts
import { SearchResponse } from "../types/Product";

// Hàm fetch Product dữ liệu từ API 
export const fetchProductPopular = async ( page:number,limit:number): Promise<SearchResponse> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const skip = (page - 1) * limit;
    const response = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    
    // Filter for popular products based on a rating threshold (e.g., 4.5 or above)
    const data = await response.json() ;
    const popularProducts = data.products.filter((product: { rating: number }) => product.rating >= 4);
    return {
        ...data,
        products: popularProducts
    }
};
