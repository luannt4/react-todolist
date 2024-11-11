import CompareCard from '../component/compare/compare-card';
import {useCompare } from '../contexts';

const ComparePage = () => {
  const {compareList,removeFromCompare} = useCompare();
  return (
    <>
		<h1 className="text-2xl font-medium mb-6 capitalize">Compare </h1>
		<div className="grid grid-cols-1 gap-3 ">
			
			{compareList.length === 0 && (
                <p>No products in the comparison list.</p>
            )}

			{compareList.map((product) => (
				<CompareCard  product={product} removeCompare={removeFromCompare}  />
			))}
		</div>
		
    </>
  );
};
  
export default ComparePage;
  