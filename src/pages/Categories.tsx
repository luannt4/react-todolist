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
            <div key={category.slug} className="pointer">
                <Link to={`/category/${category.slug}`} className="group block">
                    <div className="pb-[75%] relative overflow-hidden">
                        <img loading="lazy" className="group-hover:scale-105 duration-300 absolute w-full h-full object-cover"
                        src={`https://dummyjson.com/image/600x300/f1f5f9?fontFamily=poppins&text=${String(category.name).replace(/ /g, '+')}`}
                        alt={category.name} />
                    </div>
                </Link>
            </div>
            ))}
        </div>
    );
};
  
export default CategoriesPage;
  