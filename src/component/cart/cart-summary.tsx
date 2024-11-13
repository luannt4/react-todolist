import { Link } from "react-router-dom";


type Props = {
    cartTotal: string
}
const CartSummary: React.FC<Props> = ({  cartTotal }) => {
   
    return (
        <div className="wi-cart-checkout-wrapper lg:sticky top-20 border border-grayp-200 bg-white shadow-md rounded p-5">
            <div className="wi-cart-checkout-top flex items-center justify-between border-b border-grayp-200 pb-3 mb-5">
                <span className="text-xl font-medium">Subtotal</span>
                <span className="text-xl font-medium">
                    {cartTotal}
                </span>
            </div>
            <div className="wi-cart-checkout-shipping border-b border-grayp-200 pb-5 mb-5">
                <h4 className="text-15px font-medium mb-3">Shipping</h4>
            </div>
            <div className="wi-cart-checkout-total flex items-center justify-between text-lg font-medium">
                <span>Total</span>
                <span>{cartTotal}</span>
            </div>
            <div className="wi-cart-checkout-proceed mt-8">
                <Link
                    to={'/'}
                    className={'w-full px-5 py-3  flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-white bg-blue-500 focus:outline-none transition duration-300 hover:bg-opacity-90'}
                >
                    <span className="py-0.5">Proceed To Checkout</span>
                </Link>
            </div>
        </div>
    );
}
export default CartSummary;