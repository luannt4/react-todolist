import React, { useState,   useTransition } from "react";
import { fetchAllCategories } from '../../api/fetchCategories';
import { fetchProductsByCategory } from '../../api/fetchProductsByCategory';
import { useQuery } from "@tanstack/react-query";
import ListingTabsList from "./listingtabs-list";
import ListingTabsContainer from "./listingtabs-container";
import { LIMITS } from "../../settings/limits";
import { SearchResponse } from "../../types/Product";

const Listingtabs: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("groceries");
    const [isPending, startTransition] = useTransition();
    const limit = LIMITS.PAGESEARCH_LIMITS;
    const page : number = 1;

    const handleTabClick = (slug:string) => {
        startTransition(() => {setActiveCategory(slug)});
    };

    // Gọi API lấy fetchAllCategories với useQuery
    const { data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchAllCategories()
    });
   
    // Gọi API lấy sản phẩm theo danh mục hiện tại với useQuery
    const { data , isLoading, error } = useQuery<SearchResponse>({
        queryKey: ['products',activeCategory,limit, page],
        queryFn: () => fetchProductsByCategory(activeCategory,page,limit),
        enabled: !!activeCategory, // Chỉ gọi API khi có danh mục
    });
     const {products = [] } = data  ?? {};

    // Sử dụng useMemo để chỉ lọc lại danh sách khi searchTerm thay đổi
    /*const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products;
    }, [activeCategory, products]);*/


    return (
        <div className="mb-8 lg:mb-15 ">
            <ListingTabsList className={`px-5 py-2.5 rounded bg-white`} categories={categories} onNavClick={handleTabClick} activeTab={activeCategory} />
            
            {isPending && (
                <div className="flex justify-center items-center min-h-[300px] bg-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}

            <ListingTabsContainer products={products} isLoading={isLoading} error={error} variant="medium"/>
        </div>
        
    );
}
export default Listingtabs; 