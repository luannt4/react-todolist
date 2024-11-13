import { IoIosCheckmarkCircle, IoIosSync } from "react-icons/io";
import { useCompare } from "../../contexts";
import { Product } from "../../types/Product";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface Props {
    product : Product;

};

const CompareButton: React.FC<Props> = ({product}) => {
    const [compareToggle, setCompareToggle] = useState(false);
    const {addToCompare, compareList,removeFromCompare} = useCompare();
    const isInCompare = (productId: number) => compareList.some((product) => product.id === productId);

    /*const handleToggle = () => {
    setCompareToggle(!compareToggle);
    };*/
    useEffect(() => {
    // Toggle only if some condition is met or when specific dependencies change
        if (compareToggle) {
            setCompareToggle(!compareToggle);
            const toastStatus: string = compareToggle === true ? 'Remove from favorite list' : 'Added to favorite list';
            console.log('toastStatus',toastStatus);
            toast(toastStatus, {
                progressClassName: 'fancy-progress-bar',
                position: 'bottom-right',
                autoClose: 4000,
            });
        }
    }, [compareToggle]);

    
    

    return (
        <>
            {isInCompare(product?.id) ? (
                <button
                onClick={() => removeFromCompare(product?.id)}
                className="bg-slate-500 text-white  px-3 py-3  rounded-full"
                >
                
                    <IoIosCheckmarkCircle/>
                </button>
            ) : (
                <button
                onClick={() => addToCompare(product)}
                className="bg-slate-500 text-white px-3 py-3  rounded-full"
                >
                    <IoIosSync/>
                </button>
            )}
        </>
        
    );
}
export default CompareButton;
