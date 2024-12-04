import React, {useState} from "react";
import {CategoryFilter} from "./category-filter";
import PriceFilter from "./priceFilter";
import {Product} from "../../types/Product";

export const ShopFilters: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [ratingFilter, setRatingFilter] = useState<number>(0);




    return (
        <div className="bg-white ">
           <CategoryFilter/>
            {/* Price Filter */}
            <PriceFilter onPriceChange={(min, max) => setPriceRange([min, max])} />
        </div>
    );
};