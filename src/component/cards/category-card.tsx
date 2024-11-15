import cn from 'classnames';
import ImageFill from '../ui/image';
import { Link } from 'react-router-dom';

interface Props {
    item: any;
    href: string;
    className?: string;
    variant: string;
}

const CategoryCard: React.FC<Props> = ({ item, href, className,variant}) => {
    const {name,total} = item ?? {};
    
    return (
        <Link
            to={href}
            className={cn('group block w-full', className)}
        >
            <div className={cn(
                     'flex flex-col  items-center text-[14px]',
                     {
                         'card-category--zoom gap-2': variant === 'default' ,
                         'bg-white rounded p-2 lg:p-5': variant === 'card',
                     }
                 )}
            >
                <div className={cn(
                         'card-category--thumb  ',
                         {
                             'rounded-full overflow-hidden relative bg-gray-100 min-w-[100px] h-[100px] ': variant === 'default' ,
                             'max-w-[90px] h-[95px] ': variant === 'card',
                         }
                     )}
                >
                    <img loading="lazy" className="group-hover:scale-105 duration-300 absolute w-full h-full object-cover"
                            src={`https://dummyjson.com/image/300x300/f1f5f9?fontFamily=poppins&text=${String(name).replace(/ /g, '+')}`}
                            alt={name} />   
                   
                </div>
                <div className="category-info text-center">
                    <h3 className="font-semibold text-brand-dark truncate leading-6 group-hover:text-blue-500">
                        {name}
                    </h3>
                    {variant === 'default' && <p className={"text-gray-600"}>5 Products</p>}
                    
                </div>
                
            </div>
        </Link>
    );
};

export default CategoryCard;
