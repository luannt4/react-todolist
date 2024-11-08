import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";

import { fetchProductsByCategory } from "../api/fetchProductsByCategory";
import ProductCard from "../component/product/product-card";

const CategoriesProductPage = () => {
    const { categoryName} = useParams<{ categoryName: string }>();
    const { data: products= [], isLoading } = useQuery({
        queryKey: ['products', categoryName],
        queryFn: () => fetchProductsByCategory(categoryName)
  });
   

  if (isLoading) return <div>Loading products...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 capitalize">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {(products as [])?.map((product: Product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
  };
  
export default CategoriesProductPage;
  