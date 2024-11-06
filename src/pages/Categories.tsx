import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../api/fetchCategories";

const CategoriesPage = () => {
    
    // Gọi API lấy fetchAllCategories với useQuery
    const {data: categories= [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchAllCategories()
    });
  
    if (isLoading) return (<div>Loading categories...</div>);
  
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(categories as []).map((category: any, idx: number) => (
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
  