import React from 'react';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, ...rest }, ref) => {
    return (
        <label
            className="group flex items-center gap-2 text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80 border-b border-border-base py-3.5 last:border-b-0 last:pb-0 first:pt-0">
            <input
                type="checkbox"
                className="form-checkbox text-yellow-100 w-[16px] h-[16px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-yellow-100 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-yellow-100 hover:checked:bg-yellow-100"
                ref={ref}
                {...rest}
            />
            <span className=" -mt-0.5">
              {label}
            </span>
        
        </label>
    );
  }
);

CheckBox.displayName = 'CheckBox';
