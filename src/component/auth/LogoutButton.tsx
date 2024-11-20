import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks';


export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    //navigate('/');
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