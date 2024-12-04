import Scrollbar from '../ui/scrollbar';
import Heading from "../ui/heading";
import {useQuery} from "@tanstack/react-query";
import {fetchAllCategories} from "../../api/fetchCategories";
import {Category} from "../../types/Product";
import {Link} from "react-router-dom";

export const CategoryFilter = () => {
    // Gọi API lấy fetchAllCategories với useQuery
    const {data = [], isLoading } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => fetchAllCategories()
    });

  return (
    <div className="block mb-10">
      <Heading className="mb-3 block-title">Categories</Heading>
        <Scrollbar className="os-host-flexbox">
            <div className="w-full max-h-[380px] text-sm">
                {data?.map((category: any, idx: number) => (
                        <div key={category.slug} className="border-t border-border-base first:border-t-0 ">
                            <Link to={`/categories/${category.slug}`} className=" py-3 block hover:text-blue-500">
                                {category.name}
                            </Link>
                        </div>
                    ))}
            </div>
        </Scrollbar>
    </div>
);
};
