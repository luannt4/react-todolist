import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {BsChevronDown} from 'react-icons/bs';
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAuth, useDrawer } from '../../contexts';
import AccountIcon from '../icons/account-icon';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../features/auth/authSlice';

interface Props {
    className?: string;
}
const links = [
  { href: '/dashboard', label: 'My dashboard' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/cart', label: 'Cart' },
]


export const MyAccount: React.FC<Props> = ({className }) => {
    // Check if user is authenticated by looking for token
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    if (isLoggedIn) return (
        <div className=" lg:flex items-center shrink-0 accountButton">
            <Menu >
                <MenuButton className="flex gap-1 justify-center items-center">
                    <div className="cart-button">
                        <AccountIcon />
                    </div>
                  
                    <button className="text-sm font-normal focus:outline-none ms-2" aria-label="Authentication">Welcome, {user?.username}</button>
                    <BsChevronDown className="transition duration-300 ease-in-out transform" />
                </MenuButton>
                <MenuItems  anchor={{ to: 'bottom start', gap: '10px' }} className="border shadow-lg bg-white rounded-md text-sm min-w-[180px] py-3 px-4 z-50">
                    {links.map((link) => (
                        <MenuItem key={link.href} >
                            <Link className="block  truncate py-1 leading-6 hover:text-blue-500" to={link.href}>{link.label}</Link>
                        </MenuItem>
                    ))}
                    
                    <MenuItem>
                        <Link onClick={handleLogout} className="flex gap-1 items-center   truncate py-1 leading-6 hover:text-blue-500" to="/">
                            <MdLogout />
                            Logout
                        </Link>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
    
    return (
        <Link   to={'/login'} className=" lg:flex items-center shrink-0 accountButton">
            <div className="cart-button">
                <AccountIcon />
            </div>
            <button className="text-sm font-normal focus:outline-none ms-2" aria-label="Authentication">My Account</button>
        </Link>
    );
}