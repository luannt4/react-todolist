import Container from "../component/ui/container";
import React from "react";

import {useQuery} from "@tanstack/react-query";
import { Post} from "../types/Product";
import Breadcrumb from "../component/ui/breadcrumb";

import cn from "classnames";
import {Link, useParams} from "react-router-dom";
import {getIdFromSlug} from "../utils/get-id-from-slug";
import {fetchPostDetails} from "../api/fetchPostDetails";
import {ROUTES} from "../utils/routes";
import Image from "../component/ui/image";

const BlogDetailPage = () => {
    
    const { slug } = useParams<{ slug: string }>();
    
    // Parse blog ID from the slug. Ensure this is done only once.
    const blogId = getIdFromSlug(slug as string);
    
    // Use `useQuery` to fetch blog details, ensuring a single request
    const { data: blog, isLoading } = useQuery<Post>({
        queryKey: ['blog', blogId],
        queryFn: () => fetchPostDetails(blogId as number),
        enabled: !!blogId,
        
    });
    
    const {id, title ,body,reactions ,views} = blog ?? {};
    
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[300px] bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );
    
    return (
        <>
            <Container>
                <Breadcrumb/>
                <article
                    className={cn(
                        'flex flex-col overflow-hidden  h-full  ',
                    )}
                    title={title}
                >
                    <div className="pb-5 h-full relative">
                        <h4 className={'font-bold text-2xl '}>
                            <Link
                                to={`${ROUTES.BLOG}/${slug}`}
                                className="text-skin-base line-clamp-2 hover:text-skin-primary"
                            >
                                {title}
                            </Link>
                        </h4>
                        <div className="entry-meta  text-gray-400">
                        <span
                            className="text-[13px] post-on pe-2.5 relative inline-block">Likes: {reactions?.likes} </span> •
                            <span className="text-[13px] has-dot px-2.5 relative inline-block">Views: {views} </span> •
                            <span className="text-[13px] has-dot ps-2.5 relative inline-block">4 mins read</span>
                        </div>
                    </div>
                    <div className="relative flex-shrink-0 mb-10">
                        <Image
                            src={`https://dummyjson.com/image/1050x450`}
                            alt={title || 'Product Image'}
                            width={1050}
                            height={450}
                        />
                    </div>
                    <div
                        className="single-content text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7 mb-10">
                        {body}
                    </div>
                    
                </article>
            </Container>
        </>
);
};

export default BlogDetailPage;
  