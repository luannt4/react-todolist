// src/api.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from "../../../type/Todo";
import axios from "axios";

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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, Error, Product>({
    mutationFn: async (product) => {
      const response = await fetch(`${API_URL}/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, Error, Omit<Product, 'id'>>({
    mutationFn: async (product) => {
      const response = await fetch(API_URL + '/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
    },
  });
};