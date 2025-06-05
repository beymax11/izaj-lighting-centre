import { Icon } from '@iconify/react';

interface SidebarProps {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  currentPage: string;
  handleNavigation: (page: string) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const navigationItems = [
  { icon: 'mdi:view-dashboard', label: 'DASHBOARD' },
  { icon: 'mdi:message-outline', label: 'MESSAGES' },
  { icon: 'mdi:shopping-outline', label: 'PRODUCTS' },
  { icon: 'mdi:clipboard-list-outline', label: 'ORDERS' },
  { icon: 'mdi:credit-card-outline', label: 'PAYMENTS' },
  { icon: 'mdi:chart-bar', label: 'REPORTS' },
  { icon: 'mdi:star-outline', label: 'FEEDBACKS' },
];

const Sidebar = ({
  sidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentPage,
  handleNavigation,
  setIsLoggedIn,
}: SidebarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      <aside
        className={`
          m-0 lg:m-4 z-50 fixed lg:static top-0 left-0
          h-[calc(100vh-2rem)]
          overflow-hidden
          transition-all duration-300
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          bg-white shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-r border-white flex flex-col
          shrink-0 rounded-none lg:rounded-2xl
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
        style={{
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex lg:hidden justify-end p-4">
          <button
            className="p-2 rounded-lg bg-white hover:bg-yellow-50 border border-yellow-50 shadow transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon icon="mdi:close" className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-6 py-4`}>
          <div className="flex-shrink-0 flex items-center justify-center">
            <img
              src="/izaj.jpg"
              alt="IZAJ Logo"
              className="w-10 h-10 rounded-full bg-yellow-400 border-4 border-yellow-200 shadow-lg"
            />
          </div>
          {!sidebarCollapsed && (
            <h1
              className="text-4xl font-regular text-gray-800 drop-shadow-lg ml-6"
              style={{
                color: "#000000",
                fontFamily: "'Playfair Display', serif",
                textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)",
                letterSpacing: "10px",
              }}
            >
              IZAJ
            </h1>
          )}
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col">
          <nav className={`${sidebarCollapsed ? 'p-2' : 'p-6'} flex-1`}>
            <ul className="space-y-2">
              {navigationItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    className={`w-full flex items-center transition-all duration-200 ${
                      sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2'
                    } text-gray-800 hover:bg-yellow-100 rounded-lg font-medium relative group ${
                      currentPage === item.label ? 'bg-yellow-100 border-l-4 border-yellow-400 shadow-md' : ''
                    }`}
                    onClick={() => handleNavigation(item.label)}
                  >
                    <Icon icon={item.icon} className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-800 group-hover:scale-110 transition-transform`} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
      
          <div
            className={`flex flex-col items-center ${sidebarCollapsed ? 'px-2' : 'px-6'} pb-6 gap-2`}
            style={{ marginTop: '-4rem' }}
          >
            <button
              className={`flex items-center w-full transition ${
                sidebarCollapsed ? 'justify-center px-2 py-3 mb-2' : 'gap-3 mb-4 justify-start'
              }`}
              onClick={() => handleNavigation('PROFILE')}
            >
              <img
                src="/profile.webp"
                alt="Profile"
                className="w-8 h-8 rounded-full bg-gray-300 border-2 border-yellow-200"
              />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium text-gray-600 hover:text-gray-800">Profile</span>
              )}
            </button>
            <button
              className={`flex items-center w-full transition ${
                sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 justify-start'
              }`}
              onClick={() => handleNavigation('SETTINGS')}
            >
              <Icon
                icon="mdi:cog-outline"
                className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-400`}
              />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium text-gray-600 hover:text-gray-800">Settings</span>
              )}
            </button>
            <button
              className={`flex items-center w-full mt-2 transition ${
                sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 justify-start'
              }`}
              onClick={() => setIsLoggedIn(false)}
            >
              <Icon
                icon="mdi:logout"
                className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-red-400`}
              />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium text-red-600 hover:text-red-800">Log Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 