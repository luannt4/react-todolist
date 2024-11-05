import React, { useState,useMemo,  useEffect, useTransition } from "react";
import { fetchSearchProducts } from '../../api/index';
import SearchItem from "./searchItem";
import { useQuery } from "@tanstack/react-query";

const FormSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");

    
    // Gọi API tìm kiếm sản phẩm với useQuery dựa trên từ khóa và danh mục
    const { data: products=[], isLoading, error } = useQuery({
        queryKey: ['products', searchTerm, category],
        queryFn: () => fetchSearchProducts(searchTerm, category),
        enabled: !!searchTerm, // Chỉ gọi API khi có từ khóa
    });
   
    // Sử dụng useMemo để chỉ lọc lại danh sách khi searchTerm thay đổi
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products;
    }, [searchTerm, products]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Đảm bảo rằng việc lọc được thực hiện dưới mức ưu tiên thấp hơn bằng useTransition
        /*startTransition(() => {
          setSearchTerm(value);
        });*/
    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCategory(value);
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
                    onChange={handleSearchChange}
                />
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="border rounded px-4 py-2 w-40 bg-white"
                >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="beauty">Beauty</option>
                    <option value="groceries">Groceries</option>
                    <option value="kitchen-accessories">Kitchen-accessories</option>
                    {/* Add more categories as needed */}
                </select>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Search
                </button>
            </form>

            {isLoading && (
                <div className="text-center py-4">Loading...</div>
            )}

            {error && (
                <div className="text-red-500 text-center py-4">Error: {error.message}</div>
            )}


                <ul className="grid grid-cols-4  gap-3">
                    {filteredProducts.map((product) => (
                        <SearchItem
                        key = {product.id}
                        product = {product}
                        />
                    ))}
                </ul>
           
            
            {products.length === 0  && !isLoading && (
                <div className="text-center py-4">No products found</div>
            )}
        </div>
    );

}
export default FormSearch;