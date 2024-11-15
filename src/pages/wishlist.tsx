import Container from '../component/ui/container';
import WishlistCard from '../component/wishlist/wishlist-card';
import { useWishlist } from '../contexts';

const WishlistPage = () => {
  const {wishlistList,removeFromWishlist} = useWishlist();
  return (
    <Container>
		<h1 className="text-2xl font-medium mb-6 capitalize">Wishlist </h1>
		<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
			{wishlistList.length === 0 && <p>No products in the Wishlist list.</p>}

			{wishlistList.map((product) => (
				<WishlistCard  product={product} removeWishlist={removeFromWishlist}  />
			))}
		</div>
		
    </Container>
  );
};
  
export default WishlistPage;
  