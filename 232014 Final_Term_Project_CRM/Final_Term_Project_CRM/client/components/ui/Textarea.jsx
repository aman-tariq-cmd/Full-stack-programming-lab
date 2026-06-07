'use client';

import PropTypes from 'prop-types';

export default function Textarea({ label, error, className = '', id, ...props }) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full px-3 py-2 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-border-strong focus:ring-2 focus:ring-primary/15 resize-y min-h-[80px] ${error ? 'border-accent-red' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-accent-red">{error}</p>}
    </div>
  );
}

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};
