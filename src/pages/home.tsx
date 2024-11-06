import Listingtabs from '../component/listingtabs';
import FormSearch from '../component/formSearch';

const HomePage = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <FormSearch />
            <Listingtabs />
        </div>
    );
};
  
export default HomePage;
  