
import React from 'react';

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    const baseStyles =
      'flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const combinedClassName = `${baseStyles} ${className || ''}`;

    return (
      <select className={combinedClassName} ref={ref} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
