'use client';


import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import ImageFill from '../ui/image';

interface BannerProps {
    banner: any;
    variant?: 'rounded' | 'default';
    effectActive?: boolean;
    className?: string;
    classNameInner?: string;
}

function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 768 ? imgObj.mobile : imgObj.desktop;
}

const BannerCard: React.FC<BannerProps> = ({banner,className,variant = 'default',effectActive = true,classNameInner,}) => {
    const {width} = useWindowSize();
    const {slug, title, image} = banner;
    const selectedImage = getImage(width!, image);
    return (
        <div className={cn('mx-auto', className)}>
            <Link
                to={`${slug}`}
                className={cn(
                    'h-full w-full group flex justify-center relative overflow-hidden',
                    classNameInner
                )}
            >
                <div className="relative inline-block overflow-hidden w-full box-sizing">
                    
                    <ImageFill src={selectedImage.url} height={selectedImage.height}   alt={title}/>
                    
                </div>
                {effectActive && (
                    <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine"/>
                )}
            </Link>
        </div>
    );
};

export default BannerCard;
