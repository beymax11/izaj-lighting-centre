import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNotificationContext } from '@/context/NotificationContext';
import { Notification } from '@/types/notification';

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
  
  const { 
    notifications, 
    stats, 
    isLoading, 
    error, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification: deleteNotificationHandler,
    clearError 
  } = useNotificationContext();

  const unreadCount = stats?.unread || 0;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Icon icon="mdi:package-variant" className="h-5 w-5 text-blue-600" />;
      case 'promo':
        return <Icon icon="mdi:tag" className="h-5 w-5 text-green-600" />;
      case 'review':
        return <Icon icon="mdi:comment-text" className="h-5 w-5 text-purple-600" />;
      case 'system':
        return <Icon icon="mdi:information" className="h-5 w-5 text-gray-600" />;
      case 'favorite':
        return <Icon icon="mdi:heart" className="h-5 w-5 text-red-600" />;
      case 'payment':
        return <Icon icon="mdi:credit-card" className="h-5 w-5 text-orange-600" />;
      default:
        return <Icon icon="mdi:bell" className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleMarkAsRead = async (id: string) => {
    if (!notifications.find(n => n.id === id)?.is_read) {
      await markAsRead(id);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    await deleteNotificationHandler(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
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
        className="relative text-black hover:text-gray-600 transition-all duration-200 hover:scale-110"
        aria-label="Notifications"
      >
        <Icon 
          icon={isNotificationDropdownOpen ? "mdi:bell" : "mdi:bell-outline"} 
          width="28" 
          height="28" 
        />

        {user && unreadCount > 0 && (
          <span className={`absolute -top-1 -right-1 bg-gradient-to-r from-gray-800 to-black text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold shadow-lg ${
            unreadCount > 9 ? 'px-1' : ''
          }`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isNotificationDropdownOpen && (
        <div className="absolute right-0 sm:right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 transform origin-top-right animate-scale-in max-w-[calc(100vw-2rem)]">
          <div className="py-3 px-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="mdi:bell-outline" className="w-5 h-5 text-black" />
              Notifications
            </h3>
            {user && unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                disabled={isLoading}
                className="text-sm text-gray-600 hover:text-black font-medium transition-colors duration-200 flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon icon="mdi:check-all" className="w-4 h-4" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 sm:max-h-96 overflow-y-auto custom-scrollbar">
            {user ? (
              isLoading ? (
                <div className="py-8 text-center px-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Loading notifications...</p>
                </div>
              ) : error ? (
                <div className="py-8 text-center px-4">
                  <div className="bg-red-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Icon icon="mdi:alert-circle-outline" className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">Error loading notifications</h3>
                  <p className="text-sm text-gray-600 mb-4">{error}</p>
                  <button 
                    onClick={clearError}
                    className="text-sm text-black hover:text-gray-600 font-medium"
                  >
                    Try again
                  </button>
                </div>
              ) : notifications.length > 0 ? (
                <div className="py-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 transition-all duration-200 group relative ${
                        !notification.is_read ? 'bg-gray-50/50' : 'bg-white'
                      }`}
                      onClick={() => {
                        if (!notification.is_read) {
                          handleMarkAsRead(notification.id);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 p-2 rounded-lg ${
                          notification.type === 'order' ? 'bg-blue-50' :
                          notification.type === 'promo' ? 'bg-green-50' :
                          notification.type === 'review' ? 'bg-purple-50' :
                          notification.type === 'favorite' ? 'bg-red-50' :
                          notification.type === 'payment' ? 'bg-orange-50' :
                          'bg-gray-50'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium mb-1 ${
                            !notification.is_read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <p className={`text-sm leading-relaxed ${
                            notification.is_read
                              ? 'text-gray-600'
                              : 'text-gray-800'
                          }`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Icon icon="mdi:clock-outline" className="w-3.5 h-3.5" />
                              {formatTime(notification.created_at)}
                            </p>
                            {!notification.is_read && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-lg"
                        >
                          <Icon icon="mdi:close" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center px-4">
                  <div className="bg-gray-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Icon icon="mdi:bell-off-outline" className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">No notifications yet</h3>
                  <p className="text-sm text-gray-500">
                    We'll notify you about your orders, promotions, and updates
                  </p>
                </div>
              )
            ) : (
              <div className="py-6 px-4 text-center bg-gradient-to-b from-gray-50 to-white">
                <div className="bg-gray-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <Icon icon="mdi:account-alert-outline" className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">Sign in to view notifications</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with your orders and promotions
                </p>
                <button 
                  className="inline-flex items-center px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-sm"
                  onClick={() => {
                    setIsNotificationDropdownOpen(false);
                    onOpenAuthModal();
                  }}
                >
                  <Icon icon="mdi:login" className="w-4 h-4 mr-2" />
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Add custom CSS for animations
const styles = `
  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-scale-in {
    animation: scale-in 0.2s ease-out;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #000000;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

