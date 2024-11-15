// src/api.ts
import { Category } from "../types/Product";

// Hàm fetch Categories dữ liệu từ API 
export const fetchAllCategories = async (): Promise<Category[]> => {
    const API_URL = process.env.REACT_APP_API_URL;
    
    // Fetch all categories
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok)  throw new Error('Network response was not ok');
    const categories = await response.json();
    

    /*const result: Category[] = [];
    for (const category of categories) {
        const productsResponse = await fetch(`https://dummyjson.com/products/category/${category.name}`);
        const productsData = await productsResponse.json();
        // Create a Category object with totalProducts
        const categoryWithCount: Category = {
            slug: category.slug,
            name: category.name,
            url: category.url,
            total: productsData.products.length,  // Add totalProducts to each category
        };
  
      result.push(categoryWithCount);  // Add the new category with totalProducts to result
    }*/
    
    return categories;
};
