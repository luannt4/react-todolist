// src/api.ts
import { useQuery } from '@tanstack/react-query';
import { Product, QueryOptionsType } from "../types/Product";

const API_URL = "https://dummyjson.com";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products?limit=10`);
      const data = await response.json();
      return data.products;
    },
  });
};

// Hàm fetch dữ liệu từ API dựa trên từ khóa và danh mục
export const fetchSearchProducts = async (query: string, category: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok)  throw new Error('Network response was not ok');
  const data = await response.json();

  // Lọc sản phẩm theo danh mục nếu có
  return category ? data.products.filter((p: Product) => p.category === category) : data.products;
};




export const useSearchQuery = (options: QueryOptionsType) => {
  const searchTerm = options.text;
  
  return useQuery<Product[], Error>({
    queryKey: ['products',searchTerm],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok)  throw new Error('Network response was not ok');
      const data = await response.json();
      return data.products;
    },
    enabled: Boolean(searchTerm),
  });
};