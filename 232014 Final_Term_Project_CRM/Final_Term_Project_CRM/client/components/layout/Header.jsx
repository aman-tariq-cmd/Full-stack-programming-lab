'use client';

import PropTypes from 'prop-types';
import { Bell } from 'lucide-react';
import { getUser } from '@/lib/auth';

export default function Header({ title, onOpenNotifications, notificationCount }) {
  const user = getUser();

  return (
    <header className="sticky top-0 z-20 bg-bg-surface/95 backdrop-blur border-b border-border-subtle px-4 md:px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-md text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary-container text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-blue-dim flex items-center justify-center text-primary text-sm font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="hidden sm:block text-sm text-text-primary">{user?.name}</span>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onOpenNotifications: PropTypes.func.isRequired,
  notificationCount: PropTypes.number,
};
