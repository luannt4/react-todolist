// src/TodoItem.tsx
import React from "react";
import { Product } from "../../type/Product";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from '../../component/icons/search-icon';
import {useModal } from '../../context/modal.context';
import {useCompare } from '../../context/compare.context';
import { IoIosHeart, IoIosHeartEmpty,IoIosSync,IoIosCheckmarkCircle } from 'react-icons/io';
import { useWishlist } from "../../context/wishlist.context";

interface Props {
    product : Product;
}


const ProductCard: React.FC<Props> = ({ product }) => {
    const {id,title, category, price } = product;
    const {setModalView } = useModal();
    const {addToCompare, compareList,removeFromCompare} = useCompare();
    const {addToWishlist, wishlistList,removeFromWishlist} = useWishlist();
    
    const isInCompare = (productId: number) => compareList.some((product) => product.id === productId);
    const isWishlist = (productId: number) => wishlistList.some((product) => product.id === productId);


    return (
        <li className=" gap-2 p-2 border rounded bg-white">
            <p className={`w-full cursor-pointer font-medium `}>
                <Link 
                    key={id} 
                    to={`/product/${id}`}
                    className="transition-shadow"
                    >
                    {title}
                </Link>
            </p>
            <p className="text-gray-500 text-lg">
                ${price}
            </p>
            <p className="text-gray-500 mb-2 line-clamp-2">
                <Link 
                    key={category}
                    to={`/category/${category}`}
                    className="transition-shadow"
                    >
                    {category}
                </Link>
            </p>
            <div className="flex gap-2">
            <button
                className="bg-blue-500 text-white flex gap-2 px-4 py-2  rounded-full "
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
            
        </li>
    );
}
 
export default ProductCard;