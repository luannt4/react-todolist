
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchSkeleton: React.FC = () => {

   return (
     <SkeletonTheme >
            <div className="w-full flex flex-col gap-5 p-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                        <div className="w-full flex items-center space-x-5" key={idx} >
                            <Skeleton circle={true} containerClassName='w-12' className="h-10 w-10"/>
                            <div className="space-y-2 w-full">
                                <Skeleton containerClassName="float-left w-[85%]" />
                                <Skeleton containerClassName="clear-both float-left w-full" />
                            </div>
                        </div>
                    ))
                }
                
            </div>
  </SkeletonTheme>
    
  );
}
 
export default SearchSkeleton;