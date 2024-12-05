interface Props {
    onClear: () => void;
}

const ClearFilters: React.FC<Props> = ({ onClear }) => (
    <button className="bg-red-500 text-white px-4 py-2" onClick={onClear}>
        Clear All
    </button>
);

export default ClearFilters;
