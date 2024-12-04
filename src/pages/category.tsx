import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchResponse } from "../types/Product";

import { fetchProductsByCategory } from "../api/fetchProductsByCategory";
import ProductCard from "../component/cards/product-card";
import ProductCardSkeleton from "../component/product/product-skeleton";
import {useState} from "react";
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "../component/ui/pagination";
import { LIMITS } from "../settings/limits";
import Container from "../component/ui/container";
import Breadcrumb from "../component/ui/breadcrumb";
import SearchTopBar from "../component/category/search-top-bar";

const CategoriesProductPage = () => {
    const [page, setPage] = useState(1);
    const limit = LIMITS.PAGECATEGORY_LIMITS;
    const [sortOption, setSortOption] = useState<string>('price');

    // Get categoryName query parameters
    const { categoryName} = useParams<{ categoryName: string }>();

    // Fetch products using react-query
    const { data, isLoading } = useQuery<SearchResponse>({
        queryKey: ['products', categoryName, limit, page],
        queryFn: () => fetchProductsByCategory(categoryName,page,limit),
        enabled: !!categoryName, // Chỉ gọi API khi có từ khóa
    });
    
    const {products = [], total } = data  ?? {};

    const handlePageChange  = (newPage: number) => {
        setPage(newPage);
    };

    // Handle Sorting
    const sortedProducts = products?.slice().sort((a, b) => {
        if (sortOption === 'price') return a.price - b.price;
        if (sortOption === 'price-h') return b.price - a.price;
        if (sortOption === 'rating') return b.rating - a.rating;
        if (sortOption === 'stock') return b.stock - a.stock;
        return 0;
    });


    return (
        <Container>
            <Breadcrumb />
            <div className={"flex justify-between"}>
                <h1 className="text-2xl font-medium mb-6 capitalize">{categoryName}</h1>
                {/* Sorting Options */}
                <SearchTopBar sortOption={sortOption} setSortOption={setSortOption}/>
            </div>


            {/* Loading state */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, id) => (
                    <ProductCardSkeleton key={id}/>
                ))}
                </div>
            )}

            {/*Showing search results */}
            {sortedProducts && (
                <div className="flex pt-7 lg:pt-7 pb-10 lg:pb-16">
                    <div className="sticky hidden h-full shrink-0 ltr:pr-7 rtl:pl-7  lg:block w-[300px] top-16 ">

                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                        </div>
                        <div className="pagination bg-white rounded mt-10">
                            <Pagination
                                current={page}
                                pageSize={limit}
                                total={total}
                                onChange={handlePageChange }

                                prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                                nextIcon={<GrNext size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                            />
                        </div>
                    </div>
                </div>
                
            )}

            {/* No results message */}
            {products?.length === 0  && !isLoading && (
                <div className="no-results  min-h-52 flex  justify-center items-center">
                    <h3 className="text-lg ">Not Product found.</h3>
                </div>
            )}

        </Container>
    );
    };
  
export default CategoriesProductPage;
  