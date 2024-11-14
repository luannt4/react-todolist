
import BannerGrid from '../component/banner/banner-grid';
import CategoryGridBlock from '../component/category-grid/category-grid-block';
import HeroSliderBlock from '../component/hero/hero-slider-block';
import Listingtabs from '../component/listingtabs';
import {
    homeGridSlider as gridSlider,
    homeHeroSlider as heroSlider,
    homeGridHero as gridHero,
    homeGridHero2 as gridHero2,
} from '../settings/banner';
const HomePage = () => {

    return (
        <div className="min-h-screen">
            <div className="grid xl:gap-[5px] grid-cols-1 xl:grid-cols-12">
                <HeroSliderBlock
                    heroBanner={heroSlider}
                    showHeroContent={true}
                    className={`xl:col-span-8 mb-5 xl:mb-12`}
                    contentClassName="p-7 sm:py-18 xl:py-16 sm:px-16 xl:px-24 md:min-h-[270px] xl:min-h-[375px] rounded"
                />
                <BannerGrid
                    data={gridSlider}
                    grid={1}
                    girdClassName="xl:gap-[5px]"
                    className="xl:col-span-4 mb-5 xl:mb-12"
                />
            </div>
            <CategoryGridBlock  className="mb-8 lg:mb-12"/>    
            <BannerGrid
                data={gridHero}
                grid={1}
                className="mb-8 lg:mb-15"
            />
            <Listingtabs />
            <BannerGrid
                data={gridHero2}
                grid={3}
                className="mb-8 lg:mb-15"
            />
        </div>
    );
};
  
export default HomePage;
  