import React from "react";
import { useCart } from "../../contexts";
import { Product } from "../../types/Product";
import { toast } from 'react-toastify';
interface AddToCartProps {
    product : Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
    const {
        addItemToCart,
        isInStock,
        isInCart,
    } = useCart();

    const item = product ?? {};
    
    const outOfStock = isInCart(item?.id) && !isInStock(item.id);

    const handleAddClick = (e: React.FormEvent) => {
        e.preventDefault();
        toast('Added to the bag', {
            progressClassName: 'fancy-progress-bar',
            position: 'bottom-right',
            autoClose: 3000,
          });
        addItemToCart(item, 1);
    };

    return (
        <button
        className="px-5 py-2 bg-blue-500  text-white rounded-full text-sm font-medium  focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={outOfStock}
        >
            Add To Cart
        </button>
    )
}
export default AddToCart;