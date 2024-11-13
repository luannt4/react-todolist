
import { IoCartOutline } from 'react-icons/io5';
import Heading from '../ui/heading';
import Text from '../ui/text';
const EmptyCart = () => {
  return (
    <div className="m-auto flex flex-col items-center justify-center ">
      <div className="flex mx-auto w-[220px] md:w-auto">
        <IoCartOutline className="text-[120px] text-gray-400" />
      </div>
      <Heading variant="titleMedium" className="mb-1.5 pt-8">
      Your cart is empty.
      </Heading>
      <Text>Please add product to your cart list</Text>
    </div>
  );
}

export default EmptyCart;
