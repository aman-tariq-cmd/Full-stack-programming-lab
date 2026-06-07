'use client';

import PropTypes from 'prop-types';

export default function StatCard({ title, value, accent = 'primary', loading }) {
  const accents = {
    primary: 'border-t-primary',
    secondary: 'border-t-secondary',
    tertiary: 'border-t-tertiary',
    muted: 'border-t-text-muted',
  };

  if (loading) {
    return (
      <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 animate-pulse">
        <div className="h-4 bg-bg-elevated rounded w-24 mb-3" />
        <div className="h-8 bg-bg-elevated rounded w-16" />
      </div>
    );
  }

  return (
    <div className={`bg-bg-surface border border-border-subtle border-t-2 ${accents[accent]} rounded-lg p-5`}>
      <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">{title}</p>
      <p className="text-2xl font-semibold font-mono text-text-primary">{value}</p>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  accent: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'muted']),
  loading: PropTypes.bool,
};
