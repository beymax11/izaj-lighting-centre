import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface NotificationDropdownProps {
  user: User | null;
  onOpenAuthModal: () => void;
}

export default function NotificationDropdown({ user, onOpenAuthModal }: NotificationDropdownProps) {
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
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 transform transition-all duration-300 ease-out origin-top-right">
          <div className="py-3 px-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="mdi:bell-ring-outline" className="w-5 h-5 text-orange-500" />
              Notifications
            </h3>
            {user && unreadCount > 0 && (
              <button className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 flex items-center gap-1">
                <Icon icon="mdi:check-all" className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
            {user ? (
              notifications.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-5 py-4 hover:bg-gray-50 transition-all duration-200 ${
                        notification.isRead ? 'bg-white' : 'bg-orange-50/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 p-2 rounded-xl ${
                          notification.type === 'order' ? 'bg-blue-50' :
                          notification.type === 'promo' ? 'bg-green-50' :
                          notification.type === 'review' ? 'bg-purple-50' :
                          'bg-gray-50'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${
                            notification.isRead
                              ? 'text-gray-600'
                              : 'text-gray-800 font-medium'
                          }`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Icon icon="mdi:clock-outline" className="w-3.5 h-3.5" />
                              {notification.time}
                            </p>
                            {!notification.isRead && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                    <Icon icon="mdi:bell-off-outline" className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No notifications yet</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    We'll notify you when you have updates about your orders, promotions, and more
                  </p>
                </div>
              )
            ) : (
              <div className="py-10 px-8 text-center bg-gradient-to-b from-gray-50 to-white">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-100 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-orange-50 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                    <Icon icon="mdi:account-alert-outline" className="h-12 w-12 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Sign in to view notifications</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                  Stay updated with your orders, promotions, and important updates by signing in to your account
                </p>
                <button 
                  className="group inline-flex items-center px-8 py-3.5 bg-black text-white rounded-xl hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-sm"
                  onClick={() => {
                    setIsNotificationDropdownOpen(false);
                    onOpenAuthModal();
                  }}
                >
                  <Icon icon="mdi:login" className="w-5 h-5 mr-2.5 group-hover:rotate-12 transition-transform duration-300" />
                  Sign in now
                </button>
                <p className="mt-4 text-xs text-gray-500">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => {
                      setIsNotificationDropdownOpen(false);
                      onOpenAuthModal();
                    }}
                    className="text-orange-500 hover:text-orange-600 font-medium underline-offset-2 hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Add this CSS somewhere in your global styles

