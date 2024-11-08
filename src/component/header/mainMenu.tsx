import cn from 'classnames';
import { Link } from "react-router-dom";
interface MenuProps {
    className?: string;
 }

const MainMenu: React.FC<MenuProps> = ({className }) => {

    return (
        <nav className={cn(
            'menuItem group py-3 hover:*:text-blue-500',
            className
        )}>
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/categories" className="mr-4">Categories </Link>
                
                <Link to="/blogs" className="mr-4">Blogs</Link>
                <Link to="/contact" className="mr-4">Contact</Link>
                    
        </nav>
    );
}
export default MainMenu;