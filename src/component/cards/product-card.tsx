// src/TodoItem.tsx
import React from "react";
import { Product } from "../../types/Product";
import {  Link } from "react-router-dom";
import {useModal } from '../../contexts';
import ImageFill from "../ui/image";
import AddToCart from "../product/add-to-cart";
import CompareButton from "../compare/compare-button";
import WishlistButton from "../wishlist/wishlist-button";
import StarIcon from "../icons/star-icon";
import usePrice from "../product/use-price";
import CheckIcon from "../icons/check-icon";
import SearchIcon from "../icons/search-icon";


interface Props {
    product : Product;
    variant?: string;
}

const ProductCard: React.FC<Props> = ({ product, variant }) => {
    const {id,title, category, price :productPrice,  discountPercentage, availabilityStatus, thumbnail,rating, reviews } = product;
    const {openModal } = useModal();
   

    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const productPriceOld = Number(Number(product?.price / (1 - (discountPercentage / 100))).toFixed(2));
    
    const {price, basePrice, discount} = usePrice({
        amount: productPrice ? productPrice : productPriceOld,
        baseAmount: productPriceOld,
        currencyCode: 'USD'
    });
    
    const RenderAddToCart: React.FC<Props> = ({ product }) => {
        const {id, stock, availabilityStatus} = product;
        const isInStock = product.stock > 0 ;
        const outOfStock =  !isInStock;

        if (Number(stock) < 1 || outOfStock) {
            return (
                <span className="block text-sm leading-6 px-4 py-2 bg-red-400 rounded-full text-white text-sm font-medium items-center justify-center">
                    Out Of Stock
                </span>
            );
        }

        /*if (availabilityStatus === 'Low Stock') {
            return (
                <Link
                    className="block leading-6 px-4 py-2 bg-blue-500 rounded-full  text-white text-sm font-medium items-center justify-center focus:outline-none focus-visible:outline-none"
                    aria-label="Count Button"
                    to={`/product/${slug}-${id}`}
                >
                    Product Details
                </Link>
            );
        }*/

        return <AddToCart product={product} />;
    }
    
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
                <span> {availabilityStatus} </span>
                <span className="text-brand-dark"><b>{stock}</b> products </span>
            </p>
        )
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

                {discount && (
                    <div className="absolute top-2 right-2  z-10">
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
                    <SearchIcon  />
                </button>
            </div>
            
            <div className="py-3 px-1.5 ">
                <p className="text-sm text-gray-500 mb-2 capitalize">
                    <Link 
                        key={category}
                        to={`/category/${category}`}
                        className="transition-shadow"
                        >
                        {category}
                    </Link>
                </p>
                <p className={`w-full cursor-pointer font-medium  mb-2`}>
                    <Link 
                        key={id} 
                        to={`/product/${slug}-${id}`}
                        className="group-hover:text-blue-500"
                        >
                        {title}
                    </Link>
                </p>
                <div className="flex text-gray-500 space-x-1 mb-2">
                    <div className="flex items-center">
                    {rating !== undefined && [...Array(5)].map((_,idx) => (
                        <StarIcon
                        key={idx}
                        color={idx < rating ? '#F3B81F' : '#DFE6ED'}
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