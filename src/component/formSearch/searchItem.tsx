// src/TodoItem.tsx
import React from "react";
import { Product } from "../../types/Product";
import {  Link } from "react-router-dom";
import usePrice from "../product/use-price";

interface SearchItemProps {
    product : Product;
}


const SearchItem: React.FC<SearchItemProps> = ({ product }) => {
    const {id,title,  price:productPrice, discountPercentage, thumbnail } = product;
    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const productPriceOld = Number(Number(product?.price / (1 - (discountPercentage / 100))).toFixed(2));
    const {price, basePrice, discount} = usePrice({
        amount: productPrice ? productPrice : productPriceOld,
        baseAmount: productPriceOld,
        currencyCode: 'USD'
    });

    return (
    <Link 
        key={id} 
        to={`/product/${slug}-${id}`}
        className="block py-2.5 ps-5 pe-10 border-b border-black/5 scroll-snap-align-start transition-colors duration-200 hover:bg-gray-100/80">
        <div className="flex items-center justify-start w-full h-auto group">
            <div className="relative w-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
                <img src={thumbnail}  width={90} className="object-cover" alt={title || 'Product Image'}/>
            </div>
            <div className="flex flex-col w-full overflow-hidden">
                
                <h3 className="font-medium text-15px  mb-1.5 group-hover:text-blue-500">{title}</h3>
                <div className="flex gap-x-2 ">
                    <div className="text-black ">{price}</div>
                    {basePrice && (
                    <div className="line-through text-gray-400">
                        {basePrice}
                    </div>
                    )}
                </div>
                
            </div>
        </div>
       
    </Link>

  );
}
 
export default SearchItem;