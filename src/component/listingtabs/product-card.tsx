// src/TodoItem.tsx
import React from "react";
import { Product } from "../../type/Product";
import SearchIcon from '../../component/icons/search-icon';
import {useModal } from '../../context/modal/modal.context';

interface Props {
    product : Product;
}


const ProductCard: React.FC<Props> = ({ product }) => {
    const {title, category, price } = product;
    const {setModalView } = useModal();
    
    return (
        <li className=" gap-2 p-2 border rounded bg-white">
            <p className={`w-full cursor-pointer font-medium `}>
                {title}
            </p>
            <p className="text-gray-500 text-lg">
                ${price}
            </p>
            <p className="text-gray-500 mb-2 line-clamp-2">
                {category}
            </p>
            <button
                className="bg-blue-500 text-white flex gap-2 px-4 py-2  rounded-full "
                aria-label="Quick View Button"
                 onClick={() => setModalView ("PRODUCT_VIEW", product)}
                >
                Quick view
            </button>
        </li>
    );
}
 
export default ProductCard;