import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useWishlist } from "../../contexts";
import { Product } from "../../types/Product";
import { toast } from "react-toastify";
import cn from 'classnames';

interface Props {
    product : Product;
    className?: string;
};

const WishlistButton: React.FC<Props> = ({product, className}) => {
    const {addToWishlist, wishlistList,removeFromWishlist} = useWishlist();
    
    const isWishlist = (productId: number) => wishlistList.some((product) => product.id === productId);
    const btnWishlist = isWishlist(product?.id);
    const handleBtnWishlist = () => {
        const toastStatus = btnWishlist === true ? 'Remove from favorite list' : 'Added to favorite list';
        toast(toastStatus, {
            progressClassName: 'fancy-progress-bar',
            position: 'bottom-right',
            autoClose: 3000,
        });
    };
    return (
        <>
            {btnWishlist ? (
                <button onClick={() => {
                    removeFromWishlist(product?.id);
                    handleBtnWishlist();
                }} 
                    className={cn('bg-gray-200 text-gray-600  px-3 py-3  rounded-full hover:bg-blue-500 hover:text-white',className)}>
                <IoIosHeart/>
                </button>
            ) : (
                <button
                onClick={() => {
                    addToWishlist(product);
                    handleBtnWishlist();
                }}
                className={cn('bg-gray-200 text-gray-600 px-3 py-3  rounded-full hover:bg-blue-500 hover:text-white',className)}>
                <IoIosHeartEmpty/>
                </button>
            )}
        </>
    );
}
export default WishlistButton;