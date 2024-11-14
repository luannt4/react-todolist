'use client';
import BannerCard from "../cards/banner-card";


interface BannerProps {
  data: any;
  grid?: number;
  className?: string;
  girdClassName?: string;
}


const BannerGrid: React.FC<BannerProps> = ({
  data,
  grid = 3,
  girdClassName,
  className = 'mb-3 xl:mb-6',
}) => {
  return (
    <div className={className}>
        <div
            className={`grid grid-cols-1 md:grid-cols-${grid} gap-2 ${girdClassName ? girdClassName: 'md:gap-5 '}`}
        >
            {data?.map((banner: any) => (
                <BannerCard
                    key={`banner--key${banner.id}`}
                    banner={banner}
                    effectActive={true}
                    className="w-full overflow-hidden rounded"
                />
            ))}
        </div>
    </div>
  );
};

export default BannerGrid;
