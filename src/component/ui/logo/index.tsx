import { Link } from "react-router-dom";
import { siteSettings } from "../../../settings/site-settings";

interface Props {
    className?: string;
    href?: string;
  }
  const Logo: React.FC<Props> = ({
    className,
    href = siteSettings.logo.href,
    ...props
  }) => {
    return (
        <div className="font-semibold md:text-2xl text-xl">
            <Link to="/" className="flex items-center">SH
                <span className="text-gray-500">O</span>PYSH
                <span className="text-gray-500">O</span>P
            </Link>
        </div>
    );
};
  
export default Logo;
  