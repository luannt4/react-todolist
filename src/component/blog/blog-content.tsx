'use client';

import type {FC} from 'react';
import BlogCard from '../../component/blog/blog-card';
import cn from 'classnames';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "../../component/ui/pagination";
import {useState} from "react";

interface blogGridProps {
    dataBlog?: any;
    className?: string;
}

export const BlogContent: FC<blogGridProps> = ({dataBlog, className = ''}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [value, setValue] = useState('');
    const countPerPage = 9;
    const useDatablog = dataBlog?.slice(0, countPerPage);
    let [filterData, setDataValue] = useState(useDatablog);

    const updatePage = (p: any) => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setDataValue(dataBlog?.slice(from, to));
    };
    return (
        <>
            <div
                className={cn(
                    className,
                    'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2'
                )}
                >
                {filterData?.map((item: any) => {
                            return <BlogCard key={`blog--key-${item.id}`} blog={item} />;
                   })
                }

            </div>
            <Pagination
                current={currentPage}
                onChange={updatePage}
                pageSize={countPerPage}
                total={dataBlog?.length}
                prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                nextIcon={<GrNext size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                className="blog-pagination bg-white rounded mt-2"
            />
        </>
    );
};

