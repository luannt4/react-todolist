import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

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
        <div style={{ width, height, position: 'relative' }} ref={ref}>
            {/* Placeholder Skeleton */}
            {!isLoaded && <Skeleton containerClassName='w-full h-full' style={{"height" : height}} />}
            
             {/* Lazy Loaded Image */}
            {inView && (
                <img
                    src={src} // Default large image
                    /*srcSet={srcSet}*/    // Responsive sources
                    sizes="(max-width: 768px) 100vw, 100vw" // Responsive size hints
                    alt={alt}
                    width={width}      // Pass width to the image
                    height={height}    // Pass height to the image
                    style={{
                        width: '100%',
                        height: '100%',
                        display: isLoaded ? 'block' : 'none',
                    }}
                    onLoad={() => setIsLoaded(true)} // Hide skeleton when image is loaded
                />
            )}
        </div>
        
    );  

   
}
export default Image;