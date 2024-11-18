// src/api.ts
import { Order } from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchOrder = async (id: number): Promise<Order> => {
    const API_URL = process.env.REACT_APP_API_URL;
    
    // Fetch Order
    const response = await fetch(`${API_URL}/c/cfb2-e68a-4641-b6ce`);
    if (!response.ok)  throw new Error('Network response was not ok');
    return await response.json();
    
    
};
