import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        <textarea
          ref={ref}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            error ? 'border-error-500' : 'border-gray-300'
          } ${className}`}
          rows={props.rows || 5}
          {...props}
        />
        {error && <p className="mt-1 text-error-500 text-sm">{error}</p>}
      </div>
    );
  }
);

export default TextArea;