import { IoIosCheckmarkCircle, IoIosSync } from "react-icons/io";
import { useCompare } from "../../contexts";
import { Product } from "../../types/Product";
import { toast } from "react-toastify";

interface Props {
    product : Product;
};

const CompareButton: React.FC<Props> = ({product}) => {
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
                className="bg-slate-500 text-white  px-3 py-3  rounded-full"
                >
                
                    <IoIosCheckmarkCircle/>
                </button>
            ) : (
                <button onClick={() => {
                    addToCompare(product);
                    handleBtnCompare();
                }}
                className="bg-slate-500 text-white px-3 py-3  rounded-full"
                >
                    <IoIosSync/>
                </button>
            )}
        </>
        
    );
}
export default CompareButton;
