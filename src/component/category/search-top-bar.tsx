import React, {useState} from "react";
import {Product} from "../../types/Product";
interface Props {
    sortOption : string;
    setSortOption: (value: string) => void;
}
const SearchTopBar: React.FC<Props> = ({sortOption,setSortOption}) => {

    return (
        <div className="mb-4 flex gap-1 justify-center items-center">
            <label htmlFor="sort" className="block text-sm ">
                Sort By:
            </label>
            <select
                id="sort"
                className="border border-gray-300 rounded p-2 text-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="price">Price (Low to High)</option>
                <option value="price-h">Price (High to Low)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="stock">Stock (High to Low)</option>
            </select>
        </div>
    )
}
export default SearchTopBar;
