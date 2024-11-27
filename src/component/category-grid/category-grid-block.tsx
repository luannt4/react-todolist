'use client';

import React from "react";

import {SwiperSlide} from 'swiper/react';
import { fetchAllCategories } from '../../api/fetchCategories';
import { useQuery } from "@tanstack/react-query";
import Alert from "../ui/alert";
import Carousel from "../ui/carousel/carousel";
import CategoryCard from "../cards/category-card";
import CategoryGridSkeleton from "./category-grid-skeleton";
import { ROUTES } from "../../utils/routes";


interface CategoriesProps {
    className?: string;
    limit?: number;
    variant?: string;
}



const CategoryGridBlock: React.FC<CategoriesProps> = ({
    className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16',
    limit = 8,
    variant='default'
}) => {

    // Gọi API lấy fetchAllCategories với useQuery
    const { data: categories, isLoading, error} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchAllCategories()
    });

    const breakpoints = {
        '1480': {
            slidesPerView: 8,
            spaceBetween: 10
        },
        '1280': {
            slidesPerView: 5,
            spaceBetween: 10
        },
        '1024': {
            slidesPerView: 5,
            spaceBetween: 10
        },
        '768': {
            slidesPerView: 4,
            spaceBetween: 10
        },
        '600': {
            slidesPerView: 2,
            spaceBetween: 1
        },
        '0': {
            slidesPerView: 2,
            spaceBetween: 1
        },
    };
    return (
        <div className={className}>
            <div className=" w-full overflow-hidden">
                {error ? (
                    <Alert message={error?.message} className="mb-14 3xl:mx-3.5"/>
                ) : (
                    <>
                        {/* Loading state */}
                        {isLoading && (
                            <div className="grid grid-cols-1 md:grid-cols-8 gap-2">
                            {Array.from({ length: 8 }).map((_, id) => (
                                <div key={id} className="p-2  rounded bg-white group">
                                    <CategoryGridSkeleton />
                                </div>
                            ))}
                            </div>
                        )}
                        
                        <Carousel
                            grid={{rows: 1, fill: 'row'}}
                            breakpoints={breakpoints}
                            prevActivateId={`prevCategoryGrid`}
                            nextActivateId={`nextCategoryGrid`}
                        >
                            {categories?.slice(0, limit)?.map((category, idx: number) => (
                                    <SwiperSlide key={`category--key-${idx}`}>
                                        <CategoryCard
                                            item={category}
                                            variant={variant}
                                            href={`${ROUTES.CATEGORIES}/${category.slug}`}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Carousel>
                       
                    </>
                    
                )}
            </div>
        </div>
    );
};

export default CategoryGridBlock;
