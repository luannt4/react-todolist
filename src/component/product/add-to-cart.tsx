import React from "react";
import { Product } from "../../types/Product";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ADD_ITEM, selectCartItemDetails } from "../../features/cart/cartSlice";
interface AddToCartProps {
    product : Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
    const dispatch = useAppDispatch();

     // Use the new selector to get cart item details
     const cartItemDetails = useAppSelector((state) => 
        selectCartItemDetails(state, Number(product.id))
    );

    const handleAddToCart = (e: React.FormEvent) => {
        // Check if adding would exceed stock
        const totalQuantity = cartItemDetails.quantity;
        if (totalQuantity < product.stock) {
            
            dispatch(ADD_ITEM({ product, quantity: 1 }));
            toast('Added to the bag', {
                progressClassName: 'fancy-progress-bar',
            });
        } else {
            // Optional: Show an error message about exceeding stock
            toast(`Cannot add more than ${product.stock} items to cart`, {
                progressClassName: 'fancy-progress-bar',
            });
        }
    
    };

    return (
        <button
        className="px-5 py-2 bg-blue-500  text-white rounded-full text-sm font-medium  focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handleAddToCart}
        >
            Add To Cart
        </button>
    )
}
export default AddToCart;