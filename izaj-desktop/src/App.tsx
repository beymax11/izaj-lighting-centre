import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import Products from './products';
import Orders from './orders';
import Reports from './reports';
import Payments from './payments';
import Users from './users';
import Login from './login';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('DASHBOARD');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInMessagesView, setIsInMessagesView] = useState(false); // Track if in messages view
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [salesExpanded, setSalesExpanded] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<null | {
    name: string;
    message: string;
    time: string;
    conversation: string[];
  }>(null);
  const messagePanelRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatFiles, setChatFiles] = useState<File[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Example messages data
  const messages = [
    {
      name: "Ruiz Miguel Sapio",
      message: '"Order received, thank you!"',
      time: "2 min ago",
      conversation: [
        "Ruiz Miguel Sapio: Order received, thank you!",
        "You: You're welcome! Let us know if you need anything else.",
        "Ruiz Miguel Sapio: Will do, thanks!"
      ]
    },
    {
      name: "Jerome Bulaktala",
      message: '"Can I change my delivery address?"',
      time: "10 min ago",
      conversation: [
        "Jerome Bulaktala: Can I change my delivery address?",
        "You: Yes, please send the new address.",
        "Jerome Bulaktala: Sent! Thank you."
      ]
    },
    {
      name: "John Isaiah Garcia",
      message: '"Payment sent, please confirm."',
      time: "30 min ago",
      conversation: [
        "John Isaiah Garcia: Payment sent, please confirm.",
        "You: Payment received! Your order is being processed.",
        "John Isaiah Garcia: Thank you!"
      ]
    }
  ];

  // Close message panel when clicking outside
  useEffect(() => {
    if (!showMessages) return;
    function handleClick(e: MouseEvent) {
      if (
        messagePanelRef.current &&
        !messagePanelRef.current.contains(e.target as Node)
      ) {
        setShowMessages(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMessages]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [selectedMessage?.conversation]);

  const navigationItems = [
    { icon: 'mdi:view-dashboard', label: 'DASHBOARD' },
    { icon: 'mdi:shopping-outline', label: 'PRODUCTS' },
    { icon: 'mdi:clipboard-list-outline', label: 'ORDERS' },
    { icon: 'mdi:account-outline', label: 'USERS' },
    { icon: 'mdi:credit-card-outline', label: 'PAYMENTS' },
    { icon: 'mdi:chart-bar', label: 'REPORTS' },
  ];

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    if (page !== 'USERS') {
      setIsInMessagesView(false); // Reset messages view flag
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'PRODUCTS':
        return <Products />;
      case 'ORDERS':
        return <Orders />;
      case 'USERS':
        return <Users />;
      case 'PAYMENTS':
        return <Payments />;
      case 'REPORTS':
        return <Reports />;
      case 'DASHBOARD':
      default:
        return (
          <div className="flex-1 flex flex-col h-0">
            <main
              className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-8'} py-8 bg-white
                scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-gray-100 transition-all duration-300 rounded-3xl`}
              style={{
                minHeight: 0,
                boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
              }}
            >
              <div className="max-w-7xl mx-auto space-y-10">
                <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-8">
                  <Icon icon="mdi:view-dashboard" className="text-yellow-400 w-8 h-8" />
                  Dashboard
                  
                </h2>
                
                {/* Top Row - Stats Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Customer Card */}
                  <div className="bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-6 transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl hover:border-yellow-400">
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
                   <div className="bg-white rounded-2xl shadow-lg border-l-4 border-blue-200 p-6 transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl hover:border-blue-400">
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
                   <div className="bg-white rounded-2xl shadow-lg border-l-4 border-green-200 p-6 transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl hover:border-green-400">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Sales Report */}
                 <div
                    className={`lg:col-span-2 bg-white rounded-2xl shadow-lg border-l-4 border-indigo-200 p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-indigo-400 cursor-pointer
                      ${salesExpanded ? 'h-auto max-h-[900px]' : 'max-h-[340px] overflow-hidden'}
                    `}
                    onClick={() => setSalesExpanded((prev) => !prev)}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Icon icon="mdi:chart-line" className="text-indigo-400 w-6 h-6" />
                      <h3 className="text-lg font-semibold text-gray-800">Sales Report</h3>
                      <select className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 bg-white">
                        <option>Year (2023)</option>
                      </select>
                      <span className="ml-auto">
                        <Icon
                          icon={salesExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
                          className="w-6 h-6 text-gray-400"
                        />
                      </span>
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
                    {/* Expanded content */}
                    {salesExpanded && (
                      <div className="mt-8 transition-all duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center">
                            <span className="text-2xl font-bold text-indigo-600">₱ 1.2M</span>
                            <span className="text-xs text-gray-500 mt-1">Total Sales</span>
                          </div>
                          <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center">
                            <span className="text-2xl font-bold text-indigo-600">+8.5%</span>
                            <span className="text-xs text-gray-500 mt-1">Growth Rate</span>
                          </div>
                          <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center">
                            <span className="text-2xl font-bold text-indigo-600">1,234</span>
                            <span className="text-xs text-gray-500 mt-1">Transactions</span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h4 className="text-md font-semibold text-gray-700 mb-2">Monthly Breakdown</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-gray-700">
                              <thead>
                                <tr>
                                  <th className="px-3 py-2 text-left">Month</th>
                                  <th className="px-3 py-2 text-left">Sales</th>
                                  <th className="px-3 py-2 text-left">Orders</th>
                                  <th className="px-3 py-2 text-left">Growth</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="px-3 py-2">January</td>
                                  <td className="px-3 py-2">₱ 100k</td>
                                  <td className="px-3 py-2">120</td>
                                  <td className="px-3 py-2 text-green-600">+2.5%</td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-2">February</td>
                                  <td className="px-3 py-2">₱ 110k</td>
                                  <td className="px-3 py-2">130</td>
                                  <td className="px-3 py-2 text-green-600">+3.1%</td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-2">March</td>
                                  <td className="px-3 py-2">₱ 95k</td>
                                  <td className="px-3 py-2">110</td>
                                  <td className="px-3 py-2 text-red-600">-1.8%</td>
                                </tr>
                                {/* ...add more rows as needed... */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Best Selling */}
                   <div className="bg-white rounded-2xl shadow-lg border-l-4 border-pink-200 p-6 transition-transform duration-200 hover:scale-[1.01] hover:shadow-2xl hover:border-pink-400">
                    <div className="flex items-center gap-2 mb-6">
                      <Icon icon="mdi:star" className="text-pink-400 w-6 h-6" />
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
        );
    }
  };

  // Send message handler
  const handleSendMessage = () => {
    if (!selectedMessage || (!chatInput.trim() && chatFiles.length === 0)) return;
    // Compose message with text and file names
    const newLines: string[] = [];
    if (chatInput.trim()) {
      newLines.push(`You: ${chatInput.trim()}`);
    }
    if (chatFiles.length > 0) {
      chatFiles.forEach(file => {
        newLines.push(`You sent a file: ${file.name}`);
      });
    }
    setSelectedMessage({
      ...selectedMessage,
      conversation: [...selectedMessage.conversation, ...newLines],
    });
    setChatInput('');
    setChatFiles([]);
  };

  // File input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setChatFiles(Array.from(e.target.files));
    }
  };

  // Remove attached file
  const handleRemoveFile = (idx: number) => {
    setChatFiles(files => files.filter((_, i) => i !== idx));
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  // Handle drag with boundary checking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && modalRef.current) {
        const modalWidth = modalRef.current.offsetWidth;
        const modalHeight = modalRef.current.offsetHeight;
        
        // Calculate boundaries
        const maxX = window.innerWidth - modalWidth;
        const maxY = window.innerHeight - modalHeight;
        
        // Calculate new position with boundaries
        const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), maxX);
        const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), maxY);
        
        setModalPosition({
          x: newX,
          y: newY
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  // Show only the login form, no sidebar or header
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <aside
        className={`m-4 z-40 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-white shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-r border-white flex flex-col h-[calc(100vh-2rem)] shrink-0 overflow-hidden rounded-2xl`}
        style={{
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          minHeight: 'calc(100vh - 2rem)',
        }}
      >
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
        {/* Divider above profile section */}
        <div className="border-t border-yellow-100 my-2"></div>
        {/* Profile Section */}
        <div className={`flex flex-col items-center ${sidebarCollapsed ? 'px-2' : 'px-6'} pb-6 gap-2`}>
          <button
            className={`flex items-center w-full transition ${
              sidebarCollapsed ? 'justify-center px-2 py-3 mb-2' : 'gap-3 mb-4 justify-start'
            }`}
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
          >
            <Icon
              icon="mdi:cog-outline"
              className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-400`}
            />
            {!sidebarCollapsed && (
              <span className="text-sm font-medium text-gray-600 hover:text-gray-800">Settings</span>
            )}
          </button>
          {/* Log Out Button */}
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
      </aside>

      {/* Content area - adjust margin for floating sidebar */}
      <div
        className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <header
          className={`relative bg-white shadow-2xl border border-white
            px-8 py-5 mt-6 rounded-2xl shrink-0 overflow-hidden transition-all duration-300
            backdrop-blur-md
            ${sidebarCollapsed ? 'mx-2' : 'mx-8'}
          `}
          style={{
            borderLeft: '6px solid #fff',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.06), 0 2px 12px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Left side: Sidebar/Menu icon and page title (if PRODUCTS) */}
            <div className="flex items-center gap-4 flex-1">
              <button
          className="p-2 rounded-lg bg-white hover:bg-yellow-50 border border-yellow-50 shadow transition"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
          <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
              </button>
              {/* Search bar beside sidebar icon if not PRODUCTS */}
              {currentPage !== 'PRODUCTS' && (
          <div className="relative min-w-[240px] max-w-sm ml-2">
            <Icon icon="mdi:magnify" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-150 focus:border-yellow-200 bg-white shadow"
            />
          </div>
              )}
              {currentPage === 'PRODUCTS' ? (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-800 tracking-wide drop-shadow-sm">Products</span>
          </div>
              ) : null}
            </div>
            {/* Right side: Add Products button (if PRODUCTS), else notification */}
            <div className="flex items-center gap-4 justify-end">
              {currentPage === 'PRODUCTS' ? (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 border-2 border-yellow-200 rounded-xl text-sm bg-black text-white font-semibold shadow hover:bg-yellow-100 hover:text-black hover:border-yellow-400 transition-all duration-200"
              style={{
                boxShadow: '0 2px 8px 0 rgba(252, 211, 77, 0.10)',
              }}
              onClick={() => setShowAddProductModal(true)}
            >
              <Icon icon="mdi:plus" className="text-lg" />
              Add Products
            </button>
          </>
              ) : (
          <>
            <button className="p-2 rounded-lg bg-white hover:bg-yellow-100 border border-yellow-100 shadow transition">
              <Icon icon="mdi:bell-outline" className="w-6 h-6 text-gray-600" />
            </button>
          </>
              )}
            </div>
          </div>
        </header>
        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-auto">
          {renderContent()}
        </div>
      </div>

      {/*  Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-[900px] w-full relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Add New Product</h2>
              <button
                className="text-gray-400 hover:text-gray-600 transition"
                onClick={() => setShowAddProductModal(false)}
                aria-label="Close modal"
              >
                <Icon icon="mdi:close" className="w-7 h-7" />
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-300 pb-2">Product Details</h3>
                  <div className="space-y-5">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <textarea
                      placeholder="Product Description"
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        <option value="" disabled selected>Category</option>
                        <option>Lighting</option>
                        <option>Decoration</option>
                      </select>
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        <option value="" disabled selected>Type</option>
                        <option>Ceiling Light</option>
                        <option>Wall Light</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-300 pb-2">Pricing & Stock</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    />
                    <input
                      type="number"
                      placeholder="Stock Quantity"
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    />
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-300 pb-2">Variations</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
                        <Icon icon="mdi:plus" className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value="Variation:"
                        readOnly
                        className="border border-gray-300 rounded-md px-4 py-2 text-sm w-28 cursor-not-allowed bg-gray-50"
                      />
                      <input
                        type="text"
                        value="Color"
                        readOnly
                        className="border border-gray-300 rounded-md px-4 py-2 text-sm flex-1 cursor-not-allowed bg-gray-50"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-300 pb-2">Image & Media</h3>
                  <div className="space-y-5">
                    {/* Image Upload */}
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2">
                      <Icon icon="mdi:cloud-upload-outline" className="w-6 h-6 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Upload Image"
                        className="flex-1 border-none focus:outline-none text-sm placeholder-gray-400 bg-transparent cursor-not-allowed"
                        readOnly
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                        Choose File
                      </button>
                    </div>

                    {/* Video Upload */}
                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2">
                      <Icon icon="mdi:cloud-upload-outline" className="w-6 h-6 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Upload Product Video"
                        className="flex-1 border-none focus:outline-none text-sm placeholder-gray-400 bg-transparent cursor-not-allowed"
                        readOnly
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                        Choose File
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-between items-center gap-4 mt-10 pt-6 border-t border-gray-200">
              {/* Draft Buttons (Left Corner) */}
              <div className="flex gap-2">
                <button
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
        <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
        Save as Draft
          </button>
          <button
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
        <Icon icon="mdi:archive-outline" className="w-5 h-5" />
        Archive Draft
          </button>
        </div>
        {/* Confirm/Cancel Buttons (Right Corner) */}
        <div className="flex gap-4">
          <button
        className="px-6 py-2 border border-gray-400 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
        onClick={() => setShowAddProductModal(false)}
          >
        Cancel
          </button>
          <button
        className="px-6 py-2 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-900 transition"
        onClick={() => setShowAddProductModal(false)}
          >
        Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Floating Message Icon - hide when in messages view */}
      {!isInMessagesView && (
        <button
          className="fixed z-50 bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-200"
          style={{ boxShadow: '0 4px 24px rgba(252, 211, 77, 0.25)' }}
          onClick={() => setShowMessages(true)}
          aria-label="Show Messages"
        >
          <Icon icon="mdi:message-text-outline" className="w-7 h-7 text-white" />
        </button>
      )}

      {/* Floating Message Panel */}
      {showMessages && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
          <div
            ref={messagePanelRef}
            className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-yellow-100 max-w-xs w-full mr-8 mb-24 p-4 flex flex-col"
            style={{ minHeight: '320px', maxHeight: '60vh' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                <Icon icon="mdi:message-text-outline" className="text-yellow-400 w-6 h-6" />
                Messages
              </span>
              <button
                className="text-gray-400 hover:text-gray-600 transition"
                onClick={() => setShowMessages(false)}
                aria-label="Close messages"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3">
              {messages.map((msg, idx) => (
                <button
                  key={idx}
                  className="w-full text-left bg-yellow-50 rounded-lg p-3 shadow flex flex-col hover:bg-yellow-100 transition"
                  onClick={() => setSelectedMessage(msg)}
                >
                  <span className="font-medium text-gray-700">{msg.name}</span>
                  <span className="text-gray-500 text-xs">{msg.message}</span>
                  <span className="text-gray-400 text-xs mt-1">{msg.time}</span>
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 transition"
              onClick={() => setShowMessages(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Conversation Modal Overlay */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div 
            ref={modalRef}
            className="absolute bg-white rounded-2xl shadow-2xl max-w-md w-full h-[80vh] flex flex-col pointer-events-auto"
            style={{ 
              left: modalPosition.x,
              top: modalPosition.y,
              transform: 'none', // Remove transform to fix positioning
              cursor: isDragging ? 'grabbing' : 'default',
              transition: isDragging ? 'none' : 'all 0.1s ease', // Add smooth transition when not dragging
            }}
          >
            {/* Header - make it draggable */}
            <div 
              className="sticky top-0 z-10 bg-white border-b border-yellow-100 px-6 py-4 flex items-center gap-3 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
            >
              <Icon icon="mdi:account-circle" className="w-10 h-10 text-yellow-400" />
              <div>
                <div className="font-semibold text-lg text-gray-800">{selectedMessage.name}</div>
                <div className="text-xs text-gray-400">{selectedMessage.time}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => {
                    setCurrentPage('USERS');
                    // Set URL parameter to indicate messages view should be shown
                    window.history.pushState({}, '', '?view=messages');
                    setSelectedMessage(null);
                    setShowMessages(false);
                    setIsInMessagesView(true); // Set messages view flag
                  }}
                  title="Expand in Messages"
                >
                  <Icon icon="mdi:open-in-new" className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-600 transition"
                  onClick={() => {
                    setSelectedMessage(null);
                    setChatInput('');
                    setChatFiles([]);
                  }}
                  aria-label="Close conversation"
                >
                  <Icon icon="mdi:close" className="w-7 h-7" />
                </button>
              </div>
            </div>
            {/* Chat Body */}
            <div 
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-yellow-50/50 via-white to-yellow-100/30 scroll-smooth"
            >
              {selectedMessage.conversation.map((line, idx) => {
                const isYou = line.startsWith("You:");
                const isFile = line.startsWith("You sent a file:");
                // Fix: declare sender and msgArr to avoid ReferenceError
                let msgArr: string[] = [];
                let msg = line;
                if (line.includes(":")) {
                  msgArr = line.split(":");
                  msg = msgArr.slice(1).join(":").trim();
                }
                return (
                  <div
                    key={idx}
                    className={`flex items-end gap-2 ${isYou ? "justify-end" : "justify-start"}`}
                  >
                    {!isYou && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                          <Icon icon="mdi:account" className="w-5 h-5 text-yellow-600" />
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm
                        ${isYou
                          ? "bg-yellow-400 text-gray-900 rounded-br-none"
                          : "bg-white text-gray-800 border border-yellow-100 rounded-bl-none"
                        }
                      `}
                    >
                      {isFile ? (
                        <span className="block items-center gap-2">
                          <Icon icon="mdi:attachment" className="w-4 h-4" />
                          <span className="underline">{msg.replace("You sent a file:", "").trim()}</span>
                        </span>
                      ) : (
                        <span className="block">{msg}</span>
                      )}
                      <span className="block text-[10px] text-gray-400 mt-1 text-right">
                        {isYou ? "You" : selectedMessage.name}
                      </span>
                    </div>
                    {isYou && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <Icon icon="mdi:account-tie" className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {/* Show attached files before sending */}
              {chatFiles.length > 0 && (
                <div className="flex flex-col gap-2 items-end">
                  {chatFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-lg">
                      <Icon icon="mdi:attachment" className="w-4 h-4" />
                      <span className="text-xs">{file.name}</span>
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveFile(idx)}
                        type="button"
                        tabIndex={-1}
                      >
                        <Icon icon="mdi:close" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Footer */}
            <form
              className="sticky bottom-0 z-10 bg-white border-t border-yellow-100 px-4 py-3 flex gap-2"
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Icon icon="mdi:paperclip" className="w-5 h-5 text-yellow-500 hover:text-yellow-700" />
              </label>
              <input
                type="text"
                className="flex-1 border border-yellow-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-yellow-50"
                placeholder="Type a message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition flex items-center gap-1 disabled:opacity-50"
                disabled={!chatInput.trim() && chatFiles.length === 0}
              >
                <Icon icon="mdi:send" className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;