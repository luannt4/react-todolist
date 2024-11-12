import React from "react";
import { useCart } from "../../contexts";
import { Product } from "../../types/Product";

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
        addItemToCart(item, 1);
    };

    return (
        <button
        className="px-5 py-2 bg-blue-500  text-white rounded-full text-[13px]  focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={outOfStock}
        >
            Add To Cart
        </button>
    )
}
export default AddToCart;