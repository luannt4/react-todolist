import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {BsChevronDown} from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface Props {
    className?: string;
}
const links = [
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
  { href: '/dashboard', label: 'Dashboard' },
  
]


export const HeaderSettings: React.FC<Props> = ({className }) => {
    return (
        <Menu>
            <MenuButton className="flex gap-1 justify-center items-center">
                My account
                <BsChevronDown className="transition duration-300 ease-in-out transform" />
            </MenuButton>
            <MenuItems  anchor={{ to: 'bottom start', gap: '4px' }} className="border shadow-lg bg-white rounded-md text-sm min-w-[180px] py-3 px-4 z-50">
                {links.map((link) => (
                <MenuItem key={link.href} >
                    <Link className="block  truncate py-1 leading-6 hover:text-blue-500" to={link.href}>{link.label}</Link>
                </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}