import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../backend/supabase/supabaseProduct';
import toast from 'react-hot-toast';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
}

interface NotificationsContextType {
  notifications: NotificationItem[];
  toggleNotifications: (e: React.MouseEvent) => void;
  notificationsOpen: boolean;
  handleNotificationClick: (id: number) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications must be used within NotificationsProvider');
  return context;
};

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotificationsOpen((prev) => !prev);
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  useEffect(() => {
    const channel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'centralized_product',
        },
        (payload) => {
          const newNotif: NotificationItem = {
            id: Date.now(),
            title: 'New Product Added',
            message: `Product "${payload.new.product_name}" added to inventory.`,
            time: new Date().toLocaleTimeString(),
            read: false,
            type: 'product',
          };
          setNotifications((prev) => [newNotif, ...prev]);
          toast.success(newNotif.message);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: 'quantity=neq.null',
        },
        (payload) => {
          if (payload.old.quantity !== payload.new.quantity) {
            const newNotif: NotificationItem = {
              id: Date.now(),
              title: 'Stock Updated',
              message: `Stock for "${payload.new.product_name}" changed from ${payload.old.quantity} to ${payload.new.quantity}.`,
              time: new Date().toLocaleTimeString(),
              read: false,
              type: 'stock',
            };
            setNotifications((prev) => [newNotif, ...prev]);
            toast.success(newNotif.message);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        toggleNotifications,
        notificationsOpen,
        handleNotificationClick,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};