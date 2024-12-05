import React, {useState} from "react";
import {CategoryFilter} from "./category-filter";
import PriceFilter from "./priceFilter";
import {Product} from "../../types/Product";
import {useFilters} from "../../hooks/useFilters";
import {useQuery} from "@tanstack/react-query";
import {fetchProductsByCategoryFilter} from "../../api/fetchProductsByCategoryFilter";

export const ShopFilters: React.FC = () => {
    const { filters, updateFilter, updateTotal } = useFilters();

    return (
        <div className="bg-white ">

        </div>
    );
};