import ProductsCarousel from '../product/products-carousel';
import { LIMITS } from '../../settings/limits';
import {FC} from "react";
import { SearchResponse } from '../../types/Product';
import { useQuery } from '@tanstack/react-query';
import { fetchProductPopular } from '../../api/fetchProductPopular';

interface Props {
    className?: string;
    variant?: string | undefined;
}
const PopularProduct: FC<Props> = ({
   className,
   variant,
}) => {
  const page : number = 1;
  const limit = LIMITS.BEST_SELLER_PRODUCTS_LIMITS;

  // Gọi API lấy fetchAllCategories với useQuery
  const {data, isLoading, error } = useQuery<SearchResponse>({
      queryKey: ['Products'],
      queryFn: () => fetchProductPopular(page,limit)
  });
  const {products = [] } = data  ?? {};

  return (
    <ProductsCarousel
      sectionHeading="Popular Products"
      products={products}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="popular"
      variant={variant}
      className={className}
    />
  );
}
export default PopularProduct;
