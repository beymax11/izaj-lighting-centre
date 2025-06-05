import { useState, useEffect } from 'react';
import { Products } from './pages/products';
import Orders from './pages/orders';
import Reports from './pages/reports';
import Payments from './pages/payments';
import Feedbacks from './pages/feedbacks';
import Login from './pages/login';
import Messages from './pages/messages';
import Profile from './pages/profile';
import Settings from './pages/settings';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('DASHBOARD');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Order',
      message: 'You have received a new order #1234',
      time: '5 minutes ago',
      read: false,
      type: 'order'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of ₱2,500 has been received',
      time: '1 hour ago',
      read: false,
      type: 'payment'
    },
    {
      id: 3,
      title: 'Low Stock Alert',
      message: 'Product "Ceiling Light" is running low on stock',
      time: '2 hours ago',
      read: true,
      type: 'alert'
    }
  ]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-container')) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const toggleNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotificationsOpen(!notificationsOpen);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'MESSAGES':
        return <Messages />;
      case 'PRODUCTS':
        return <Products 
          showAddProductModal={showAddProductModal} 
          setShowAddProductModal={setShowAddProductModal} 
        />;
      case 'ORDERS':
        return <Orders setIsOverlayOpen={setIsOverlayOpen} />;
      case 'FEEDBACKS':
        return <Feedbacks setIsFeedbackModalOpen={setIsFeedbackModalOpen} />;
      case 'PAYMENTS':
        return <Payments setIsOverlayOpen={setIsOverlayOpen} />;
      case 'REPORTS':
        return <Reports />;
      case 'PROFILE':
        return <Profile />;
      case 'SETTINGS':
        return <Settings />;
      case 'DASHBOARD':
      default:
        return <Dashboard />;
    }
  };

  // Show only the login form, no sidebar or header
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentPage={currentPage}
        handleNavigation={handleNavigation}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${currentPage === 'MESSAGES' ?'h-screen' : 'h-[calc(100vh-5rem)]'} overflow-hidden transition-all duration-300 ${currentPage === 'MESSAGES' || currentPage === 'PROFILE'  || currentPage === 'SETTINGS' ? '' : 'mt-4'} scrollbar-none`}>
        {/* Dashboard Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-none">
            {currentPage !== 'MESSAGES' && currentPage !== 'PROFILE' && currentPage !== 'SETTINGS' && !isOverlayOpen && !showAddProductModal && !isFeedbackModalOpen && (
              <Header
                sidebarCollapsed={sidebarCollapsed}
                setMobileMenuOpen={setMobileMenuOpen}
                setSidebarCollapsed={setSidebarCollapsed}
                notifications={notifications}
                notificationsOpen={notificationsOpen}
                toggleNotifications={toggleNotifications}
                handleNotificationClick={handleNotificationClick}
                markAllAsRead={markAllAsRead}
              />
            )}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;