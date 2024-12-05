import React from 'react';
import { CheckBox } from '../ui/form/checkbox';
import Heading from "../ui/heading";

interface Props {
    value: string;
    onStatusChange: (status: string) => void;
}

const StatusFilter: React.FC<Props> = ({ value,onStatusChange }) => {
    const statuses = [
        { id: "all", label: "All" },
        { id: "onsale", label: "On Sale" },
        { id: "instock", label: "In Stock" },
    ];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedStatus = e.target.value;
        onStatusChange(selectedStatus);
    };
    return (
        <div className="block mb-10">
            <Heading className="mb-3 block-title">Filter by Status</Heading>
            <div className="flex flex-col space-y-2">
                {statuses.map((status) => (
                    <label
                        key={status.id}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="status"
                            value={status.id}
                            checked={value === status.id}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">{status.label}</span>
                    </label>

                ))}
            </div>
        </div>
    );
};

export default StatusFilter;
