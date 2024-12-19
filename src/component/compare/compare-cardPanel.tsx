
import React from "react";
import { Product } from "../../types/Product";
import {  Link } from "react-router-dom";
import Image from "../ui/image";
import CloseIcon from "../icons/close-icon";
import {ROUTES} from "../../utils/routes";

interface Props {
    product : Product;
    removeCompare: (id: number) => void;
}

const CompareCardPanel: React.FC<Props> = ({ product, removeCompare }) => {
    const {id,title,  price,discountPercentage, thumbnail,category } = product;

    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const priceOld = Number(price / (1 - (discountPercentage / 100))).toFixed(2);
    return (
    <div className="bg-white rounded-lg group flex items-center  gap-4 p-4 relative">
         <div
                onClick={() => removeCompare(id)}
                className="absolute rounded p-3 top-0 right-0 z-10 cursor-pointer "
            >
                <CloseIcon className="w-4 h-4"/>
        </div>
        <div className="c-product-item__img ">
            <Image src={thumbnail|| 'Product Image'} width={64} height={64}   alt={title || 'Product Image'}/>
        </div>
        <div className="c-product-item w-full pr-5">
            <p className={`w-full mb-1`}>
                <Link 
                    key={id}
                    to={`${ROUTES.CATEGORIES}/${category}/${slug}-${id}`}
                    className="text-sm font-medium hover:text-blue-500"
                    >
                    {title}
                </Link>
            </p>
        
            <div className="w-1/4 text-base text-gray-500 ">
                <div className="flex gap-x-2">
                    <div className="text-black dark:text-white">{price}$</div>
                    <div className="line-through text-gray-400">{priceOld}$</div>
                </div>
                
            </div>
        
           
        </div>
        
        
    </div>
  );
}
 
export default CompareCardPanel;