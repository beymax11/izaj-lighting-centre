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
import { Session } from '@supabase/supabase-js';

function App() {

  const [session, setSession] = useState<Session | null>(null);

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

    const handleLoginSuccess = (sessionData: Session) => {
    setSession(sessionData);
    setIsLoggedIn(true);
  };

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
        return <Messages  session={session} handleNavigation={handleNavigation} />;
      case 'PRODUCTS':
        return <Products  session={session}
          showAddProductModal={showAddProductModal} 
          setShowAddProductModal={setShowAddProductModal} 
        />;
      case 'ORDERS':
        return <Orders  session={session} setIsOverlayOpen={setIsOverlayOpen} />;
      case 'FEEDBACKS':
        return <Feedbacks  session={session} setIsFeedbackModalOpen={setIsFeedbackModalOpen} />;
      case 'PAYMENTS':
        return <Payments  session={session} setIsOverlayOpen={setIsOverlayOpen} />;
      case 'REPORTS':
        return <Reports  session={session} />;
      case 'PROFILE':
        return <Profile  session={session} handleNavigation={handleNavigation} />;
      case 'SETTINGS':
        return <Settings  session={session} handleNavigation={handleNavigation} />;
      case 'DASHBOARD':
      default:
        return <Dashboard session={session}/>;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar
        session={session}
        sidebarCollapsed={sidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentPage={currentPage}
        handleNavigation={handleNavigation}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${currentPage === 'MESSAGES' ? 'h-screen' : 'h-[calc(100vh-5rem)]'} overflow-hidden transition-all duration-300 ${currentPage === 'MESSAGES' || currentPage === 'PROFILE' || currentPage === 'SETTINGS' ? '' : 'mt-2 sm:mt-4'} scrollbar-none`}>
        {/* Dashboard Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-none px-2 sm:px-4 md:px-6">
            {currentPage !== 'MESSAGES' && currentPage !== 'PROFILE' && currentPage !== 'SETTINGS' && !isOverlayOpen && !showAddProductModal && !isFeedbackModalOpen && (
              <Header
                session={session}
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
            <div className="w-full max-w-[2000px] mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;