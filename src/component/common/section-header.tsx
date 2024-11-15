'use client';

import cn from 'classnames';
import Heading from '../ui/heading';
import Text from '../ui/text';

interface Props {
  sectionHeading?: string;
  sectionSubHeading?: string;
  className?: string;
  headingPosition?: string;
}

const SectionHeader: React.FC<Props> = ({
            sectionHeading = 'text-section-title',
            sectionSubHeading,
            className = 'mb-8',
            headingPosition = 'left',
                                        }) => {
    return (
        <div
            className={cn(` ${className}`, {
                'text-[16px]':headingPosition === 'hotdeal',
                'text-center':headingPosition === 'center',
            })}
        >
            <Heading
                variant="mediumHeading"
                className={cn({
                    'text-[16px] text-red-600': headingPosition === 'hotdeal',
                    'sm:text-[24px] sm:mb-1.5 font-semibold': headingPosition === 'center',
                })}
            >
                <div dangerouslySetInnerHTML={{
                    __html: sectionHeading,
                }}>
                
                </div>
            </Heading>
            {sectionSubHeading && (
                <Text variant="medium" className="">
                    {sectionSubHeading}
                </Text>
            )}
        </div>
    );
};

export default SectionHeader;
