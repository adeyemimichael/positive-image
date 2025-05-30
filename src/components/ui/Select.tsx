import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, fullWidth = true, className = '', ...props }, ref) => {
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
        <select
          ref={ref}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            error ? 'border-error-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-error-500 text-sm">{error}</p>}
      </div>
    );
  }
);

export default Select;