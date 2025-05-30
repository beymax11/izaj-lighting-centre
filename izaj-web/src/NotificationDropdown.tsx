import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface NotificationDropdownProps {
  user: { name: string; email: string } | null;
}

export default function NotificationDropdown({ user }: NotificationDropdownProps) {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Example notification data
  const notifications = [
    {
      id: 1,
      type: 'order',
      message: 'Your order #12345 has been shipped',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 2,
      type: 'promo',
      message: 'Flash sale! 30% off all items this weekend',
      time: '5 hours ago',
      isRead: false
    },
    {
      id: 3,
      type: 'review',
      message: 'Someone replied to your review',
      time: 'Yesterday',
      isRead: true
    },
    {
      id: 4,
      type: 'system',
      message: 'Your account information was updated',
      time: '3 days ago',
      isRead: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Icon icon="mdi:package-variant" className="h-5 w-5 text-blue-500" />;
      case 'promo':
        return <Icon icon="mdi:tag" className="h-5 w-5 text-green-500" />;
      case 'review':
        return <Icon icon="mdi:comment-text" className="h-5 w-5 text-purple-500" />;
      case 'system':
        return <Icon icon="mdi:information" className="h-5 w-5 text-gray-500" />;
      default:
        return <Icon icon="mingcute:notification-newdot-line" className="h-5 w-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    if (!isNotificationDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
    <button
      onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
      className="relative text-black hover:text-orange-500 transition-colors duration-200"
      aria-label="Notifications"
    >
      <Icon icon="mingcute:notification-line" className="w-7 h-7 translate-y-1" />

      {user && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
          {unreadCount}
        </span>
      )}
    </button>

      {isNotificationDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
          <div className="py-2 px-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Notifications</h3>
            {user && (
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {user ? (
              notifications.length > 0 ? (
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        notification.isRead ? 'bg-white' : 'bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm ${
                              notification.isRead
                                ? 'text-gray-600'
                                : 'text-gray-800 font-medium'
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Icon icon="mdi:bell-off" className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-gray-500">No notifications yet</p>
                </div>
              )
            ) : (
              <div className="py-8 text-center">
                <Icon icon="mdi:account-alert-outline" className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600">Login first to see your notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
