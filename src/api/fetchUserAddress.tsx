// src/api.ts
import { UserAddress } from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchUserAddress = async (id: number): Promise<UserAddress> => {
    const API_URL = process.env.REACT_APP_API_URL;
    
    // Fetch UserAddress
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const userAddress = await response.json();
    

    
    return userAddress;
};
