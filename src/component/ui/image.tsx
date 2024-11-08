import LazyLoad from 'react-lazyload';

interface Props {
    variant?: string;
    className?: string;
    width?: number;
    height?: number;
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
        placeholder={<div className="bg-gray-300 h-48 w-full flex items-center justify-center">Loading...</div>}
      >
        <img src={src} alt={alt} className="w-full h-48 object-cover" />
      </LazyLoad>
    );
}
export default ImageFill;