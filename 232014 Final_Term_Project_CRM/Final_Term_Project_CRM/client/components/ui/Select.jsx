'use client';

import PropTypes from 'prop-types';

export default function Select({ label, error, options = [], className = '', id, ...props }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={props.name}
        className={`w-full h-9 px-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-primary/15 ${error ? 'border-accent-red' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-accent-red">{error}</p>}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
  id: PropTypes.string,
};
