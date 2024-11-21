import React from "react";
import { Product } from "../../types/Product";
import { toast } from 'react-toastify';
import { useAppDispatch } from "../../hooks";
import { ADD_ITEM } from "../../features/cart/cartSlice";
interface AddToCartProps {
    product : Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    //const cartItems = useAppSelector((state) => state.cart.items);
    
    
    const item = product ?? {};
    const isInStock = item.stock > 0 ;
    const outOfStock =  !isInStock;

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        toast('Added to the bag', {
            progressClassName: 'fancy-progress-bar',
            position: 'top-right',
            autoClose: 3000,
        });
        
        if (isInStock) {
            dispatch(ADD_ITEM(item));
        }
    };

    return (
        <button
        className="px-5 py-2 bg-blue-500  text-white rounded-full text-sm font-medium  focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handleAddToCart}
        disabled={outOfStock}
        >
            Add To Cart
        </button>
    )
}
export default AddToCart;