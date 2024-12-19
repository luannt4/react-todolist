'use client';

import ProductsCarousel from '../product/products-carousel';
import { LIMITS } from '../../settings/limits';
import {useQuery} from "@tanstack/react-query";
import {SearchResponse} from "../../types/Product";
import {fetchProductsByCategory} from "../../api/fetchProductsByCategory";
import {useMemo} from "react";

interface Props {
    carouselBreakpoint?: {} | any;
    className?: string;
    uniqueKey?: string;
    categoryName: string;
}

const RelatedProductFeed: React.FC<Props> = ({
         carouselBreakpoint,
         className,
         uniqueKey = 'related-product-popup',
         categoryName
     }) => {
    
    const page = 1;
    const limits = LIMITS.RELATED_PRODUCTS_LIMITS;
    const stableCategoryName = useMemo(() => categoryName, [categoryName]);
    const stablePage = useMemo(() => page, [page]);
    const stableLimits = useMemo(() => limits, [limits]);
    
    // Fetch products using react-query
    const { data, isLoading, error } = useQuery<SearchResponse>({
        queryKey: ['products', stableCategoryName,  stablePage,stableLimits],
        queryFn: () => fetchProductsByCategory(stableCategoryName,stablePage,stableLimits),
    });
    
    const {products = [] } = data  ?? {};
    
    if(products.length === 0) return null;
    
    return (
        <ProductsCarousel
            variant={"related"}
            sectionHeading="Related Products"
            className={className}
            products={products}
            loading={isLoading}
            error={error?.message}
            limit={LIMITS.RELATED_PRODUCTS_LIMITS}
            uniqueKey={uniqueKey}
            carouselBreakpoint={carouselBreakpoint}
        />
    );
};

export default RelatedProductFeed;
