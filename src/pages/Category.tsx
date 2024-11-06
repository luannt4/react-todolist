import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/Product";

const CategoriesProductPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { data: products, isLoading } = useQuery({

    queryKey: ['products', categoryName],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/products/category/${categoryName}`);
      const data = await response.json();
      return data.products;
    }
  });

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 capitalize">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product: Product) => (
          <Link 
            key={product.id}
            to={`/product/${product.id}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src={product.thumbnail} 
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold mb-2">{product.title}</h2>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
  };
  
export default CategoriesProductPage;
  