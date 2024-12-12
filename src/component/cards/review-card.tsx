import type { FC } from 'react';
import Heading from "../ui/heading";
import StarIcon from "../icons/star-icon";
interface ReviewProps {
  item: any;
  className?: string;
}

const ReviewCard: FC<ReviewProps> = ({  item, className = '' }) => {
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
      <Heading className="mb-1.5">{item.title}</Heading>
      <p className="xl:leading-[2em]">{item.description}</p>
      <div className="pt-2 text-sm text-brand-dark text-opacity-80">
        By
        <span className="inline-block ltr:ml-[3px] rtl:mr-[3px] font-semibold">
          {item.author}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
