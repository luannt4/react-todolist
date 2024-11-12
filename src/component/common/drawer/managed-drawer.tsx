
import { Drawer } from "./drawer";
import { useDrawer } from "../../../contexts";
import motionProps from "./motion";
import CartSideBar from "../../cart/cart-sidebar";

const ManagedDrawer = () => {
    const { displayDrawer, closeDrawer, drawerView } = useDrawer();
  
    return (
    <Drawer
      open={displayDrawer}
      onClose={closeDrawer}
      {...motionProps}
    >
      {drawerView === 'CART_SIDEBAR' && <CartSideBar />}
    </Drawer>
  );
};
  
export default ManagedDrawer;
  