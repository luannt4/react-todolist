// src/TodoItem.tsx
import React from "react";
import { Product } from "../../type/Product";

interface SearchItemProps {
    product : Product;
}


const ProductItem: React.FC<SearchItemProps> = ({ product }) => {
    const {id, title, category, price } = product;

   return (
    <li className=" gap-2 p-2 border rounded bg-white">
        <p className={`w-full cursor-pointer font-medium `}>
            {title}
        </p>
        <p className="text-gray-500 text-lg">
            ${price}
        </p>
        <p className="text-gray-500 mb-5 line-clamp-2">
            {category}
        </p>
       
    </li>
  );
}
 
export default ProductItem;