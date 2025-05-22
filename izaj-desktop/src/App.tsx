import { useState } from 'react';
import { Icon } from '@iconify/react';
import Products from './products';
import Orders from './orders';
import Reports from './reports';
import Payments from './payments';
import Users from './users';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('DASHBOARD');

  const navigationItems = [
    { icon: 'mdi:view-dashboard', label: 'DASHBOARD' },
    { icon: 'mdi:shopping-outline', label: 'PRODUCTS' },
    { icon: 'mdi:clipboard-list-outline', label: 'ORDERS' },
    { icon: 'mdi:account-outline', label: 'USERS' },
    { icon: 'mdi:credit-card-outline', label: 'PAYMENTS' },
    { icon: 'mdi:chart-bar', label: 'REPORTS' },
  ];
 if (currentPage === 'USERS') {
    return <Users />;
  }
  
   if (currentPage === 'PAYMENTS') {
    return <Payments />;
  }
  if (currentPage === 'REPORTS') {
    return <Reports />;
  }

  if (currentPage === 'ORDERS') {
    return <Orders />;
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'PRODUCTS':
        return <Products />;
      case 'DASHBOARD':
      default:
        return (
          <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <aside className={`transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-sm border-r flex flex-col h-full shrink-0 overflow-hidden`}>
              <div className="flex items-center gap-3 px-6 py-4">
                <img
                  src="/izaj.jpg"
                  alt="IZAJ Logo"
                  className={`rounded-full bg-yellow-400 transition-all duration-300 ${
                    sidebarCollapsed ? 'w-10 h-10' : 'w-10 h-10'
                  }`}
                />
                {!sidebarCollapsed && (
                  <h1
                    className="text-4xl font-regular text-gray-800"
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
              <nav className={`${sidebarCollapsed ? 'p-2' : 'p-6'} flex-1`}>
                <ul className="space-y-2">
                  {navigationItems.map((item, idx) => (
                    <li key={idx}>
                      <button 
                        className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2'} text-gray-800 hover:bg-gray-100 rounded-lg font-medium ${
                          currentPage === item.label ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleNavigation(item.label)}
                      >
                        <Icon icon={item.icon} className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-800`} />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Profile Section */}
              <div className={`${sidebarCollapsed ? 'px-2' : 'px-6'} pb-6`}>
                <button className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3 mb-2' : 'gap-3 mb-4'} text-gray-600 hover:text-gray-800 w-full`}>
                  <img src="/profile.webp" alt="Profile" className="w-8 h-8 rounded-full bg-gray-300" />
                  {!sidebarCollapsed && <span className="text-sm font-medium">PROFILE</span>}
                </button>
                <button className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3'} text-gray-600 hover:text-gray-800 w-full`}>
                  <Icon icon="mdi:cog-outline" className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-400`} />
                  {!sidebarCollapsed && <span className="text-sm font-medium">SETTINGS</span>}
                </button>
              </div>
            </aside>

            {/* Content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <header className={`bg-white shadow-lg border px-6 py-4 ${sidebarCollapsed ? 'mx-2' : 'mx-6'} mt-4 rounded-xl shrink-0 overflow-hidden`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="p-2" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                      <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 flex-1 justify-end">
                    <div className="relative flex-1 max-w-full">
                      <Icon icon="mdi:magnify" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button className="p-2">
                      <Icon icon="mdi:bell-outline" className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className={`flex-1 ${sidebarCollapsed ? 'px-4' : 'px-8'} py-6 bg-gray-50 overflow-auto`}>
        <div className="max-w-7xl mx-auto space-y-6">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
                
                {/* Top Row - Stats Cards */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Customer</h3>
                        <p className="text-gray-500 text-sm">Customers feedback</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                          <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                          <circle 
                            cx="64" 
                            cy="64" 
                            r="56" 
                            stroke="#3b82f6" 
                            strokeWidth="8" 
                            fill="none" 
                            strokeDasharray="351" 
                            strokeDashoffset="70" 
                            strokeLinecap="round" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-gray-800">345</span>
                          <span className="text-gray-500 text-sm">Total</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-orange-500 text-sm font-medium hover:text-orange-600">View All</button>
                  </div>

                  {/* Order Status Card */}
                   <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Status</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span>
                            <Icon icon="mdi:circle" className="w-3 h-3 text-gray-300" />
                          </span>
                          <span className="text-sm text-gray-600">Pending</span>
                        </div>
                        <span className="font-semibold text-gray-800">345</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span>
                            <Icon icon="mdi:circle" className="w-3 h-3 text-blue-400" />
                          </span>
                          <span className="text-sm text-gray-600">Shipped</span>
                        </div>
                        <span className="font-semibold text-gray-800">123</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span>
                            <Icon icon="mdi:circle" className="w-3 h-3 text-green-400" />
                          </span>
                          <span className="text-sm text-gray-600">Delivered</span>
                        </div>
                        <span className="font-semibold text-gray-800">97</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span>
                            <Icon icon="mdi:circle" className="w-3 h-3 text-red-400" />
                          </span>
                          <span className="text-sm text-gray-600">Cancelled</span>
                        </div>
                        <span className="font-semibold text-gray-800">23</span>
                      </div>
                    </div>
                  </div>

                  {/* Earning Card */}
                   <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Earning</h3>
                      <select className="text-sm text-gray-500 bg-transparent border-none outline-none cursor-pointer">
                        <option>Monthly Invoice</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-2xl font-bold text-gray-800">₱ 49.9k</span>
                      <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">+2.1%</span>
                    </div>
                    <div className="h-20 bg-gray-50 rounded-lg flex items-end justify-center gap-1 p-3">
                      {Array.from({length: 12}).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 bg-blue-200 rounded-sm transition-all duration-300 ${
                            i === 11 ? 'h-16 bg-blue-500' : 
                            i === 10 ? 'h-12 bg-blue-400' : 
                            i === 9 ? 'h-8 bg-blue-300' : 'h-6'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Sales Report */}
                 <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Sales Report</h3>
                      <select className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 bg-white">
                        <option>Year (2023)</option>
                      </select>
                    </div>
                    <div className="h-64 relative">
                      <svg className="w-full h-full" viewBox="0 0 500 240">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          points="0,200 50,180 100,150 150,140 200,160 250,120 300,100 350,90 400,60 450,40 500,20"
                        />
                        <polygon
                          fill="url(#gradient)"
                          points="0,200 50,180 100,150 150,140 200,160 250,120 300,100 350,90 400,60 450,40 500,20 500,240 0,240"
                        />
                      </svg>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-4">
                        <span>January</span>
                        <span>March</span>
                        <span>May</span>
                        <span>July</span>
                        <span>September</span>
                        <span>November</span>
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-4">
                        <span>600k</span>
                        <span>400k</span>
                        <span>200k</span>
                        <span>0</span>
                      </div>
                    </div>
                  </div>

                  {/* Best Selling */}
                   <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Best Selling</h3>
                      <select className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 bg-white">
                        <option>Lightning</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'Ceiling Light', reviews: '456 Review', rating: 5 },
                        { name: 'Chandelier', reviews: '357 Review', rating: 5 },
                        { name: 'Cluster Chandelier', reviews: '365 Review', rating: 5 },
                        { name: 'Pendant Light', reviews: '589 Review', rating: 5 },
                        { name: 'Floor Light', reviews: '432 Review', rating: 4 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Icon icon="mdi:lightbulb-outline" className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-800">{item.name}</p>
                            <p className="text-gray-500 text-xs">{item.reviews}</p>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({length: 5}).map((_, i) => (
                              <Icon 
                                key={i} 
                                icon="mdi:star"
                                className={`w-3 h-3 ${
                                  i < item.rating 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-200'
                                }`} 
                                style={{ fill: i < item.rating ? '#facc15' : '#e5e7eb' }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              </main>
            </div>
          </div>
        );
    }
  };

  // If we're on the Products page, render it directly (it has its own layout)
  if (currentPage === 'PRODUCTS') {
    return <Products />;
  }

  // Otherwise render the dashboard with shared sidebar
  return renderContent();
}

export default App;