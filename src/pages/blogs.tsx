import Container from "../component/ui/container";
import {useFilters} from "../hooks/useFilters";
import {fetchProductsByCategory} from "../api/fetchProductsByCategory";
import {SearchResponse} from "../types/Product";
import {useQuery} from "@tanstack/react-query";
import {ShopFilters} from "../component/category/filters";
import ProductCard from "../component/cards/product-card";
import Pagination from "../component/ui/pagination";
import {GrNext, GrPrevious} from "react-icons/gr";
import React, {useEffect} from "react";

const BlogsPage = () => {
    const { filters, updateFilter, clearFilters } = useFilters({
        category: 'all',
        priceRange: [0, 1000],
        status: 'all',
        rating: 1,
        page: 1,
        limit: 15,
    });

    // Fetch products using react-query
    const { data, isLoading, isError, refetch } = useQuery<SearchResponse>({
        queryKey: ['products', filters.category, filters.limit, filters.page],
        queryFn: () => fetchProductsByCategory(filters.category,filters.page, filters.limit),
        select: (originalData: SearchResponse) => {
            return {
                ...originalData,
                products: originalData.products.filter(
                    (product) => !filters.rating || product.rating >= filters.rating
                )
            };
        }
    });
    console.log('filters.rating',filters.rating);
    // Refetch when filters change
    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    return (
        <>
            <Container>
                <h1 className="text-2xl font-medium mb-6 capitalize">Blog Articles</h1>
                <div className="flex pb-10 gap-10">
                    <div className="sticky hidden h-full shrink-0 ltr:pr-7 rtl:pl-7  lg:block w-[250px] top-16 ">
                        <ShopFilters filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} />
                    </div>
                    <div className="w-full">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : isError ? (
                            <p>Error fetching products.</p>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                {data?.products.map((product: any) => (
                                    <ProductCard key={product.id} product={product}/>
                                ))}
                            </div>
                        )}
                        <div className="pagination bg-white rounded mt-10">
                            <Pagination
                                current={filters.page}
                                pageSize={filters.limit}
                                total={data?.total || 0}
                                onChange={(page) => updateFilter('page', page)}
                                prevIcon={<GrPrevious size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                                nextIcon={<GrNext size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default BlogsPage;
  