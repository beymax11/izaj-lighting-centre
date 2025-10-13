'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, NotificationStats } from '@/types/notification';
import { 
  getNotifications, 
  updateNotification, 
  deleteNotification, 
  markAllNotificationsAsRead,
  getNotificationStats 
} from '@/services/notificationService';
import { useUserContext } from './UserContext';

interface NotificationContextType {
  notifications: Notification[];
  stats: NotificationStats | null;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: (params?: {
    limit?: number;
    offset?: number;
    type?: string;
    unread_only?: boolean;
  }) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refreshStats: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  clearError: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserContext();

  // Fetch notifications
  const fetchNotifications = async (params?: {
    limit?: number;
    offset?: number;
    type?: string;
    unread_only?: boolean;
  }) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getNotifications(params);
      
      if (response.success && response.data) {
        setNotifications(response.data);
      } else {
        setError(response.error || 'Failed to fetch notifications');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const response = await updateNotification(id, true);
      
      if (response.success && response.data) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === id 
              ? { ...notification, is_read: true }
              : notification
          )
        );
        
        // Update stats
        await refreshStats();
      } else {
        setError(response.error || 'Failed to mark notification as read');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await markAllNotificationsAsRead();
      
      if (response.success) {
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, is_read: true }))
        );
        
        // Update stats
        await refreshStats();
      } else {
        setError(response.error || 'Failed to mark all notifications as read');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all notifications as read');
    }
  };

  // Delete notification
  const deleteNotificationHandler = async (id: string) => {
    try {
      const response = await deleteNotification(id);
      
      if (response.success) {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
        
        // Update stats
        await refreshStats();
      } else {
        setError(response.error || 'Failed to delete notification');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete notification');
    }
  };

  // Refresh notification stats
  const refreshStats = async () => {
    if (!user) return;
    
    try {
      const response = await getNotificationStats();
      
      if (response.success && response.data) {
        setStats(response.data);
      } else {
        console.error('Failed to fetch notification stats:', response.error);
      }
    } catch (err) {
      console.error('Error fetching notification stats:', err);
      // Don't set error state for stats, just log it
    }
  };

  // Add notification to local state (for real-time updates)
  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    
    // Update stats
    if (stats) {
      setStats(prev => prev ? {
        ...prev,
        total: prev.total + 1,
        unread: notification.is_read ? prev.unread : prev.unread + 1,
        by_type: {
          ...prev.by_type,
          [notification.type]: prev.by_type[notification.type] + 1
        }
      } : null);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Fetch notifications when user changes
  useEffect(() => {
    if (user) {
      // Add a small delay to ensure the app is fully loaded
      const timer = setTimeout(() => {
        fetchNotifications();
        refreshStats();
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setNotifications([]);
      setStats(null);
    }
  }, [user]);

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchNotifications();
      refreshStats();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  const value: NotificationContextType = {
    notifications,
    stats,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification: deleteNotificationHandler,
    refreshStats,
    addNotification,
    clearError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
