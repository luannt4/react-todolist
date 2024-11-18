import { Item } from '../../contexts/cart/types'; 
import ImageFill from '../ui/image';
import usePrice from "../product/use-price";;

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
	const { price: totalPrice } = usePrice({
        amount: item?.itemTotal,
        currencyCode: 'USD',
    });
  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        <ImageFill
              src={item.thumbnail }
              height={64}
              alt={item.title || 'Product Image'}
            />

      </div>
      <h6 className="font-medium text-sm text-brand-dark pl-3">
        {item.title}
      </h6>
      <div className="flex font-normal ml-auto text-15px text-brand-dark pl-2 shrink-0">
	  	{totalPrice}
      </div>
    </div>
  );
};
