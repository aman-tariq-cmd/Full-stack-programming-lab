'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  MessageCircle,
  LogOut,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { logout, getUser } from '@/lib/auth';

const SIDEBAR_WIDTH = 240;

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/invoices', label: 'Invoices', icon: FileText },
];

export default function Sidebar({ onOpenNotifications, onOpenChatbot, notificationCount }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar — fixed 240px */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen bg-bg-surface border-r border-border-subtle flex-col z-30"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div className="px-5 py-6 border-b border-border-subtle shrink-0">
          <h1 className="text-lg font-semibold text-text-primary">CRM Pro</h1>
          <p className="text-xs text-text-muted mt-0.5">Air University</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive(href)
                  ? 'bg-accent-blue-dim text-primary border-l-[3px] border-l-primary'
                  : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}

          <button
            onClick={onOpenNotifications}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
          >
            <Bell className="w-4 h-4 shrink-0" />
            Notifications
            {notificationCount > 0 && (
              <span className="ml-auto bg-primary-container text-white text-xs px-1.5 py-0.5 rounded-full font-mono">
                {notificationCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenChatbot}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            Chatbot
          </button>
        </nav>

        <div className="px-4 py-4 border-t border-border-subtle shrink-0">
          <p className="text-sm font-medium text-text-primary truncate">{user?.name || 'User'}</p>
          <p className="text-xs text-text-muted truncate mb-3">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-red transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border-subtle z-30 flex justify-around py-2 safe-area-pb">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs ${
              isActive(href) ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
        <button
          onClick={onOpenNotifications}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs text-text-secondary relative"
        >
          <Bell className="w-5 h-5" />
          Notifications
          {notificationCount > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 bg-primary-container rounded-full" />
          )}
        </button>
        <button
          onClick={onOpenChatbot}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs text-text-secondary"
        >
          <MessageCircle className="w-5 h-5" />
          Chat
        </button>
      </nav>
    </>
  );
}

Sidebar.propTypes = {
  onOpenNotifications: PropTypes.func.isRequired,
  onOpenChatbot: PropTypes.func.isRequired,
  notificationCount: PropTypes.number,
};
