// src/api.ts
import { Product} from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchProductDetails = async (productId: number | undefined): Promise<Product> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    return response.json();
};
