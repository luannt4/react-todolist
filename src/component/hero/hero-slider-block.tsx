'use client';

import {SwiperSlide} from '../ui/carousel/slider';
import Carousel from '../ui/carousel/carousel';
import HeroBannerCard from './hero-banner-card';

interface Props {
    heroBanner?: any;
    className?: string;
    variant?: string;
    contentClassName?: string;
    showHeroContent?: boolean;
}

const HeroSliderBlock: React.FC<Props> = ({
        heroBanner,
        variant='slider',
        className = 'mb-7',
        contentClassName = 'px-5 py-10 xl:py-24',
        showHeroContent = true,
    }) => {
    return (
        <div className={`${className}`}>
            <Carousel
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                autoplay={false}
                prevActivateId={`prevActivateId`}
                nextActivateId={`nextActivateId`}
            >
                {heroBanner?.map((banner: any) => (
                    <SwiperSlide key={`banner--key${banner.id}`}>
                        <HeroBannerCard
                            banner={banner}
                            variant={variant}
                            className={contentClassName}
                            heroContentCard={showHeroContent}
                        />
                    </SwiperSlide>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroSliderBlock;
