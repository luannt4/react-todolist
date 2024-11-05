// src/TodoItem.tsx
import React from "react";
import { Product } from "../../type/Product";

interface Props {
    product : Product;
}

const ProductPopup: React.FC<Props> = ({ product }) => {
    const {title, category, price,thumbnail } = product;

   return (
    <div className="md:w-[600px] lg:w-[940px]  mx-auto p-1 lg:p-0 xl:p-3 bg-white text-center rounded-md">
        <img src={thumbnail} alt={title} className="inline-block"/>
        <p className={`w-full cursor-pointer font-medium `}>
            {title}
        </p>
        <p className="text-gray-500 text-lg">
            ${price}
        </p>
        <p className="text-gray-500 line-clamp-2 mb-10">
            {category}
        </p>
        
    </div>
  );
}
 
export default ProductPopup;