import {useMemo, useState} from 'react';
import {FilterState, PaginationState, Product} from "../types/Product";

export const useFilter = (initialProducts: Product[]) => {
    const [filters, setFilters] = useState<FilterState>({
        category: '',
        minPrice: 0,
        maxPrice: Infinity,
        minRating: 0
    });

    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 1,
        pageSize: 10,
        totalItems: initialProducts.length
    });

    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product =>
            (filters.category === '' || product.category === filters.category) &&

            product.rating >= filters.minRating
        );
    }, [initialProducts, filters]);

    const updateFilters = (newFilters: Partial<FilterState>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));

        // Reset to first page when filters change
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const paginatedProducts = useMemo(() => {
        const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
        const endIndex = startIndex + pagination.pageSize;

        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, pagination]);

    return {
        filteredProducts,
        paginatedProducts,
        filters,
        pagination,
        updateFilters,
        setPagination
    };
};
