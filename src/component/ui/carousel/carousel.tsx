'use client';

import cn from 'classnames';
import { useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  Swiper,
  Navigation,
  Autoplay,
  Pagination,
  Grid,
} from './slider';
import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { getDirection } from '../../../utils/get-direction';

type CarouselPropsType = {
  lang?: string;
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonSize?: 'default' | 'small';
  centeredSlides?: boolean;
  loop?: boolean;
  slidesPerColumn?: number;
  breakpoints?: {} | any;
  spaceBetween?: number;
  pagination?: {} | any;
  navigation?: {} | any;
  autoplay?: {} | any;
  grid?: {} | any;
};

export default function Carousel({
  lang,
  children,
  className = '',
  buttonGroupClassName = '',
  prevActivateId = '',
  nextActivateId = '',
  prevButtonClassName = ' start-3 xl:start-5 ',
  nextButtonClassName = ' end-3 xl:end-5',
  buttonSize = 'default',
  breakpoints,
  navigation = true,
  pagination = false,
  loop = false,
  spaceBetween = 20,
  grid,
  autoplay,
  ...props
}: React.PropsWithChildren<CarouselPropsType>) {
  const dir = getDirection(lang);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  let nextButtonClasses = cn(
    'swiper-next w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-white absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-md',
    { '3xl:text-2xl': buttonSize === 'default' },
    nextButtonClassName,
  );
  let prevButtonClasses = cn(
    'swiper-prev w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-white absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-md',
    { '3xl:text-2xl': buttonSize === 'default' },
    prevButtonClassName,
  );
  return (
    <div
      className={`carouselWrapper relative ${className} ${
        pagination ? 'dotsCircle' : 'dotsCircleNone'
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        breakpoints={breakpoints}
        spaceBetween={spaceBetween}
        dir={dir}
        pagination={pagination}
        grid={grid}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length? `#${prevActivateId}`: prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length ? `#${nextActivateId}` : nextRef.current!, // Assert non-null
              }
            : {}
        }
        /*onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevActivateId.length ? `#${prevActivateId}`: prevRef.current!;
          swiper.params.navigation.nextEl = nextActivateId.length ? `#${nextActivateId}` : nextRef.current!;
        }}*/
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute  z-10  ${
            buttonGroupClassName ? buttonGroupClassName : 'top-2/4'
          }`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              <IoIosArrowBack />
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              <IoIosArrowBack />
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              <IoIosArrowForward />
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              <IoIosArrowForward />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
