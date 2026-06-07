'use client';

import PropTypes from 'prop-types';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';
import Button from '@/components/ui/Button';

const typeIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const typeColors = {
  success: 'text-secondary border-l-secondary',
  error: 'text-accent-red border-l-accent-red',
  info: 'text-primary border-l-primary',
};

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, clearAll } = useNotifications();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-bg-surface border-l border-border-subtle shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
          <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {notifications.length > 0 && (
          <div className="px-5 py-3 border-b border-border-subtle">
            <Button variant="ghost" className="text-xs" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-text-secondary text-sm text-center py-8">No notifications yet</p>
          ) : (
            notifications.map((n) => {
              const Icon = typeIcons[n.type] || Info;
              return (
                <div
                  key={n.id}
                  className={`flex gap-3 p-3 bg-bg-elevated rounded-md border-l-[3px] ${typeColors[n.type] || typeColors.info}`}
                >
                  <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary">{n.message}</p>
                    <p className="text-xs text-text-muted font-mono mt-1">
                      {n.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

NotificationPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
