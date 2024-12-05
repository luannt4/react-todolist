import { useState } from 'react';
import {LIMITS} from "../settings/limits";

export const useFilters = () => {
    const [filters, setFilters] = useState({
        rating: 0,
        priceRange: [0, 1000],
        status: 'all',
        page: 1,
        limit: LIMITS.PAGECATEGORY_LIMITS,
        total: 0, // Track total items
    });

    const updateFilter = (key: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: key === 'rating' || key === 'priceRange' || key === 'status' ? 1 : prev.page, // Reset page on filter change
        }));
    };

    const updateTotal = (total: number) => {
        setFilters((prev) => ({
            ...prev,
            total,
        }));
    };

    return { filters, updateFilter, updateTotal };
};