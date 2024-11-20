import { Link } from "react-router-dom";
import {  useDrawer } from "../../contexts";
import DeleteIcon from "../icons/delete-icon";
import Heading from "../ui/heading";
import Text from "../ui/text";
import usePrice from "../product/use-price";
import cn from 'classnames';
import EmptyCart from "./empty-cart";
import Scrollbar from "../ui/scrollbar";
import CartItem from "./cart-sidebar-items";
import CloseIcon from "../icons/close-icon";
import CartSideBarItems from "./cart-sidebar-items";

const CartSideBar = () => {
    /*const { closeDrawer } = useDrawer();
    const { price: cartTotal } = usePrice({
        amount: total,
        currencyCode: 'USD',
    });*/
    return (
        <h1 className="text-2xl font-medium mb-6 capitalize">Slidebar</h1>
    );
};
  
export default CartSideBar;
  