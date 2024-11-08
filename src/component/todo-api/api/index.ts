// src/api.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from "../../../types/Todo";

const API_URL = "https://dummyjson.com/products";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}?limit=10`);
      const data = await response.json();
      return data.products;
    },
  });
};



