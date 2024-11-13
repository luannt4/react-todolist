
import { Drawer } from "./drawer";
import { useDrawer } from "../../../contexts";
import motionProps from "./motion";
import CartSideBar from "../../cart/cart-sidebar";
import MenuSideBar from "../../cart/menu-sidebar";

const ManagedDrawer = () => {
    const { displayDrawer, closeDrawer, drawerView } = useDrawer();
  
    return (
    <Drawer
      open={displayDrawer}
      onClose={closeDrawer}
      {...motionProps}
    >
      {drawerView === 'CART_SIDEBAR' && <CartSideBar />}
      {drawerView === 'MOBILE_MENU' && <MenuSideBar />}
    </Drawer>
  );
};
  
export default ManagedDrawer;
  