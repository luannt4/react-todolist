import axios from 'axios';

export const fetchProductsByCategoryFilter = async (
    categoryName: string,
    page: number,
    limit: number,
    filters: { rating?: number; priceRange?: [number, number]; status?: string }
) => {
    const params: Record<string, any> = {
        limit,
        skip: (page - 1) * limit,
        rating: filters?.rating || undefined,
        minPrice: filters.priceRange?.[0],
        maxPrice: filters.priceRange?.[1],
        status: filters?.status || undefined,
    };

    const { data } = await axios.get(`https://dummyjson.com/products/category/${categoryName}`, {
        params,
    });

    // Ensure `data` includes `total` for pagination
    return { products: data.products, total: data.total };
};