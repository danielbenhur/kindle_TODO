
import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    const combinedClasses = [
      'flex h-10 w-full items-center justify-between rounded-sm border border-black bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50',
      className
    ].filter(Boolean).join(' ');

    return (
      <select className={combinedClasses} ref={ref} {...props}>
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';
