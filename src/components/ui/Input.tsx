import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-gray-700 font-medium mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            error ? 'border-error-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-error-500 text-sm">{error}</p>}
      </div>
    );
  }
);

export default Input;