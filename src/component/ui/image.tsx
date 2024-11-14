// @ts-ignore
import LazyLoad from 'react-lazyload';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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
    height = 100,
    src,
    alt,
    ...props
  }) => {
    return (
        <LazyLoad
            className={"h-full w-full relative"}
            once
            height={height}
            offset={100}
            placeholder={<Skeleton containerClassName='w-full h-full' style={{"height" : height}} />}
        >
            <div className="block w-full box-sizing">
                <svg
                className="block max-w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                version="1.1"
                />
			</div>
        	<img src={src}  className="absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full min-h-full object-cover" />
      </LazyLoad>
    );
}
export default ImageFill;