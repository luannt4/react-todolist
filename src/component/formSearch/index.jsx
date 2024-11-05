import React, { useState,useMemo,  useEffect } from "react";
import { fetchSearchProducts,useSearchQuery } from '../../api/index';
import SearchItem from "./searchItem";
import { useQuery } from "@tanstack/react-query";

const FormSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    
    // Query products
    const { data: products, isPending, error } = useQuery({
        queryKey: ['products', searchTerm],
        queryFn: () => fetchSearchProducts(searchTerm),
        enabled: Boolean(searchTerm),
    });
   
    // Filter and memoize results
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products;
    }, [products]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

   
    return (
        <div className="max-w-screen-2xl mx-auto p-4 bg-gray-100 rounded shadow mb-10">
            <form  className="flex flex-row gap-2 mb-4">
                <label className="block mb-1">Search:</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            {/*isPending && (
                <div className="text-center py-4">Loading...</div>
            )*/}

            {error && (
                <div className="text-red-500 text-center py-4">Error: {error.message}</div>
            )}

            { searchTerm.length > 2 && (
                <ul className="grid grid-cols-4  gap-3">
                    {filteredProducts.map((product) => (
                        <SearchItem
                        key = {product.id}
                        product = {product}
                        />
                    ))}
                </ul>
            )}
            
            {filteredProducts.length === 0  && !isPending && (
                <div className="text-center py-4">No products found</div>
            )}
        </div>
    );

}
export default FormSearch;