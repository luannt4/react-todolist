import { LIMITS } from '../../settings/limits';
import ProductsCarousel from "../product/products-carousel";
interface Props{
    className?: string;
    products: any;
    isLoading: any;
    error?: any;
    variant?: string;
}

const ListingTabsContainer: React.FC<Props> = ({className, products, isLoading, error,variant}) => {
    const breakpoints = {
        '1536': {
          slidesPerView: 3,
        },
        '1280': {
          slidesPerView: 3,
        },
        '1024': {
          slidesPerView: 3,
        },
        '640': {
          slidesPerView: 3,
        },
        '360': {
          slidesPerView: 2,
        },
        '0': {
          slidesPerView: 1,
        },
    };

    return (
        <ProductsCarousel
        sectionHeading=""
        products={products}
        loading={isLoading}
        error={error?.message}
        limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
        uniqueKey="listing-tabs"
        variant={variant}
        className={className}
        rowCarousel={2}
        carouselBreakpoint={breakpoints}
        />
    );
}
export default ListingTabsContainer;