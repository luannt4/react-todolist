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
        rating: 1,
        page: 1,
        limit: LIMITS.PAGECATEGORY_LIMITS,
    });


    const [sortOption, setSortOption] = useState<string>('price');

    // Get categoryName query parameters
    const { categoryName} = useParams<{ categoryName: string }>();
    // Fetch products using react-query
    const { data: productData, isLoading, refetch } = useQuery<SearchResponse>({
        queryKey: ['products', categoryName, filters.limit, filters.page],
        queryFn: () => fetchProductsByCategory(categoryName,filters.page, filters.limit),
    });

    const filterProducts = (products: any[]) => {
        let filtered = products;

        // Filter by price
        filtered = filtered.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        // Filter by status
        if (filters.status === 'onsale') {
            filtered = filtered.filter((p) => p.discountPercentage > 0);
        } else if (filters.status === 'instock') {
            filtered = filtered.filter((p) => p.stock > 10);
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

    const {products=[]} = productData  ?? {};
    const totalProducts = productData?.total || 0;

    const filteredProducts = filterProducts(products);

    // Total filtered products
    const totalFilteredProducts = filteredProducts.length;

    // Reset pagination when the number of filtered products changes
    /*useEffect(() => {
        if (filters.page > Math.ceil(totalFilteredProducts / filters.limit)) {
            setFilters((prevFilters) => ({ ...prevFilters, page: 1 }));
        }
    }, [totalFilteredProducts, filters.limit, filters.page]);*/

    // Paginate filtered products
   // const paginatedProducts = filteredProducts.slice((filters.page - 1) * filters.limit, filters.page * filters.limit);

    // Handle changes in the filters state
    const handleFilterChange  = (key: string,value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

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
                    <StatusFilter value={filters.status} onStatusChange={(status) => handleFilterChange('status', status)} />

                    {/* Rating Filter */}
                    <RatingFilter value={filters.rating} onRatingChange={(rating) => handleFilterChange('rating', rating)} />
                </div>

                <div className="w-full">
                    <div className={"flex justify-between"}>
                        <h1 className="text-sm ">
                            Showing <span className="font-bold">{totalFilteredProducts}</span> products
                            {` of ${totalProducts} available products.`}

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

                    {/* No results message */}
                    {filteredProducts.length === 0 && totalFilteredProducts === 0 && (
                        <div className="no-results  min-h-52 flex  justify-center items-center">
                            <h3 className="text-lg ">Not Product found.</h3>
                        </div>
                    )}

                    <div className="pagination bg-white rounded mt-10">
                        <Pagination
                            current={filters.page}
                            pageSize={filters.limit}
                            total={totalProducts}
                            onChange={(page) => handleFilterChange('page',page)}
                            prevIcon={<GrPrevious size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                            nextIcon={<GrNext size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                        />
                    </div>
                </div>
            </div>



        </Container>
    );
    };

export default CategoriesProductPage;
  