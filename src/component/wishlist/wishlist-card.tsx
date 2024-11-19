
import React from "react";
import { Product } from "../../types/Product";
import {  Link } from "react-router-dom";

interface Props {
    product : Product;
    removeWishlist: (id: number) => void;
}

const WishlistCard: React.FC<Props> = ({ product, removeWishlist }) => {
    const {id,title,  price,discountPercentage, thumbnail } = product;

    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const priceOld = Number(price / (1 - (discountPercentage / 100))).toFixed(2);

    return (
    <div className="group p-4 border rounded bg-white space-y-2">
        <img src={thumbnail} alt={title} className="block"/>
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
       
        <button
            onClick={() => removeWishlist(product.id)}
            className=" bg-blue-500 text-white  gap-2 px-4 py-2  rounded "
        >
                Remove
        </button>
        
    </div>
  );
}
 
export default WishlistCard;