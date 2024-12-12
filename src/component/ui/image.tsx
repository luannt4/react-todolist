import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import cn from "classnames";

interface Props {
    variant?: string;
    className?: string;
    width?: number;
    height?: number;
    src: string;// Base image source (e.g., "/images/image.jpg")
    alt: string;// Alternative text
    breakpoints?: number[]; // Array of breakpoints (e.g., [480, 768, 1200])
    extension?: string;  // Image file extension (default: "jpg")
  }

  
const Image : React.FC<Props>  = ({
    className,
    variant,
    width = '100%',
    height = 100,
    src,
    alt,
    breakpoints = [480, 768, 1200], // Default breakpoints
    extension = 'png',             // Default extension
  }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Load only once when visible
        threshold: 0.1,    // Trigger when 10% is visible
      });

    const [isLoaded, setIsLoaded] = useState(false);  
    
    // Generate responsive srcSet using DummyJSON CDN pattern
    const srcSet = breakpoints
    .map((bp) => `${src}?width=${bp} ${bp}w`)
    .join(', ');

    return (
        <div className="block w-full box-sizing" ref={ref}>
            {/* Placeholder Skeleton */}
            {!isLoaded && <Skeleton containerClassName='absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full min-h-full' style={{"height": height}}/>}
            
            {/* Lazy Loaded Image */}
            {inView && (
                <>
                    <svg
                        className="block max-w-full h-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width={width}
                        height={height}
                        version="1.1"
                    />
                    <img
                        src={src} // Default large image
                        /*srcSet={srcSet}*/ // Responsive sources
                        sizes="(max-width: 768px) 100vw, 100vw" // Responsive size hints
                        alt={alt}
                        width={0}
                        height={0}
                        style={{
                            display: isLoaded ? 'block' : 'none',
                        }}
                        className={cn(
                            'absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full min-h-full object-cover',
                            {
                                'rounded-md': variant === 'rounded',
                            },
                        )}
                        onLoad={() => setIsLoaded(true)} // Hide skeleton when image is loaded
                    />
                </>
            )}
        </div>
    
    );
}
export default Image;