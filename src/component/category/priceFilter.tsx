import React from 'react';
import Slider from 'react-slider';
import Heading from "../ui/heading";

interface Props {
    onPriceChange: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter: React.FC<Props> = ({ onPriceChange }) => {
    const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 1000]);

    const handleChange = (values: number[]) => {
        setPriceRange([values[0], values[1]]);
        onPriceChange(values[0], values[1]);
    };


    return (
        <div className="block mb-10">
            <Heading className="mb-3 block-title">Filter by Price</Heading>
            <Slider
                value={priceRange}
                onChange={handleChange}
                min={0}
                max={1000}
                step={10}
                className="mt-4 h-3 flex items-center "
                thumbClassName="bg-blue-500 h-4 w-4 rounded-full"
                trackClassName="bg-gray-200 h-2"
            />
            <p className="mt-4 text-base">
                ${priceRange[0]} - ${priceRange[1]}
            </p>
        </div>
    );
};

export default PriceFilter;
