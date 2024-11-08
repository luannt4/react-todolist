import { Link, Outlet } from "react-router-dom";

import Logo from "../../component/ui/logo";
import Container from "../../component/ui/container";
import HeaderMenutop from '../../component/header/menutop';
import MainMenu from "../../component/header/mainMenu";
import FormSearch from "../../component/formSearch";

const Header = () => {
   
    return (
        <header className="sticky md:top-0 mb-10  w-full  z-40 bg-white/75 dark:bg-black/75 backdrop-blur-sm dark:backdrop-blur-lg">
            <div className="top-bar  text-sm text-fill-base border-b border-black/10">
                <Container>
                    <div className="w-full h-11 flex justify-between items-center text-sm">
                        <text className="hidden md:block truncate">Stote Location: 1234 Heaven Stress, Beverly Hill, Melbourne, USA.</text>
                        <HeaderMenutop />
                    </div>
                </Container>
              
            </div>
            <div className="border-b border-black/10">
                <Container>
                    <div className="w-full flex py-4 h-20 justify-between items-center ">
                            <Logo/>
                            <FormSearch />
                            <div className="flex items-center gap-x-2.5 text-sm">
                                
                            
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
  