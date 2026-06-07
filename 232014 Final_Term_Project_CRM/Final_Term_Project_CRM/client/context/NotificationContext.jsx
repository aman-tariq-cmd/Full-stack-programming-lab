'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((type, message) => {
    const entry = {
      id: Date.now() + Math.random(),
      type,
      message,
      timestamp: new Date(),
    };
    setNotifications((prev) => [entry, ...prev].slice(0, 50));
    return entry;
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
