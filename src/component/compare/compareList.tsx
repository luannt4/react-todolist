// components/Compare/CompareList.tsx
import React from 'react';
import { removeFromCompare } from '../../features/compare/compareSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import CompareCard from './compare-card';

const CompareList: React.FC = () => {
    const compareList = useAppSelector(state => state.compare.compareList);
    const dispatch = useAppDispatch();
    
    const handleRemoveCompare = (id: number) => {
        dispatch(removeFromCompare(id));
    };
  
    return (
        <div className="grid grid-cols-1 gap-3 ">
            {!compareList.length && (
                <p>No products in the comparison list.</p>
            )}

            {compareList.map((product) => (
                <CompareCard  
                    key={product.id} 
                    product={product}
                    removeCompare={handleRemoveCompare} 
                  />
            ))}

        </div>
    );
  };
  
  export default CompareList;