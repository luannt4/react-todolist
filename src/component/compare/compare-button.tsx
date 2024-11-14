import { IoIosCheckmarkCircle, IoIosSync } from "react-icons/io";
import { useCompare } from "../../contexts";
import { Product } from "../../types/Product";
import { toast } from "react-toastify";
import cn from 'classnames';
interface Props {
    product : Product;
    className?: string;
};

const CompareButton: React.FC<Props> = ({product,className}) => {
    const {addToCompare, compareList,removeFromCompare} = useCompare();
    const InCompare = (productId: number) => compareList.some((product) => product.id === productId);
    const isInCompare = InCompare(product?.id);
    const handleBtnCompare = () => {
        const toastStatus = isInCompare === true ? 'Remove from compares list' : 'Added to compares list';
        toast(toastStatus, {
            progressClassName: 'fancy-progress-bar',
            position: 'bottom-right',
            autoClose: 3000,
        });
    };
    

    return (
        <>
            {isInCompare ? (
                <button onClick={() => {
                    removeFromCompare(product?.id);
                    handleBtnCompare();
                }}
                className={cn('bg-gray-200 text-gray-600  px-3 py-3  rounded-full hover:bg-blue-500 hover:text-white',className)} >
                
                    <IoIosCheckmarkCircle/>
                </button>
            ) : (
                <button onClick={() => {
                    addToCompare(product);
                    handleBtnCompare();
                }}
                className={cn(' bg-gray-200 text-gray-600 px-3 py-3  rounded-full hover:bg-blue-500 hover:text-white',className)}
                >
                    <IoIosSync/>
                </button>
            )}
        </>
        
    );
}
export default CompareButton;
