// src/api.ts
import {Post} from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchPostDetails = async (slug: number | undefined): Promise<Post> => {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${API_URL}/posts/${slug}`);
    if (!response.ok)  throw new Error('Network response was not ok');
    return response.json();
};
