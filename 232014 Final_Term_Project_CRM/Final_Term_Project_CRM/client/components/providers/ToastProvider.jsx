'use client';

import { Toaster, toast as hotToast } from 'react-hot-toast';
import { useNotifications } from '@/context/NotificationContext';

export default function ToastProvider() {
  const { addNotification } = useNotifications();

  const toast = {
    success: (message) => {
      hotToast.success(message);
      addNotification('success', message);
    },
    error: (message) => {
      hotToast.error(message);
      addNotification('error', message);
    },
    info: (message) => {
      hotToast(message);
      addNotification('info', message);
    },
  };

  if (typeof window !== 'undefined') {
    window.__crmToast = toast;
  }

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#242429',
          color: '#F0F0F5',
          border: '1px solid #2A2A31',
          borderLeft: '3px solid #4d9eff',
        },
      }}
    />
  );
}

export function getToast() {
  if (typeof window !== 'undefined' && window.__crmToast) {
    return window.__crmToast;
  }
  return {
    success: (msg) => hotToast.success(msg),
    error: (msg) => hotToast.error(msg),
    info: (msg) => hotToast(msg),
  };
}
