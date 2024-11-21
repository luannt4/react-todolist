import { useAppSelector } from "../../hooks";

import usePrice from "../product/use-price";
import Button from "../ui/button";
import { CheckoutCardFooter } from "./checkout-card-footer";
import { CheckoutItem } from "./checkout-card-item";
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

const CheckoutSideBar: React.FC = () => {
    const navigate = useNavigate();
    const { items, total, isEmpty } = useAppSelector((state) => state.cart);
    const { price: subtotal } = usePrice({
        amount: total,
        currencyCode: 'USD',
    });
   
    const orderHeader = () => {
        !isEmpty && navigate('/complete-order');
    }
    const checkoutFooter = [
        {
        id: 1,
        name: 'Subtotal',
        price: subtotal,
    },
    {
        id: 2,
        name: 'Shipping',
        price: '$0',
    },
    {
        id: 3,
        name: 'Total',
        price: subtotal,
    },
    ];
  

    return (
        <>
            <div className="bg-white px-4 pt-4 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-5">
                <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
                    <span className="font-medium text-15px text-brand-dark">
                            Product
                    </span>
                    <span className="font-medium ml-auto  shrink-0 text-15px text-brand-dark">
                        Subtotal
                    </span>
                </div>
                <div className="mb-5">
                    {!isEmpty  ? (
                    items.map((item) => <CheckoutItem item={item} key={item.id} />)
                    ) : (
                    <p className="py-4 text-brand-danger text-opacity-70">
                        Your cart is empty.
                    </p>
                    )}

                </div>

                {
                    checkoutFooter.map((item: any) => (
                        <CheckoutCardFooter item={item} key={item.id} />
                    ))
                }

                <Button
                    variant="formButton"
                    className={cn(
                        'w-full mt-8 mb-5 rounded font-semibold px-4 py-3 transition-all',
                        isEmpty
                        ? 'opacity-40 cursor-not-allowed'
                        : '!bg-brand !text-brand-light',
                    )}
                    onClick={orderHeader}
                >
                    Order Now
                </Button>
            </div>
           
        </>
    );
}
export default CheckoutSideBar;
