'use client';

import PropTypes from 'prop-types';

export default function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full h-9 px-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-primary/15 ${error ? 'border-accent-red' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-accent-red">{error}</p>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};
