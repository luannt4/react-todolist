import Container from '../component/ui/container';
import WishlistList from '../component/wishlist/wishlistList';

const WishlistPage = () => {
  return (
    <Container>
		<h1 className="text-2xl font-medium mb-6 capitalize">Wishlist </h1>
		<WishlistList/>
		
    </Container>
  );
};
  
export default WishlistPage;
  