import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/Product";

const ProductDetailsPage = () => {
    const { productId } = useParams<{ productId: string }>();
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-96 object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="inline-block bg-gray-100 px-3 py-1 rounded">
            {product.category}
          </div>
        </div>
      </div>
    </div>
  );
  };
  
export default ProductDetailsPage;
  