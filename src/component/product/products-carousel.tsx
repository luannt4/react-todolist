import SectionHeader from '../common/section-header';
import { Product } from '../../types/Product';
import Carousel from '../ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import Alert from '../ui/alert';
import cn from 'classnames';
import React from "react";
import ProductCardSkeleton from './product-skeleton';
import ProductCardMedium from '../cards/product-card-medium';
import ProductCard from '../cards/product-card';


interface CarouselProps {
    sectionHeading: string;
    className?: string;
    products: Product[];
    loading: boolean;
    error?: string;
    limit?: number;
    uniqueKey?: string;
    carouselBreakpoint?: {} | any;
    borderCarousel?: boolean;
    rowCarousel?: number;
    variant?: string;
}

const breakpoints = {
    '1536': {
        slidesPerView: 5,
    },
    '1280': {
        slidesPerView: 5,
    },
    '1024': {
        slidesPerView: 4,
    },
    '640': {
        slidesPerView: 3,
    },
    '360': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};


const ProductsCarousel: React.FC<CarouselProps> = ({
        sectionHeading,
        className = '',
        products,
        loading,
        error,
        limit,
        uniqueKey,
        carouselBreakpoint,
        variant = 'default',
        borderCarousel,
        rowCarousel = 1,
    }) => {
    
    return (
        <div className={cn('heightFull relative', className)}>
            {sectionHeading  && (
                <>
                    {(() => {
                        switch (variant) {
                            case 'card-fur':
                                return (
                                    <SectionHeader
                                        sectionHeading={sectionHeading}
                                        sectionSubHeading="text-shop-subheading"
                                        headingPosition={"center"}
                                    />
                                );
                            case 'noHeading':
                                break;
                            default:
                                return (
                                    <SectionHeader
                                        sectionHeading={sectionHeading}
                                        className={cn('py-3 uppercase', {
                                            'mb-1.5 rounded bg-white px-5': variant === 'default',
                                        })}
                                    />
                                );
                        }
                    })()}
                </>
                
            )}
            
            
            {error ? (
                <div className="2xl:ltr:pr-10 2xl:rtl:pl-10">
                    <Alert message={error}/>
                </div>
            ) : (
                <div
                    className={cn('heightFull', {
                        'border border-black/10 rounded ': variant === 'outBorder' || variant === 'noHeading',
                    })}
                  
                >
                    {/* Loading state */}
                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                        {Array.from({ length: 5 }).map((_, id) => (
                            <div key={id} className="p-2  rounded bg-white group">
                                <ProductCardSkeleton />
                            </div>
                        ))}
                        </div>
                    )}

                    <Carousel
                        spaceBetween={6}
                        grid={{rows: rowCarousel, fill: 'row'}}
                        breakpoints={carouselBreakpoint || breakpoints}
                        prevActivateId={`prev${uniqueKey}`}
                        nextActivateId={`next${uniqueKey}`}
                    >
                        {products?.map((product: any, idx) => (
                            <SwiperSlide key={`${uniqueKey}-${idx}`} className="">
                                {(() => {
                                    switch (variant) {
                                        case 'medium':
                                        return (
                                            <ProductCardMedium
                                            key={`${uniqueKey}-${product.id}`}
                                            product={product}
                                            />
                                        );
                                        default:
                                        return (
                                            <ProductCard
                                                key={`${uniqueKey}-${product.id}`}
                                                product={product}
                                                variant={variant}
                                            />
                                        );
                                    }
                                })()}
                                
                            </SwiperSlide>
                        ))}
                    </Carousel>
                </div>
            )}
        </div>
    );
};

export default ProductsCarousel;
