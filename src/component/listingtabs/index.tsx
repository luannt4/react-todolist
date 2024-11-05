import React, { useState,useMemo,  useEffect, useTransition } from "react";
import { fetchCategories } from '../../api/fetchAllCategories';
import { fetchProductsByCategory } from '../../api/fetchCategories-product';
import { useQuery } from "@tanstack/react-query";
import {category} from "../../type/Product"
import ListingTabsList from "./list";
import ListingTabsContainer from "./container";

const Listingtabs: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("beauty");
    const [isPending, startTransition] = useTransition();


    const handleTabClick = (slug:string) => {
        startTransition(() => {setActiveCategory(slug)});
    };

    // fetchCategories với useQuery
    const { data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories()
    });
   
    // Gọi API lấy sản phẩm theo danh mục hiện tại với useQuery
    const { data: products =[]  , isLoading, error } = useQuery({
        queryKey: ['products',activeCategory],
        queryFn: () => fetchProductsByCategory(activeCategory),
        enabled: !!activeCategory, // Chỉ gọi API khi có danh mục
    });

    // Sử dụng useMemo để chỉ lọc lại danh sách khi searchTerm thay đổi
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products;
    }, [activeCategory, products]);


    return (
        <div className="mb-8 lg:mb-15 max-w-screen-2xl m-auto">
            <ListingTabsList className={` py-2.5 rounded bg-white`} categories={categories} onNavClick={handleTabClick} activeTab={activeCategory} />
            
            {isPending && (
                <div className="flex justify-center items-center min-h-[300px] bg-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}

            <ListingTabsContainer products={products} isLoading={isLoading} error={error} />
        </div>
        
    );
}
export default Listingtabs; 