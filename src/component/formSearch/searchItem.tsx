// src/TodoItem.tsx
import React from "react";
import { Product } from "../../types/Product";
import ImageFill from "../ui/image";
import {  Link } from "react-router-dom";

interface SearchItemProps {
    product : Product;
}


const SearchItem: React.FC<SearchItemProps> = ({ product }) => {
    const {id,title,  price, discountPercentage, thumbnail } = product;
    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const priceOld = Number(price / (1 - (discountPercentage / 100))).toFixed(2);
   return (
    <Link 
        key={id} 
        to={`/product/${slug}-${id}`}
        className="block py-2.5 ps-5 pe-10 border-b border-black/5 scroll-snap-align-start transition-colors duration-200 hover:bg-gray-100/80">
        <div className="flex items-center justify-start w-full h-auto group">
            <div className="relative flex w-20 pb-[70px] bg-white rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
                <ImageFill src={thumbnail|| 'Product Image'} height={"230px"}   alt={title || 'Product Image'}/>
            </div>
            <div className="flex flex-col w-full overflow-hidden">
                <h3 className="font-medium text-15px  mb-1.5 group-hover:text-blue-500">{title}</h3>
                <div className="flex space-x-2 ">
                    <div className="text-black dark:text-white">{price}$</div>
                        <div className="line-through text-gray-400">{priceOld}$</div>
                </div>
                
            </div>
        </div>
       
    </Link>
  );
}
 
export default SearchItem;