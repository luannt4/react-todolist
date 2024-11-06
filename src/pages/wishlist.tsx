import WishlistCard from '../component/wishlist/wishlist-card';
import { useWishlist } from '../context/wishlist.context';

const WishlistPage = () => {
  const {wishlistList,removeFromWishlist} = useWishlist();
  const isWishlist = (productId: number) => wishlistList.some((product) => product.id === productId);
  return (
    <>
		<h1 className='mb-5'>Wishlist Page</h1>
		<div className="grid grid-cols-5 gap-3 ">
			{wishlistList.length === 0 && <p>No products in the Wishlist list.</p>}

			{wishlistList.map((product) => (
				<WishlistCard  product={product} removeWishlist={removeFromWishlist}  />
			))}
		</div>
		
    </>
  );
};
  
export default WishlistPage;
  