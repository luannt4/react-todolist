
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from "react";

const CollectionLoading = () => {
   return (
     <SkeletonTheme >
            <div className="w-full space-y-2 text-center"  >
                <Skeleton circle={true}  containerClassName=' ' className="!w-24 h-24"/>
                <div className="space-y-0 w-full flex flex-col items-center">
                    <Skeleton count={1} containerClassName="clear-both float-left  w-[55%]" />
                    <Skeleton containerClassName="clear-both float-left w-[75%]" />
                </div>
            </div>
  </SkeletonTheme>
  );
}
 
export default CollectionLoading;