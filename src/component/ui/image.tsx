// @ts-ignore
import LazyLoad from 'react-lazyload';

interface Props {
    variant?: string;
    className?: string;
    width?: string;
    height?: string;
    src: string;
    alt: string;
  }

  
const ImageFill : React.FC<Props>  = ({
    className,
    variant,
    width ,
    height = 200,
    src,
    alt,
    ...props
  }) => {
    return (
        <LazyLoad
            height={height}
            offset={100}
            placeholder={<div className="bg-gray-300  w-full flex items-center justify-center">Loading...</div>}
        >
        <img src={src} alt={alt} className="absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full min-h-full object-cover" />
      </LazyLoad>
    );
}
export default ImageFill;