
import React from 'react';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const baseStyles =
      'flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const combinedClassName = `${baseStyles} ${className || ''}`;

    return <input className={combinedClassName} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';

export default Input;
