import { Link } from "react-router-dom";
import { IoIosHeart, IoIosSync } from 'react-icons/io';

import cn from 'classnames';
import { MenuTopMyAccount } from "./menuTopAccount";
import { useCompare, useWishlist } from "../../contexts";


interface MenuProps {
    className?: string;
}

const HeaderMenutop: React.FC<MenuProps> = ({className }) => {
    const {compareList} = useCompare();
    const {wishlistList} = useWishlist();

    return (
        <div className={cn(
            'flex flex-shrink-0 smx-auto pace-s-5',
            className
        )}>
            <nav className="relative  flex transition-all duration-200 ease-in-out  ">
                <div className="menuItem group cursor-pointer mx-2 md:mx-3 ">
                    <Link to="/wishlist" className=" py-2 flex gap-1 items-center hover:text-blue-500"> 
                        <IoIosHeart className="h-4 w-4"/>
                        Wishlist({wishlistList.length})
                    </Link>
                </div>
                <div className="menuItem group cursor-pointer mx-2 md:mx-3 ">
                <Link to="/compare" className=" py-2 flex gap-1 items-center hover:text-blue-500">
                    <IoIosSync className="h-4 w-4"/>
                    Compare({compareList.length})
                </Link>
                </div>
            
                <MenuTopMyAccount/>
            </nav>
        </div>
    );
}
export default HeaderMenutop;