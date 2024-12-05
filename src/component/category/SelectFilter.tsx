import Heading from "../ui/heading";
import React from "react";

interface Props {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

const SelectFilter: React.FC<Props> = ({ label, value, options, onChange }) => (
    <div className="block mb-10">
        <Heading className=" mb-3 block-title">Filter by {label}</Heading>
        <select className="w-full border border-gray-300 rounded p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default SelectFilter;
