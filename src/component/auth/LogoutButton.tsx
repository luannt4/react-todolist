import { logout } from '../../features/auth/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearCart} from "../../features/cart/cartThunks";


export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
      dispatch(clearCart({ cartId: user?.id! }));
      dispatch(logout());
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};