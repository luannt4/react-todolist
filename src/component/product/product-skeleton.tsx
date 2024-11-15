
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCardSkeleton: React.FC = () => {

   return (
     <SkeletonTheme >
            <div className="w-full space-y-2"  >
                <Skeleton  containerClassName='w-full' className="h-52 "/>
                <div className="space-y-0 w-full">
                    <Skeleton containerClassName="float-left w-[75%]" />
                    <Skeleton count={5} containerClassName="clear-both float-left w-full" />
                </div>
            </div>
  </SkeletonTheme>
    
  );
}
 
export default ProductCardSkeleton;