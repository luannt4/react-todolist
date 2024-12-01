import usePrice from "../product/use-price";
import CartItems from "./cart-items";
import CartSummary from "./cart-summary";
import EmptyCart from "./empty-cart";
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from "react";
import { fetchCart} from '../../features/cart/cartThunks';


const CartArea:React.FC = () => {
    const dispatch = useAppDispatch();
    const { cartStore, isEmpty, totalItems } = useAppSelector((state) => state.cart);
    const total = cartStore?.total ?? 0;
    //const userId = 6;

    /*useEffect(() => {
        // Fetch the cart when the component is mounted

        dispatch(fetchCart(userId));
    }, [dispatch]);*/

    const { price: cartTotal } = usePrice({
        amount: total,
        currencyCode: 'USD',
    });

    return (
        <div className="wi-cart-area pb-20">
            <h1 className="text-2xl font-medium mb-6 capitalize">Shopping Cart</h1>


            {!isEmpty ? (
                <div className="flex flex-col xl:flex-row gap-8 2xl:gap-10">
                    <div className="w-full xl:basis-9/12 ">
                        <div className="relative overflow-x-auto mb-10">
                            <table className="w-full text-sm text-left text-fill-base divide-y">
                                <thead className="text-sm text-fill-base bg-gray-100">
                                <tr>
                                    <th colSpan={2} className="px-6 py-3">Product</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Quantity</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartStore?.products.map((item) => (
                                    <CartItems cart={cartStore} cartId={cartStore?.id!} item={item} key={item.id} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full xl:basis-3/12 ">
                        <CartSummary cartTotal={cartTotal}/>
                    </div>
                </div>

            ) : (
                <div className="mt-40">
                    <EmptyCart />
                </div>
            )}
        </div>

    );
  };
  
export default CartArea;
  