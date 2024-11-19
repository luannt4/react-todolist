import CompareList from '../component/compare/compareList';
import Container from '../component/ui/container';

const ComparePage = () => {
  return (
        <Container>
		    <h1 className="text-2xl font-medium mb-6 capitalize">Compare </h1>
            <CompareList />
        </Container>
  );
};
  
export default ComparePage;
  