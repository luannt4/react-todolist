import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {BsChevronDown} from 'react-icons/bs';

interface Props {
    className?: string;
}
const links = [
  { href: '/settings', label: 'My Profile' },
  { href: '/whishlist', label: 'Wishlist' },
  { href: '/cart', label: 'Cart' },
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
                    <a className="block  truncate py-1 leading-6 hover:text-blue-500" href={link.href}>{link.label}</a>
                </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}