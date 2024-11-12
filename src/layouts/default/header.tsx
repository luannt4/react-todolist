
import Logo from "../../component/ui/logo";
import Container from "../../component/ui/container";
import HeaderMenutop from './header/menutop';
import MainMenu from "./header/mainMenu";
import FormSearch from "../../component/formSearch";

import { MyAccount } from "./header/myAccount";
import CartButton from "../../component/cart/cart-button";

const Header = () => {
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
                                <MyAccount />
                                <CartButton/>
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
  