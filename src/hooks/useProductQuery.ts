import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types/Product';

export const useProductQuery = (category: string) => {
    return useQuery<Product[]>({
        queryKey: ['products', category],
        queryFn: async () => {
            const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
            return response.data.products;
        },
        enabled: !!category
    });
};
