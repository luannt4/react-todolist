import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchResponse } from "../types/Product";

import { fetchProductsByCategory } from "../api/fetchProductsByCategory";
import ProductCard from "../component/product/product-card";
import ProductCardSkeleton from "../component/product/product-skeleton";
import {useState} from "react";
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "../component/ui/pagination";
import { LIMITS } from "../settings/limits";

const CategoriesProductPage = () => {
    const [page, setPage] = useState(1);
    const limit = LIMITS.PAGESEARCH_LIMITS;

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

    return (
        <div>
        <h1 className="text-2xl font-medium mb-6 capitalize">{categoryName}</h1>
        
        {/* Loading state */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, id) => (
                    <ProductCardSkeleton key={id}/>
                ))}
                </div>
            )}

            {/*Showing search results */}
            {products && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {products.map((product) => (
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
                </>
                
            )}

            {/* No results message */}
            {products?.length === 0  && !isLoading && (
                <div className="no-results  min-h-52 flex  justify-center items-center">
                    <h3 className="text-lg ">Not Product found.</h3>
                </div>
            )}

        </div>
    );
    };
  
export default CategoriesProductPage;
  