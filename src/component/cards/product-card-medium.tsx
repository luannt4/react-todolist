// src/TodoItem.tsx
import React from "react";
import { Product } from "../../types/Product";
import {  Link } from "react-router-dom";
import { useModal } from '../../contexts';
import ImageFill from "../ui/image";

import StarIcon from "../icons/star-icon";
import usePrice from "../product/use-price";
import CheckIcon from "../icons/check-icon";
import SearchIcon from "../icons/search-icon";
import { ROUTES } from "../../utils/routes";


interface Props {
    product : Product;
}


const ProductCardMedium: React.FC<Props> = ({ product }) => {
    const {id,title, category, price :productPrice,  discountPercentage, thumbnail,rating, reviews } = product;
    const {openModal } = useModal();
   

    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const productPriceOld = Number(Number(product?.price / (1 - (discountPercentage / 100))).toFixed(2));
    
    const {price, basePrice, discount} = usePrice({
        amount: productPrice ? productPrice : productPriceOld,
        baseAmount: productPriceOld,
        currencyCode: 'USD'
    });
    
    
    
    const RenderLabelStock: React.FC<Props> = ({ product }) => {
        const { stock} = product;
        const isInStock = product.stock > 0 ;
        const outOfStock =  !isInStock;
        if (Number(stock) < 1 || outOfStock) {
            return (
                <p className="font-medium flex items-center space-x-1 text-[12px] text-skin-label_out out_stock">
                    <CheckIcon fill={"text-skin-label_in"} opacity="1"/>
                    <span> Out Of Stock </span>
                </p>
            );
        }
        return (
            <p className="font-medium flex items-center space-x-1 text-[12px] text-skin-label_in in_stock">
                <CheckIcon fill={"text-skin-label_in"} opacity="1"/>
                <span> In Stock </span>
                <span className="text-brand-dark"><b>{stock}</b> products</span>
            </p>
        )
    }
    

    return (
        <div className="group border flex flex-col xl:flex-row items-center  gap-4 product-card relative  p-2 sm:p-4  h-full rounded bg-white">
            <div className="relative  product-card-img bg-slate-100">
                <Link
                    key={id} 
                    to={`${ROUTES.CATEGORIES}/${category}/${slug}-${id}`}
                    className="block ">
                        <ImageFill src={thumbnail|| 'Product Image'} width={180} height={180}   alt={title || 'Product Image'}/>
                        
                </Link>

                {discount && (
                    <div className="absolute top-0 left-2  z-10">
                        <span className="text-[10px] font-medium text-white uppercase inline-block bg-red-600 rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                            {'On Sale'}
                        </span>
                    </div>
                )}
                <button
                    className="group-hover:scale-100 group-hover:opacity-100 bg-white shadow-quickview opacity-0 scale-0 transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   px-4 py-4 rounded-full"
                    aria-label="Quick View Button"
                    onClick={() => openModal ("PRODUCT_VIEW", product)}
                    >
                    <SearchIcon width={20} height={20}  />
                </button>
            </div>
            
            <div className="flex flex-col h-full overflow-hidden relative product-card-content ">
                <p className="text-sm text-gray-500 mb-2 capitalize">
                    <Link 
                        key={category}
                        to={`${ROUTES.CATEGORIES}/${category}`}
                        className="transition-shadow"
                        >
                        {category}
                    </Link>
                </p>
                <p className={`w-full cursor-pointer font-medium  mb-2`}>
                    <Link 
                        key={id} 
                        to={`${ROUTES.CATEGORIES}/${category}/${slug}-${id}`}
                        className="group-hover:text-blue-500"
                        >
                        {title}
                    </Link>
                </p>
                <div className="flex text-gray-500 space-x-1 mb-2">
                    <div className="flex items-center">
                    {rating !== undefined && [...Array(5)].map((_,idx) => (
                        <StarIcon
                        key={idx + 1}
                        color={idx + 1 < rating ? '#F3B81F' : '#DFE6ED'}
                        className="w-3 h-3 mx-0.5"
                        />
                    ))}
                    </div>
                    
                    {reviews !== undefined && (
                        <span className="text-[13px] leading-4">
                        ({reviews.length} review)
                        </span>
                    )}
                </div>

                <div className="text-gray-500 text-lg mb-2">
                    <div className="flex gap-x-2 ">
                        <div className="text-black ">{price}</div>
                        {basePrice && (
                        <div className="line-through text-gray-400">
                            {basePrice}
                        </div>
                        )}
                    </div>
                </div>
                
                <div className="mb-5 text-gray-500">
                    <RenderLabelStock product={product}/>
                </div>
             
            </div>
            
        </div>
    );
}
 
export default ProductCardMedium;