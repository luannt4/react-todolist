// src/TodoItem.tsx
import React from "react";
import { Product } from "../../types/Product";
import {  Link } from "react-router-dom";
import {useCart, useModal } from '../../contexts';
import ImageFill from "../ui/image";
import AddToCart from './add-to-cart';
import CompareButton from "../compare/compare-button";
import WishlistButton from "../wishlist/wishlist-button";
import StarIcon from "../icons/star-icon";
import usePrice from "./use-price";


interface Props {
    product : Product;
}


const ProductCard: React.FC<Props> = ({ product }) => {
    const {id,title, category,  discountPercentage, thumbnail } = product;
    const {openModal } = useModal();
   

    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const priceOld = Number(Number(product?.price / (1 - (discountPercentage / 100))).toFixed(2));

    const {price, basePrice, discount} = usePrice({
        amount: priceOld ? priceOld : product?.price,
        baseAmount: product?.price,
        currencyCode: 'USD'
    });
    console.log('basePrice',basePrice);
    console.log('priceOld',priceOld);
    const RenderAddToCart: React.FC<Props> = ({ product }) => {
        const {id, stock, availabilityStatus} = product;
        const {isInCart, isInStock} = useCart();
        const outOfStock = isInCart(id) && !isInStock(id);
       
        if (Number(stock) < 1 || outOfStock) {
            return (
                <span className="block text-sm leading-6 px-4 py-2 bg-red-400 rounded-full text-white text-[13px] items-center justify-center">
                    Out Of Stock
                </span>
            );
        }

        if (availabilityStatus === 'Low Stock') {
            return (
                <Link
                    className="block leading-6 px-4 py-2 bg-blue-500 rounded-full  text-white text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
                    aria-label="Count Button"
                    to={`/product/${slug}-${id}`}
                >
                    Product Details
                </Link>
            );
        }

        return <AddToCart product={product} />;
    }
    return (
        <div className=" gap-2 p-2 border rounded bg-white group">
            <div className="relative overflow-hidden bg-slate-100 ">
                <Link
                    key={id} 
                    to={`/product/${slug}-${id}`}
                    className="block ">
                        <ImageFill src={thumbnail|| 'Product Image'} height={230}   alt={title || 'Product Image'}/>
                        
                </Link>
                <button
                    className="group-hover:scale-100 group-hover:opacity-100 bg-blue-500 opacity-0 scale-0 transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   text-white flex gap-2 px-4 py-2 font-normal rounded-full text-sm "
                    aria-label="Quick View Button"
                    onClick={() => openModal ("PRODUCT_VIEW", product)}
                    >
                    Quick view
                </button>
            </div>
            
            <div className="py-3 px-1.5 ">
                <p className="text-gray-500 mb-2 capitalize">
                    <Link 
                        key={category}
                        to={`/category/${category}`}
                        className="transition-shadow"
                        >
                        {category}
                    </Link>
                </p>
                <p className={`w-full cursor-pointer font-medium  mb-0.5`}>
                    <Link 
                        key={id} 
                        to={`/product/${slug}-${id}`}
                        className="group-hover:text-blue-500"
                        >
                        {title}
                    </Link>
                </p>
                <div className="flex text-gray-500 space-x-2 mb-1">
                    <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                        <StarIcon
                        key={idx}
                        color={idx < 5 ? '#F3B81F' : '#DFE6ED'}
                        className="w-3 h-3 mx-px"
                        />
                    ))}
                    </div>
                    <span className="text-[13px] leading-4">(1 review)</span>
                </div>
                <div className="text-gray-500 text-lg mb-5">
                    <div className="flex gap-x-2 ">
                        <div className="text-black dark:text-white">{price}</div>
                        <div className="line-through text-gray-400">{priceOld}</div>
                    </div>
                    {basePrice && (
                    <del className="mx-1  text-gray-400 text-opacity-70">
                        {basePrice}
                    </del>
                    )}
                </div>
                
                <div className="flex gap-2">
                    <RenderAddToCart product={product}/>
                    <CompareButton product={product}/>
                    <WishlistButton product={product}/>
                
                </div>
            </div>
            
            
        </div>
    );
}
 
export default ProductCard;