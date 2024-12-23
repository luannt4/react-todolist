import cn from 'classnames';
import Image from "../ui/image";
import {  Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

interface BlogProps {
    blog?: any;
    className?: string;
}


const BlogCard: React.FC<BlogProps> = ({blog, className}) => {
    const {id, title ,reactions ,views} = blog ?? {};
    // Create slug from title
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    return (
        <article
            className={cn(
                'flex flex-col product-card overflow-hidden  h-full bg-white ',
                className
            )}
            title={title}
        >
            <div className="relative flex-shrink-0 ">
                <Link
                    to={`${ROUTES.BLOG}/${slug}-${id}`}
                    className="text-skin-base "
                >
                    <div className="card-img-container flex overflow-hidden max-w-[420px] mx-auto relative ">
                        <Image
                            src={`https://dummyjson.com/image/330x220`}
                            alt={title || 'Product Image'}
                            width={330}
                            height={220}
                        />
                    </div>
                </Link>
            </div>

            <div className="flex flex-col py-3 px-3 h-full overflow-hidden text-center relative">
                <h4 className={"font-semibold text-md mb-1 "}>
                    <Link
                        to={`${ROUTES.BLOG}/${slug}-${id}`}
                        className="text-skin-base line-clamp-2 hover:text-blue-500"
                    >
                        {title}
                    </Link>
                </h4>
                <div className="entry-meta  text-gray-400">
                    <span className="text-[13px] post-on pe-2.5 relative inline-block">Likes: {reactions.likes} </span> •
                    <span className="text-[13px] has-dot px-2.5 relative inline-block">Views: {views} </span> •
                    <span className="text-[13px] has-dot ps-2.5 relative inline-block">4 mins read</span>
                </div>

            </div>
        </article>
    );
};

export default BlogCard;
