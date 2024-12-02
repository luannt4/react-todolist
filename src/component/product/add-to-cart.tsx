import React from "react";
import { Product } from "../../types/Product";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectCartItemDetails } from "../../features/cart/cartSlice";
import { addToCart } from '../../features/cart/cartThunks';

import {useModal} from "../../contexts";
interface AddToCartProps {
    product : Product;
    userId: number;
}


// @ts-ignore
const AddToCart: React.FC<AddToCartProps> = ({ product,userId }) => {
    const dispatch = useAppDispatch();
    const {openAlert } = useModal();
    //const {id,title,  quantity,  thumbnail } = product ?? {};
     // Use the new selector to get cart item details
     const cartItemDetails = useAppSelector((state) => 
        selectCartItemDetails(state, Number(product.id))
    );

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if adding would exceed stock
        const totalQuantity = cartItemDetails.quantity;
        if (totalQuantity < product.stock) {
            dispatch(addToCart({ userId, productId: product.id,  quantity: 1 } )); // Assuming cartId = 1
            //toast('Added to the bag', {progressClassName: 'fancy-progress-bar',});
        } else {
            // Optional: Show an error message about exceeding stock
            openAlert ("ALERT_VIEW", `Cannot add more than ${product.stock} items to cart`)

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