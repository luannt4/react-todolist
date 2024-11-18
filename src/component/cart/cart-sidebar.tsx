import { Link } from "react-router-dom";
import { useCart, useDrawer } from "../../contexts";
import DeleteIcon from "../icons/delete-icon";
import Heading from "../ui/heading";
import Text from "../ui/text";
import usePrice from "../product/use-price";
import cn from 'classnames';
import EmptyCart from "./empty-cart";
import Scrollbar from "../ui/scrollbar";
import CartItem from "./cart-sidebar-items";
import CloseIcon from "../icons/close-icon";
import CartSideBarItems from "./cart-sidebar-items";

const CartSideBar = () => {
    const { closeDrawer } = useDrawer();
    const { items, total, isEmpty, resetCart } = useCart();
    const { price: cartTotal } = usePrice({
        amount: total,
        currencyCode: 'USD',
    });
    return (
        <div className="flex flex-col justify-between w-full h-full">
            <div className="relative flex items-center justify-between w-full px-5 py-5 border-b border-gray-base md:px-7">
                <Heading variant="titleMedium">Shopping Cart</Heading>
                
                <div className="flex items-center">
                
                <button
                    className="flex items-center flex-shrink  "
                    aria-label={'Close'}
                    onClick={closeDrawer}
                    >
                     <CloseIcon/>
                </button>
                   
                </div>
            </div>

            {!isEmpty ? (
                <Scrollbar className="flex-grow w-full cart-scrollbar ">
                    <div className="w-full px-5  space-y-5 h-[calc(100vh-350px)]">
                        {items?.map((item) => (
                            <CartSideBarItems item={item} key={item.id} />
                        ))}
                    </div>
                </Scrollbar>
            ) : (
                <EmptyCart />
            )}

            {!isEmpty && (
                <div className="px-5 pt-5 pb-5 border-t border-border-base md:px-7 md:pt-6 md:pb-6">
                    <div className="flex  pb-5 md:pb-7 ">
                        <div className="pr-3 ">
                            <Heading className=" md:text-lg">Subtotal:</Heading>
                        </div>
                        <div className="ml-auto shrink-0 font-semibold text-base  md:text-lg  min-w-[80px] text-right">
                            {cartTotal}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5" onClick={closeDrawer}>
                        <Link
                            to={'/cart'}
                            className={cn(
                            'shadow-lg w-full px-5 py-3 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-white bg-gray-500 focus:outline-none transition duration-300 hover:bg-opacity-90',
                            {
                                'cursor-not-allowed !text-black !text-opacity-25 !bg-[#EEEEEE] hover:!bg-[#EEEEEE]':
                                isEmpty,
                            }
                            )}
                        >
                            <span className="py-0.5">View or edit your cart</span>
                        </Link>

                        <Link
                            to={'/checkout'}
                            className={cn(
                            'shadow-lg w-full px-5 py-3 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-white bg-blue-500 focus:outline-none transition duration-300 hover:bg-opacity-90',
                            {
                                'cursor-not-allowed !text-black !text-opacity-25 !bg-[#EEEEEE] hover:!bg-[#EEEEEE]':
                                isEmpty,
                            }
                            )}
                        >
                            <span className="py-0.5">Proceed To Checkout</span>
                        </Link>
                    </div>
                </div>
            )}
            
            
        </div>
    );
};
  
export default CartSideBar;
  