import { IoClose } from 'react-icons/io5';

interface Props {
  itemKey: string;
  itemValue: string;
  onClick: () => void;
}

export const FilteredItem = ({ itemKey, itemValue, onClick }: Props) => {
  return (
    <div
      className="group flex shrink-0 m-1 items-center border border-border-base rounded text-[13px] px-2.5 py-1.5 capitalize text-brand-dark cursor-pointer transition duration-200 ease-in-out hover:border-blue-500"
      onClick={onClick}
    >
      {itemKey && itemValue}
      <IoClose className="text-sm text-body ml-2 rtl:mr-2 shrink-0 ltr:-mr-0.5 rtl:-ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};