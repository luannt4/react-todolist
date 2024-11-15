// src/api.ts
import { SearchResponse } from "../types/Product";

// Hàm fetch Product dữ liệu từ API 
export const fetchProductNewProduct = async ( page:number,limit:number): Promise<SearchResponse> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const skip = (page - 1) * limit;
    const response = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const data = await response.json() ;

    // Sort products by ID in descending order to approximate "newness"
    const sortedProducts = data.products.sort((a: { id: number }, b: { id: number }) => b.id - a.id);

    return {
        ...data,
        products: sortedProducts
    }
};
