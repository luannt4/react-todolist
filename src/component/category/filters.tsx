import React from "react";

import RatingFilter from "./ratingFilter";
import SelectFilter from "./SelectFilter";
import ClearFilters from "./ClearFilters";

interface Props {
    filters: any;
    updateFilter: (key: string, value: any) => void;
    clearFilters: () => void;
}

export const ShopFilters: React.FC<Props>  = ({ filters, updateFilter, clearFilters }) => {

    return (
        <div className="bg-white ">
            <SelectFilter
                label="Category"
                value={filters.category}
                options={['all', 'electronics', 'furniture', 'clothing']}
                onChange={(value) => updateFilter('category', value)}
            />
            {/* Rating Filter */}
            <RatingFilter value={filters.rating} onRatingChange={(rating) => updateFilter('rating', rating)} />

            <ClearFilters onClear={clearFilters} />
        </div>
    );
};