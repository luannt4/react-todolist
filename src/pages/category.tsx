import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {SearchResponse} from "../types/Product";

import { fetchProductsByCategory } from "../api/fetchProductsByCategory";
import ProductCard from "../component/cards/product-card";
import ProductCardSkeleton from "../component/product/product-skeleton";
import React, {useEffect, useState} from "react";
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "../component/ui/pagination";
import { LIMITS } from "../settings/limits";
import Container from "../component/ui/container";
import Breadcrumb from "../component/ui/breadcrumb";
import SearchTopBar from "../component/category/search-top-bar";
import {CategoryFilter} from "../component/category/category-filter";
import PriceFilter from "../component/category/priceFilter";
import StatusFilter from "../component/category/statusFilter";
import RatingFilter from "../component/category/ratingFilter";

const CategoriesProductPage = () => {
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: [0, 1000],
        status: 'all',
        rating: 0,
        page: 1,
        limit: LIMITS.PAGECATEGORY_LIMITS,
        total: 0, // Add total
    });


    const [sortOption, setSortOption] = useState<string>('price');

    // Get categoryName query parameters
    const { categoryName} = useParams<{ categoryName: string }>();
    // Fetch products using react-query
    const { data: productData, isLoading,refetch } = useQuery<SearchResponse>({
        queryKey: ['products', categoryName, filters.limit, filters.page],
        queryFn: () => fetchProductsByCategory(categoryName,filters.page, filters.limit),
        enabled: !!categoryName, // Chỉ gọi API khi có từ khóa
    });



    // Refetch when filters change
    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    // Update total when filtered products change
    useEffect(() => {
        if (!isLoading && productData?.products) {
            const total = productData.total || productData.products.length;
            setFilters((prev) => ({ ...prev, total }));
            console.log('Update total', filters);
        }
    }, [productData?.products,isLoading, filters.priceRange, filters.status, filters.rating]);


    const filterProducts = (products: any[]) => {
        let filtered = products;

        // Filter by price
        filtered = filtered.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        // Filter by status
        if (filters.status === 'onsale') {
            filtered = filtered.filter((p) => p.discountPercentage > 0);
        } else if (filters.status === 'instock') {
            filtered = filtered.filter((p) => p.stock > 0);
        }

        // Filter by rating
        filtered = filtered.filter((p) => p.rating >= filters.rating);

        // Handle Sorting
        filtered = filtered?.slice().sort((a, b) => {
            if (sortOption === 'price') return a.price - b.price;
            if (sortOption === 'price-h') return b.price - a.price;
            if (sortOption === 'rating') return b.rating - a.rating;
            if (sortOption === 'stock') return b.stock - a.stock;
            return 0;
        });

        return filtered;
    };


    const handleFilterChange  = (key: string,value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1, // Reset to page 1 on filter change
        }));
    };

    const {products=[], total} = productData  ?? {};

    const filteredProducts = filterProducts(products);

    return (
        <Container>
            <Breadcrumb />

            {/*Showing search results */}
            <div className="flex pb-10 gap-10">
                <div className="sticky hidden h-full shrink-0 ltr:pr-7 rtl:pl-7  lg:block w-[250px] top-16 ">
                    {/* Category Filter */}
                    <CategoryFilter/>
                    {/* Price Filter */}
                    <PriceFilter onPriceChange={(min, max) => handleFilterChange('priceRange', [min, max])} />

                    {/* Status Filter */}
                    <StatusFilter onStatusChange={(status) => handleFilterChange('status', status)} />

                    {/* Rating Filter */}
                    <RatingFilter onRatingChange={(rating) => handleFilterChange('rating', rating)} />
                </div>

                <div className="w-full">
                    <div className={"flex justify-between"}>
                        <h1 className="text-2xl font-medium mb-6 capitalize">
                            <span>
                              Page {filters.page} / {Math.ceil(filters.total / filters.limit)}
                            </span>
                        </h1>
                        {/* Sorting Options */}
                        <SearchTopBar sortOption={sortOption} setSortOption={setSortOption}/>
                    </div>
                    {/* Loading state */}
                    {isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {Array.from({length: 8}).map((_, id) => (
                                <ProductCardSkeleton key={id}/>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                    <div className="pagination bg-white rounded mt-10">
                        {filters.total}
                        <Pagination
                            current={filters.page}
                            pageSize={filters.limit}
                            total={filters.total}
                            onChange={() =>handleFilterChange('page', filters.page)}
                            prevIcon={<GrPrevious size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                            nextIcon={<GrNext size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                        />
                    </div>
                </div>
            </div>

            {/* No results message */}
            {products?.length === 0 && !isLoading && (
                <div className="no-results  min-h-52 flex  justify-center items-center">
                    <h3 className="text-lg ">Not Product found.</h3>
                </div>
            )}

        </Container>
    );
    };

export default CategoriesProductPage;
  