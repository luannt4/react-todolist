import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/Product";

const CategoriesPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
  const { data: categories= [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/products/categories`);
      return response.json();
    }
  });

  if (isLoading) return <div>Loading categories...</div>;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category: any, idx: number) => (
          <div key={category.slug} className=" border rounded-lg hover:bg-gray-50 text-center pointer">
            <Link to={`/category/${category.slug}`} className="p-4 text-black-500 block hover:text-blue-500">
              {category.name}
            </Link>
          </div>
        ))}
    </div>
  );
  };
  
export default CategoriesPage;
  