import { Link } from 'react-router-dom';
import usePrice from '../product/use-price';
import ImageFill from '../ui/image';
import { IoIosCloseCircle } from 'react-icons/io';


type CartItemProps = {
  item: any;
};

const CartSideBarItems: React.FC<CartItemProps> = ({  item }) => {
    /*const {id,title, category, quantity, discountPercentage, thumbnail } = item ?? {};
    const { isInStock, addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();
    const { price: totalPrice } = usePrice({
        amount: item?.itemTotal,
        currencyCode: 'USD',
    });
  const outOfStock = !isInStock(id);

  // Create slug from title
  const slug = title.toLowerCase().replace(/\s+/g, '-');*/

  return (
    <div
      className={`group w-full h-auto flex justify-start  relative last:border-b-0`}
    >
      Cart-items
    </div>
  );
};

export default CartSideBarItems;
