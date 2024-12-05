import React from 'react';
import Heading from "../ui/heading";
import StarIcon from "../icons/star-icon";

interface Props {
    value: number;
    onRatingChange: (rating: number) => void;
}

const RatingFilter: React.FC<Props> = ({ value,onRatingChange }) => {
    const ratings = [5, 4, 3, 2, 1];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRating = Number(e.target.value);
        onRatingChange(selectedRating);
    };

    return (
        <div className="block mb-10">
            <Heading className="mb-3 block-title">Filter by Rating</Heading>
            <div className="flex flex-col items-start space-y-2">
                {ratings.map((rating) => (
                    <label
                        key={rating}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={value === rating}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <div className="flex items-center">
                            {rating !== undefined && [...Array(5)].map((_, idx) => (
                                <StarIcon
                                    key={idx + 1}
                                    color={idx + 1 <= rating ? '#F3B81F' : '#DFE6ED'}
                                    className="w-3 h-3 mx-0.5"
                                />

                            ))}
                        </div>
                        <span className="text-gray-700"> {rating == 5  ? "only" : "and up"}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RatingFilter;
