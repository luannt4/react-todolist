import { useState } from 'react';
import {LIMITS} from "../settings/limits";

export interface Filters {
    category: string;
    priceRange: [number, number];
    status: string;
    rating: number;
    page: number;
    limit: number;
}

export const useFilters = (initialFilters: Filters) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    const updateFilter = (key: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: key === 'rating' ? 1 : prev.page, // Reset page to 1 when rating changes
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            priceRange: [0, 1000],
            status: 'all',
            rating: 1,
            page: 1,
            limit: 10,
        });
    };

    return { filters, updateFilter, clearFilters };
};