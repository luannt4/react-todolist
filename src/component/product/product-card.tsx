// src/TodoItem.tsx
import React from "react";
import { Product } from "../../types/Product";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from '../../component/icons/search-icon';
import {useModal } from '../../context/modal.context';
import {useCompare } from '../../context/compare.context';
import { IoIosHeart, IoIosHeartEmpty,IoIosSync,IoIosCheckmarkCircle } from 'react-icons/io';
import { useWishlist } from "../../context/wishlist.context";
import ImageFill from "../ui/image";

interface Props {
    product : Product;
}


const ProductCard: React.FC<Props> = ({ product }) => {
    const {id,title, category, price, discountPercentage, thumbnail } = product;
    const {setModalView } = useModal();
    const {addToCompare, compareList,removeFromCompare} = useCompare();
    const {addToWishlist, wishlistList,removeFromWishlist} = useWishlist();
    
    const isInCompare = (productId: number) => compareList.some((product) => product.id === productId);
    const isWishlist = (productId: number) => wishlistList.some((product) => product.id === productId);

    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const priceOld = Number(price / (1 - (discountPercentage / 100))).toFixed(2);

    return (
        <div className=" gap-2 p-2 border rounded bg-white group">
            <Link
                key={id} 
                to={`/product/${slug}-${id}`}
                className="block relative overflow-hidden pb-[100%] bg-slate-100">

                    <ImageFill src={thumbnail|| 'Product Image'}    alt={title || 'Product Image'}/>
                    <img 
                    src={thumbnail} 
                    alt={title}
                    className="group-hover:scale-105 duration-300 absolute w-full h-full object-cover"
                    />

            </Link>
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
                <p className="text-gray-500 text-lg mb-5">
                    <div className="flex gap-x-2">
                        <div className="text-black dark:text-white">{price}$</div>
                        <div className="line-through text-gray-400">{priceOld}$</div>
                    </div>
                    
                </p>
                
                <div className="flex gap-2">
                <button
                    className="bg-blue-500 text-white flex gap-2 px-4 py-2 font-normal rounded-full text-sm "
                    aria-label="Quick View Button"
                    onClick={() => setModalView ("PRODUCT_VIEW", product)}
                    >
                    Quick view
                </button>

                {isInCompare(id) ? (
                    <button
                    onClick={() => removeFromCompare(id)}
                    className="bg-blue-500 text-white  px-3 py-3  rounded-full"
                    >
                    <IoIosSync/>
                    </button>
                ) : (
                    <button
                    onClick={() => addToCompare(product)}
                    className="bg-blue-500 text-white px-3 py-3  rounded-full"
                    >
                    <IoIosCheckmarkCircle/>
                    </button>
                )}

                {isWishlist(id) ? (
                    <button onClick={() => removeFromWishlist(id)} className="bg-red-500 text-white  px-3 py-3  rounded-full">
                    <IoIosHeart/>
                    </button>
                ) : (
                    <button
                    onClick={() => addToWishlist(product)}
                    className="bg-blue-500 text-white px-3 py-3  rounded-full"
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