import React from 'react';

interface Props {
    onRatingChange: (rating: number) => void;
}

const RatingFilter: React.FC<Props> = ({ onRatingChange }) => {
    return (
        <div className="block mb-10">
            <h4 className="text-lg font-semibold">Filter by Rating</h4>
            <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                        key={rating}
                        onClick={() => onRatingChange(rating)}
                        className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {rating}+
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RatingFilter;
