'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { NotificationProvider, useNotifications } from '@/context/NotificationContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import Chatbot from '@/components/chatbot/Chatbot';
import ToastProvider from '@/components/providers/ToastProvider';
import Spinner from '@/components/ui/Spinner';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/dashboard/customers': 'Customers',
  '/dashboard/customers/add': 'Add Customer',
  '/dashboard/invoices': 'Invoices',
  '/dashboard/invoices/generate': 'Generate Invoice',
};

function getPageTitle(pathname) {
  if (pathname.includes('/edit')) return 'Edit Customer';
  if (pathname.match(/\/customers\/[^/]+$/)) return 'Customer Detail';
  for (const [path, title] of Object.entries(pageTitles)) {
    if (pathname === path || pathname.startsWith(path + '/')) return title;
  }
  return 'Dashboard';
}

function DashboardShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { notifications } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenChatbot={() => setChatbotOpen((o) => !o)}
        notificationCount={notifications.length}
      />

      {/* Main content offset by sidebar width (240px) on desktop */}
      <div className="flex flex-col min-h-screen pb-20 md:pb-0 md:ml-[240px]">
        <div className="flex flex-col flex-1 min-w-0">
          <Header
            title={getPageTitle(pathname)}
            onOpenNotifications={() => setNotificationsOpen(true)}
            notificationCount={notifications.length}
          />
          <main className="flex-1 p-4 md:p-6 overflow-x-auto">{children}</main>
        </div>
      </div>

      <NotificationPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <Chatbot isOpen={chatbotOpen} onToggle={() => setChatbotOpen((o) => !o)} />
      <ToastProvider />
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <NotificationProvider>
      <DashboardShell>{children}</DashboardShell>
    </NotificationProvider>
  );
}
