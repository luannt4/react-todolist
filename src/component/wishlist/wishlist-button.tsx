import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useWishlist } from "../../contexts";
import { Product } from "../../types/Product";
import { toast } from "react-toastify";

interface Props {
    product : Product;
};

const WishlistButton: React.FC<Props> = ({product}) => {
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
                    className="bg-slate-500 text-white  px-3 py-3  rounded-full">
                <IoIosHeart/>
                </button>
            ) : (
                <button
                onClick={() => {
                    addToWishlist(product);
                    handleBtnWishlist();
                }}
                className="bg-slate-500 text-white px-3 py-3  rounded-full"
                >
                <IoIosHeartEmpty/>
                </button>
            )}
        </>
    );
}
export default WishlistButton;