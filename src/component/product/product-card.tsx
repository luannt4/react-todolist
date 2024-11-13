// src/TodoItem.tsx
import React from "react";
import { Product } from "../../types/Product";
import {  Link } from "react-router-dom";
import {useCart, useModal } from '../../contexts';
import {useCompare } from '../../contexts';
import { IoIosHeart, IoIosHeartEmpty,IoIosSync,IoIosCheckmarkCircle } from 'react-icons/io';
import { useWishlist } from "../../contexts";
import ImageFill from "../ui/image";
import AddToCart from './AddToCart';

interface Props {
    product : Product;
}


const ProductCard: React.FC<Props> = ({ product }) => {
    const {id,title, category, price, discountPercentage, thumbnail } = product;
    const {openModal } = useModal();
    const {addToCompare, compareList,removeFromCompare} = useCompare();
    const {addToWishlist, wishlistList,removeFromWishlist} = useWishlist();
    
    const isInCompare = (productId: number) => compareList.some((product) => product.id === productId);
    const isWishlist = (productId: number) => wishlistList.some((product) => product.id === productId);

    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const priceOld = Number(price / (1 - (discountPercentage / 100))).toFixed(2);

    const RenderAddToCart: React.FC<Props> = ({ product }) => {
        const {id, stock, availabilityStatus} = product;
        const {isInCart, isInStock} = useCart();
        const outOfStock = isInCart(id) && !isInStock(id);
       
        const handlePopupView = () => openModal ("PRODUCT_VIEW", product);
        //const handleLoginView = () => openModal ("LOGIN_VIEW");

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
                <div className="text-gray-500 text-lg mb-5">
                    <div className="flex gap-x-2">
                        <div className="text-black dark:text-white">{price}$</div>
                        <div className="line-through text-gray-400">{priceOld}$</div>
                    </div>
                    
                </div>
                
                <div className="flex gap-2">
               
                    <RenderAddToCart product={product}/>

                    {isInCompare(id) ? (
                        <button
                        onClick={() => removeFromCompare(id)}
                        className="bg-slate-500 text-white  px-3 py-3  rounded-full"
                        >
                        
                            <IoIosCheckmarkCircle/>
                        </button>
                    ) : (
                        <button
                        onClick={() => addToCompare(product)}
                        className="bg-slate-500 text-white px-3 py-3  rounded-full"
                        >
                            <IoIosSync/>
                        </button>
                    )}

                    {isWishlist(id) ? (
                        <button onClick={() => removeFromWishlist(id)} className="bg-slate-500 text-white  px-3 py-3  rounded-full">
                        <IoIosHeart/>
                        </button>
                    ) : (
                        <button
                        onClick={() => addToWishlist(product)}
                        className="bg-slate-500 text-white px-3 py-3  rounded-full"
                        >
                        <IoIosHeartEmpty/>
                        </button>
                    )}
            
                </div>
            </div>
            
            
        </div>
    );
}
 
export default ProductCard;