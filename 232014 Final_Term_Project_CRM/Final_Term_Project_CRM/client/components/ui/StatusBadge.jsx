'use client';

import PropTypes from 'prop-types';
import { STATUS_COLORS } from '@/lib/constants';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium font-mono ${STATUS_COLORS[status] || 'bg-bg-overlay text-text-secondary'}`}>
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
