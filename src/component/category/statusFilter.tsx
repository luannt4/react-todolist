import React from 'react';
import Heading from "../ui/heading";

interface Props {
    onStatusChange: (status: string) => void;
}

const StatusFilter: React.FC<Props> = ({ onStatusChange }) => {
    const statuses = ['all', 'onsale', 'instock'];

    return (
        <div className="block mb-10">
            <Heading className="mb-3 block-title">Filter by Status</Heading>
            <div className="flex flex-col space-y-2">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => onStatusChange(status)}
                        className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StatusFilter;
