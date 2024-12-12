import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from './slider';
import Image from "../../../component/ui/image";
import { useRef, useState } from 'react';
import cn from 'classnames';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ImageLightBox from "../image-lightbox";

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  1280: {
    slidesPerView: 4,
    direction: 'vertical',
  },
  767: {
    slidesPerView: 4,
    direction: 'horizontal',
  },
  0: {
    slidesPerView: 3,
    direction: 'horizontal',
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'xl:w-[500px]',
  galleryClassName = 'xl:w-[100px] 2xl:w-[120px]',
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full xl:flex xl:flex-row-reverse relative ">
      <ImageLightBox gallery={gallery} />
      <div
        className={cn(
          'w-full ml-5  overflow-hidden rounded-md relative',
          thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          
          {...swiperParams}
        >
          {gallery?.map((item: any, id :number ) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex items-center justify-center"
            >
              <Image
                src={item ?? 'Product Image'}
                alt={`Product gallery ${id}`}
                width={650}
                height={580}
              />
            </SwiperSlide>
          ))}
        </Swiper>
          
          {gallery?.length > 1 && (
            <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
              <div
                ref={prevRef}
                className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 bg-white rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
              >
                <IoIosArrowBack />
              </div>
              <div
                ref={nextRef}
                className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 bg-white rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
              >
                <IoIosArrowForward />
              </div>
            </div>
          )}
      </div>
      
      {/* End of product main slider */}

      <div className={`py-1 shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          watchSlidesProgress={true}
          freeMode={true}
          effect={'slide'}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              direction: 'vertical',
            },
            767: {
              slidesPerView: 4,
              direction: 'horizontal',
            },
            0: {
              slidesPerView: 3,
              direction: 'horizontal',
            },
          }}
        >
          {gallery?.map((item: any, id:number) => (
            <SwiperSlide
              key={`product-thumb-gallery-${id}`}
              className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-base transition hover:opacity-75"
            >
              <Image
                src={item || 'Product Image'}
                alt={`Product thumb gallery ${item}`}
                width={120}
                height={120}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
