
import React from "react";
import { Product } from "../../type/Product";

interface Props {
    product : Product;
    removeWishlist: (id: number) => void;
}

const WishlistCard: React.FC<Props> = ({ product, removeWishlist }) => {
    const {id,title, category, price,thumbnail } = product;
    return (
    <div className="gap-2 p-2 border rounded bg-white">
        <img src={thumbnail} alt={title} className="inline-block w-20"/>
        <p className={`w-full cursor-pointer font-medium `}>
            {title}
        </p>
        <p className="w-1/6 text-gray-500 text-lg">
            ${price}
        </p>
       
        <button
                onClick={() => removeWishlist(id)}
                className=" bg-blue-500 text-white  gap-2 px-4 py-2  rounded "
        >
                Remove
        </button>
        
    </div>
  );
}
 
export default WishlistCard;