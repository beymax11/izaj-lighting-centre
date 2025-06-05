import { Icon } from '@iconify/react';

interface HeaderProps {
  sidebarCollapsed: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  notifications: Array<{
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: string;
  }>;
  notificationsOpen: boolean;
  toggleNotifications: (e: React.MouseEvent) => void;
  handleNotificationClick: (id: number) => void;
  markAllAsRead: () => void;
}

const Header = ({
  sidebarCollapsed,
  setMobileMenuOpen,
  setSidebarCollapsed,
  notifications,
  notificationsOpen,
  toggleNotifications,
  handleNotificationClick,
  markAllAsRead,
}: HeaderProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className={`bg-white shadow-2xl border border-white
        px-4 sm:px-8 py-3 rounded-none sm:rounded-2xl shrink-0 transition-all duration-300
        backdrop-blur-md mb-4 mt-2
        ${sidebarCollapsed ? 'mx-0 sm:mx-2' : 'mx-0 sm:mx-8'}
      `}
      style={{
        borderLeft: '6px solid #fff',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        height: 'auto',
        minHeight: '65px',
        position: 'relative',
        zIndex: 100
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          <button
            className="p-2 rounded-lg bg-white hover:bg-yellow-50 border border-yellow-50 shadow transition lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-white hover:bg-yellow-50 border border-yellow-50 shadow transition hidden lg:block"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
          </button>
          <div className="relative min-w-0 flex-1 max-w-xs ml-2">
            <Icon icon="mdi:magnify" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-150 focus:border-yellow-200 bg-white shadow"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative notification-container" style={{ overflow: 'visible' }}>
            <button 
              className="p-2 rounded-lg bg-white hover:bg-yellow-100 border border-yellow-100 shadow transition relative"
              onClick={toggleNotifications}
            >
              <Icon icon="mdi:bell-outline" className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {notificationsOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  right: '0',
                  zIndex: 101
                }}
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-none">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationClick(notification.id);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            notification.type === 'order' ? 'bg-green-100' :
                            notification.type === 'payment' ? 'bg-blue-100' :
                            'bg-yellow-100'
                          }`}>
                            <Icon 
                              icon={
                                notification.type === 'order' ? 'mdi:shopping-outline' :
                                notification.type === 'payment' ? 'mdi:credit-card-outline' :
                                'mdi:alert-outline'
                              }
                              className={`w-5 h-5 ${
                                notification.type === 'order' ? 'text-green-600' :
                                notification.type === 'payment' ? 'text-blue-600' :
                                'text-yellow-600'
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 