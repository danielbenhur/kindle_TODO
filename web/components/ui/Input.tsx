
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const combinedClasses = [
      'flex h-10 w-full rounded-sm border border-black bg-transparent px-3 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50',
      className,
    ].filter(Boolean).join(' ');
    
    return (
      <input
        type={type}
        className={combinedClasses}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
