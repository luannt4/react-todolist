
import Logo from "../../component/ui/logo";
import Container from "../../component/ui/container";
import HeaderMenutop from './header/menutop';
import MainMenu from "./header/mainMenu";
import FormSearch from "../../component/formSearch";
import AccountIcon from '../../component/icons/account-icon';
import CartIcon from '../../component/icons/cart-icon';
import { HeaderMyAccount } from "./header/myAccount";
import {useCart } from '../../contexts';

const Header = () => {
    const {totalItems} = useCart();

    return (

        <header className="sticky md:top-0  w-full  z-40 bg-white/75 dark:bg-black/75 ">
            <div className="top-bar  text-sm text-fill-base border-b border-black/10">
                <Container>
                    <div className="w-full h-11 flex justify-between items-center text-sm">
                        <p className="hidden md:block truncate">Stote Location: 1234 Heaven Stress, Beverly Hill, Melbourne, USA.</p>
                        <HeaderMenutop />
                    </div>
                </Container>
              
            </div>
            <div className="border-b border-black/10">
                <Container>
                    <div className="w-full flex py-4 h-20 justify-between items-center ">
                            <Logo/>
                            <FormSearch />
                            <div className="text-brand-icon-header flex text-sm space-x-5 xl:space-x-10 lg:max-w-[33%]">
                                <HeaderMyAccount />
                                <div className="items-center justify-center shrink-0 h-auto focus:outline-none transform lg:flex" aria-label="cart-button">
                                    <div className="relative flex items-center">
                                        <div className="flex items-center relative cart-button">
                                            <CartIcon/>
                                            <span className="cart-counter-badge  h-[18px] min-w-[18px] rounded-full flex items-center justify-center bg-blue-500 text-white absolute -top-1 left-3 text-[11px]">
                                                {totalItems}
                                            </span>
                                        </div>
                                            <span className="text-sm font-normal ms-2">My Cart</span>
                                        </div>
                                </div>

                            </div>
                        </div>
                </Container>
                
            </div>
            <div className="navbar  border-b border-black/10">
                <Container>
                    <MainMenu />
                </Container>
            </div>
            
            
        </header>
    );
  };
  
export default Header;
  