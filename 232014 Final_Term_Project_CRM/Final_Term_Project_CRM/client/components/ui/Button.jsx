'use client';

import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const base = 'inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary-container text-white hover:bg-primary',
    secondary: 'bg-bg-elevated text-text-primary border border-border-subtle hover:border-border-strong',
    ghost: 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
    danger: 'bg-accent-red-dim text-accent-red hover:bg-accent-red hover:text-white',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
