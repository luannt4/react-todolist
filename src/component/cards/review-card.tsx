import type { FC } from 'react';
import Heading from "../ui/heading";
import StarIcon from "../icons/star-icon";
interface ReviewProps {
    item: any;
    className?: string;
}

const ReviewCard: FC<ReviewProps> = ({  item, className = '' }) => {
    const date = new Date(item.date  || Date.now()); // Default to current date if invalid
    const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
    return (
        <div
            className={`border-b border-border-base last:border-0 pb-6 mb-6 last:mb-0 ${className}`}
        >
            <div className="flex -mx-0.5 mb-3.5">
                {item.rating !== undefined && [...Array(5)].map((_,idx) => (
                    <StarIcon
                        key={idx+1}
                        color={idx + 1 < item.rating ? '#F3B81F' : '#DFE6ED'}
                        className="w-3 h-3 mx-0.5"
                    />
                ))}
            </div>
            <p className="text-sm text-gray-600 mb-1.5">{formattedDate}</p>
            <p className="xl:leading-[2em]">{item.comment }</p>
            <div className="pt-2 text-sm text-brand-dark text-opacity-80">
                By <span className="inline-block ltr:ml-[3px] rtl:mr-[3px] font-semibold">
                  {item.reviewerName}
                </span>
            </div>
        </div>
    );
};

export default ReviewCard;
