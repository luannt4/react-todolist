// src/api.ts
import {BlogResponse} from "../types/Product";

// Hàm fetch Post dữ liệu từ API
export const fetchPosts = async ( page:number,limit:number): Promise<BlogResponse> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const skip = (page - 1) * limit;
    const response = await fetch(`${API_URL}/posts?limit=${limit}&skip=${skip}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    
    return  response.json() ;
};
