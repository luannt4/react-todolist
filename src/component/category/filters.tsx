import React from "react";

import RatingFilter from "./ratingFilter";
import {FilterState} from "../../types/Product";
import {CategoryFilter} from "./category-filter";

export const Filters: React.FC  = () => {

    return (
        <div className="bg-white ">
            
            {/* Category Filter */}
            <CategoryFilter/>

            {/* Rating Filter */}

        </div>
    );
};