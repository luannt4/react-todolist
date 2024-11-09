// src/api.ts
import { SearchResponse, Product} from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchProductsBySearch = async (query: string, category: string, page:number, limit:number): Promise<SearchResponse> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const skip = (page - 1) * limit;
    const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const data = await response.json() 

    // Lọc sản phẩm theo danh mục nếu có
    return {
        ...data,
        products: category ? data.products.filter((p: Product) => p.category === category) : data.products
    }
};