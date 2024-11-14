import { Link } from 'react-router-dom';
import { useCart } from '../../contexts';
import usePrice from '../product/use-price';
import ImageFill from '../ui/image';
import { IoIosCloseCircle } from 'react-icons/io';


type CartItemProps = {
  item: any;
};

const CartSideBarItems: React.FC<CartItemProps> = ({  item }) => {
    const {id,title, category, quantity, discountPercentage, thumbnail } = item ?? {};
    const { isInStock, addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();
    const { price: totalPrice } = usePrice({
        amount: item?.itemTotal,
        currencyCode: 'USD',
    });
  const outOfStock = !isInStock(id);

  // Create slug from title
  const slug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      className={`group w-full h-auto flex justify-start  relative last:border-b-0`}
      title={title}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px]  h-[90px]  border border-border-base">
        <img src={thumbnail}  height={90} className="object-cover" />
       
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="pl-3 md:pl-4 ">
       
          <Link
            to={`/product/${slug}-${id}`}
            className="block leading-5 transition-all font-medium lg:text-15px group-hover:text-blue-500"
          >
            {title}
          </Link>
          <div className="text-sm text-gray-400 mt-3 block  capitalize">
            {category} X {quantity}
          </div>
         
        </div>

        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px]  justify-end">
          {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default CartSideBarItems;
