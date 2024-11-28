import { IoIosCheckmarkCircle, IoIosSync } from "react-icons/io";
import { removeFromCompare, addToCompare } from '../../features/compare/compareSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Product } from "../../types/Product";
import cn from 'classnames';
import { useModal } from "../../contexts";

interface Props {
    product : Product;
    className?: string;
};

const CompareButton: React.FC<Props> = ({product,className}) => {
    const compareList = useAppSelector(state => state.compare.compareList);
    const dispatch = useAppDispatch();
    const {openAlert } = useModal();

    const InCompare = (productId: number) => compareList.some((product) => product.id === productId);
    const isInCompare = InCompare(product?.id);
    const LimitCompare = 4;
   
    const handleAddToCompare = () => {
        if(compareList.length < LimitCompare){
            dispatch(addToCompare(product));
        }else{
            openAlert ("ALERT_VIEW", `You have ${LimitCompare} products ready to compare`)
        }
        
    };
    

    return (
        <>
            {isInCompare ? (
                <button onClick={() => {
                    dispatch(removeFromCompare(product?.id));
                }}
                className={cn('bg-gray-200 text-gray-600  px-3 py-3  rounded-full hover:bg-blue-500 hover:text-white',className)} >
                
                    <IoIosCheckmarkCircle/>
                </button>
            ) : (
                <button onClick={handleAddToCompare}
                className={cn(' bg-gray-200 text-gray-600 px-3 py-3  rounded-full hover:bg-blue-500 hover:text-white',className)}
                >
                    <IoIosSync/>
                </button>
            )}
        </>
        
    );
}
export default CompareButton;
