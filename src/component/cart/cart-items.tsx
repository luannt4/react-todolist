import { Link } from 'react-router-dom';
import usePrice from '../product/use-price';
import ImageFill from '../ui/image';
import Counter from '../ui/counter';
import CloseIcon from '../icons/close-icon';
import { useAppDispatch } from '../../hooks';
import {  REMOVE_ITEM,  UPDATE_ITEM } from '../../features/cart/cartSlice';

type CartItemProps = {
    item: any;
};

const CartItems: React.FC<CartItemProps> = ({  item }) => {
    const dispatch = useAppDispatch();
    const {id,title,  quantity,  thumbnail } = item ?? {};
    const { price: totalPrice } = usePrice({
        amount: item?.price,
        currencyCode: 'USD',
    });

    const outOfStock = item.quantity >= item.stock;

    // Create slug from title
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity <= 0) {
            dispatch(REMOVE_ITEM(item.id));
        } else if (newQuantity > item.stock) {
            // Optional: Show an error or limit to max stock
            dispatch(UPDATE_ITEM({ 
                productId: item.id, 
                quantity: item.stock 
            }));
        } else {
            dispatch(UPDATE_ITEM({ 
                productId: item.id, 
                quantity: newQuantity 
            }));
        }
      };

    return (
        <tr className="bg-white border-b  border-gray-200">
        
            <td className="px-3 py-4 w-28 inline-block">
                <ImageFill
                    src={thumbnail }
                    height={100}
                    alt={title || 'Product Image'}
                />
            </td>
            
            <td className="wi-cart-title px-3 py-7 min-w-40 max-w-500px">
            <Link
                to={`/product/${slug}-${id}`}
                className="block leading-5 transition-all font-medium lg:text-15px group-hover:text-blue-500"
            >
                {title} 
            </Link>
            </td>
            
            <td className="wi-cart-price px-3 sm:px-6">
                <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px]  ">
                {totalPrice}
                </div>
            </td>
            
            <td className="wi-cart-quantity px-3 sm:px-6">
                <div className="wi-product-quantity w-32 relative ">
                    <Counter
                        value={quantity}
                        onIncrement={() => handleQuantityChange(item.quantity + 1)}
                        onDecrement={() => handleQuantityChange(item.quantity - 1)}
                        variant="cart"
                        disabled={outOfStock}
                    />
                    
                </div>
            </td>
        
            <td className="wi-cart-action  px-6 text-center">
                <button
                    className="flex items-center justify-center bg-gray-200 rounded-full w-8 h-8 hover:bg-gray-400"
                    aria-label={'Clear Item'}
                    onClick={() => dispatch(REMOVE_ITEM(id))}
                    >
                        <CloseIcon width={15}/>
                </button>
            </td>
        </tr>
    );
}

export default CartItems;