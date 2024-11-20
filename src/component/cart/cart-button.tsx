import {  useDrawer } from "../../contexts";
import CartIcon from '../../component/icons/cart-icon';
import cn from 'classnames';

interface Props {
    className?: string;
    iconClassName?: string;
    hideLabel?: boolean;
};

const CartButton: React.FC<Props> = ({className,iconClassName = '',hideLabel}) => {
    //const {totalItems} = useCart();
    const {openDrawer, setDrawerView} = useDrawer();
    const handleCartOpen = () =>{
        setDrawerView('CART_SIDEBAR');
        return openDrawer();
    }
    return (
        <div onClick={handleCartOpen} className={cn('cursor-pointer items-center justify-center shrink-0 h-auto focus:outline-none transform lg:flex',className)} aria-label="cart-button">
            <div className="relative flex items-center">
                <div className="flex items-center relative cart-button">
                    <CartIcon/>
                    <span className="cart-counter-badge  h-[18px] min-w-[18px] rounded-full flex items-center justify-center bg-blue-500 text-white absolute -top-1 left-3 text-[11px]">
                        0
                    </span>
                </div>
                <span className="text-sm font-normal ms-2">My Cart</span>
            </div>
        </div>
    );
}
export default CartButton;