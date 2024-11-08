
import React from "react";
import { Product } from "../../types/Product";

interface Props {
    product : Product;
    removeCompare: (id: number) => void;
}

const CompareCard: React.FC<Props> = ({ product, removeCompare }) => {
    const {id,title, category, price,thumbnail } = product;
    return (
    <div className="flex items-center  gap-2 border-b">
        <img src={thumbnail} alt={title} className="inline-block w-20"/>
        <p className={`w-full cursor-pointer font-medium `}>
            {title}
        </p>
        <p className="w-1/6 text-gray-500 text-lg">
            ${price}
        </p>
       
        <button
                onClick={() => removeCompare(id)}
                className=" bg-blue-500 text-white  gap-2 px-4 py-2  rounded "
        >
                Remove
        </button>
        
    </div>
  );
}
 
export default CompareCard;