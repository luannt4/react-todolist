import cn from 'classnames';


interface Props{
    className?: string;
    categories: any;
    onNavClick: any;
    activeTab: string;
}
const ListingTabsList: React.FC<Props> = ({ className = 'mb-12 pb-0.5', categories, onNavClick, activeTab}) => {
    
    return (
        <div
            className={cn(
                'sm:flex items-center block-title mb-1.5 gap-2',
                className,
            )}
        >
            <h3 className="text-base text-[16px] uppercase text-skin-base font-bold border-0 hover:text-skin-primary lg:basis-[30%]">
                Electronic & Digital
            </h3>
            
            <div className="ltabs-tabs-wrap flex flex-wrap	 justify-end lg:basis-[70%]">
                <ul key="content" className="flex text-[14px] leading-7 ">
                    {categories?.slice(0, 4)
                    ?.map((category: any, idx: number) => {
                            return (
                                <li
                                    className={`ps-2 hover:text-skin-primary ${
                                        activeTab === category.slug
                                            ? 'text-skin-primary'
                                            : 'text-fill-base '
                                    }`}
                                    key={`${idx}`}
                                >
                                    <button
                                    key={idx}
                                    onClick={() => onNavClick(category.slug)}
                                    className={`px-4 py-1 rounded ${
                                        activeTab === category.slug ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}
                                    >
                                    {category.name} 
                                    </button>
                                    
                                </li>
                            );
                        })}
                </ul>
            </div>

        </div>
    );
}
export default ListingTabsList;