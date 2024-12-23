import Container from "../component/ui/container";
import React, {Suspense, useState} from "react";

import {LIMITS} from "../settings/limits";
import {useQuery} from "@tanstack/react-query";
import {BlogResponse} from "../types/Product";
import Breadcrumb from "../component/ui/breadcrumb";
import {fetchPosts} from "../api/fetchPosts";
import Pagination from "../component/ui/pagination";
import {GrNext, GrPrevious} from "react-icons/gr";
import BlogCard from "../component/blog/blog-card";
import cn from "classnames";

const BlogsPage = () => {
   
    const [filters, setFilters] = useState({
        page: 1,
        limit: LIMITS.Blogs_LIMITS,
    });
    
    // Gọi API lấy fetchAllCategories với useQuery
    const {data, isLoading } = useQuery<BlogResponse>({
        queryKey: ['blogs',filters.limit, filters.page],
        queryFn: () => fetchPosts(filters.page,filters.limit)
    });
    
    const {posts=[]} = data  ?? {};
    const total = data?.total || 0;
    // Handle changes in the filters state
    const handleFilterChange  = (key: string,value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[300px] bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );
    
    const BlogsFallback = () => {
        return (<div className="flex justify-center items-center min-h-[300px] bg-white">
            <div
                className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>);
    }
    
    return (
        <>
            <Container>
                <Breadcrumb />
                <h1 className="text-2xl font-medium mb-6 capitalize">Blog Articles</h1>
                <Suspense fallback={<BlogsFallback/>}>
                    <div
                        className={cn(
                            'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                        )}
                    >
                        {posts?.map((item: any) => {
                                return <BlogCard key={`blog--key-${item.id}`} blog={item}/>;
                            })
                        }
                    </div>
                    <div className="pagination bg-white rounded mt-10">
                        <Pagination
                            current={filters.page}
                            total={total}
                            pageSize={filters.limit}
                            onChange={(page) => handleFilterChange('page',page)}
                            prevIcon={<GrPrevious size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                            nextIcon={<GrNext size={14} className={`m-auto my-1.5 rtl:rotate-180`}/>}
                        />
                    </div>
                </Suspense>
            </Container>
        </>
    );
};

export default BlogsPage;
  