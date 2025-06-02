import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


const MyPurchase: React.FC = () => {
 // Hardcoded user for example
  const [activeTab, setActiveTab] = useState('TO PAY');
  const [currentDealIndex, setCurrentDealIndex] = useState(0);


  const tabs = ['TO PAY', 'TO SHIP', 'TO RECIEIVE', 'COMPLETED', 'CANCELLED', 'RETURN/REFUND'];

  // Sample purchase data for each tab
  const purchaseData = {
    'TO PAY': [
      {
        id: 1,
        orderNumber: 'ORD-2024-001',
        date: '2024-03-15',
        total: '₱15,995',
        status: 'Pending Payment',
        items: [
          {
            image: "ceiling.jpg",
            title: "Aberdeen | Modern LED Chandelier",
            price: "₱15,995",
            quantity: 1
          }
        ]
      }
    ],
    'TO SHIP': [
      {
        id: 2,
        orderNumber: 'ORD-2024-002',
        date: '2024-03-14',
        total: '₱31,990',
        status: 'Processing',
        items: [
          {
            image: "chadelier.jpg",
            title: "Aberdeen | Modern LED Chandelier",
            price: "₱15,995",
            quantity: 2
          }
        ]
      }
    ],
    'TO RECIEIVE': [
      {
        id: 3,
        orderNumber: 'ORD-2024-003',
        date: '2024-03-13',
        total: '₱15,995',
        status: 'In Transit',
        items: [
          {
            image: "cluster.jpg",
            title: "Aberdeen | Modern LED Chandelier",
            price: "₱15,995",
            quantity: 1
          }
        ]
      }
    ],
    'COMPLETED': [
      {
        id: 4,
        orderNumber: 'ORD-2024-004',
        date: '2024-03-10',
        total: '₱15,995',
        status: 'Delivered',
        items: [
          {
            image: "pendant.jpg",
            title: "Aberdeen | Modern LED Chandelier",
            price: "₱15,995",
            quantity: 1
          }
        ]
      }
    ],
    'CANCELLED': [
      {
        id: 5,
        orderNumber: 'ORD-2024-005',
        date: '2024-03-08',
        total: '₱15,995',
        status: 'Cancelled',
        items: [
          {
            image: "floor.jpg",
            title: "Aberdeen | Modern LED Chandelier",
            price: "₱15,995",
            quantity: 1
          }
        ]
      }
    ],
    'RETURN/REFUND': [
      {
        id: 6,
        orderNumber: 'ORD-2024-006',
        date: '2024-03-05',
        total: '₱15,995',
        status: 'Return Requested',
        items: [
          {
            image: "floor.jpg",
            title: "Aberdeen | Modern LED Chandelier",
            price: "₱15,995",
            quantity: 1
          }
        ]
      }
    ]
  };

  // Sample deals data
  const deals = [
    {
      id: 1,
      image: "ceiling.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 2,
      image: "chadelier.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 3,
      image: "cluster.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 4,
      image: "pendant.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 5,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 6,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 7,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 8,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
  ];

  const renderPurchaseContent = () => {
    const currentTabData = purchaseData[activeTab as keyof typeof purchaseData];

    if (!currentTabData || currentTabData.length === 0) {
      return (
        <div className="p-12 flex flex-col items-center justify-center min-h-96 bg-gradient-to-b from-gray-50 to-white">
          <div className="w-48 h-48 mb-6 opacity-80 transform hover:scale-105 transition-transform duration-300">
            <img src="order.png" alt="No orders" className="w-full" />
          </div>
          <p className="text-2xl font-semibold text-gray-700 mb-4">No orders yet</p>
          <p className="text-gray-500 mb-8 text-center max-w-md">Start shopping to see your orders here. We have amazing products waiting for you!</p>
          <Link 
            to="/shop" 
            className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-indigo-700 transform hover:-translate-y-1"
          >
            Browse Products
          </Link>
        </div>
      );
    }

    return (
      <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
        {currentTabData.map((order) => (
          <div key={order.id} className="mb-8 border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-indigo-600">Order #{order.orderNumber}</p>
                <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl text-gray-800">{order.total}</p>
                <p className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 inline-block mt-2">
                  {order.status}
                </p>
              </div>
            </div>
            
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-6 py-6 border-b border-gray-100 last:border-0">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-800 text-lg mb-1">{item.title}</h4>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-700">{item.price}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {activeTab === 'TO PAY' && (
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                      Pay Now
                    </button>
                  )}
                  {activeTab === 'TO RECIEIVE' && (
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                      Confirm Receipt
                    </button>
                  )}
                  {activeTab === 'COMPLETED' && (
                    <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                      Buy Again
                    </button>
                  )}
                  {activeTab === 'RETURN/REFUND' && (
                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                      Track Return
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content - My Purchase Section */}
      <main className="flex-grow py-12">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - User Profile */}
            <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-8">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-indigo-100 shadow-sm">
                  <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="font-semibold text-xl mb-8 text-center text-gray-800">Daniela Padilla</div>
          
                <ul className="space-y-3 w-full">
                  <li className="rounded-lg hover:bg-gray-50 transition-colors">
                    <Link to="/my-profile" className="flex items-center space-x-3 p-3 text-gray-700">
                      <Icon icon="lucide:user" className="text-gray-500 w-5 h-5" />
                      <span className="font-medium">My Account</span>
                    </Link>
                  </li>
                  
                  <li className="bg-indigo-50 rounded-lg">
                    <Link to="/my-purchase" className="flex items-center space-x-3 p-3 text-indigo-700">
                      <Icon icon="mdi:clipboard-list-outline" className="w-5 h-5" />
                      <span className="font-medium">My Purchase</span>
                    </Link>
                  </li>
                  
                  <li className="rounded-lg hover:bg-gray-50 transition-colors">
                    <Link to="/settings" className="flex items-center space-x-3 p-3 text-gray-700">
                      <Icon icon="lucide:settings" className="text-gray-500 w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Purchase Tabs and Content */}
            <div className="flex-1">
             
              
              {/* Purchase Tabs */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex border-b">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`flex-1 py-4 px-2 text-sm font-medium transition-all duration-300 ${
                        activeTab === tab 
                          ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                {/* Purchase Content */}
                {renderPurchaseContent()}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Featured Products Section */}
      <div className="mt-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Top Picks Card */}
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <img
              src="featured.jpg"
              alt="Top Picks"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-xl font-semibold text-white">TOP PICKS</h3>
              <p className="mt-2 text-sm text-white">SHOP DESIGNER FAVORITES</p>
              <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* What's Hot Card */}
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <img
              src="featured.jpg"
              alt="What's Hot"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-xl font-semibold text-white">WHAT'S HOT?</h3>
              <p className="mt-2 text-sm text-white">GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
              <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Deals Section */}
      <div className="mt-16 px-8 mx-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-8 text-left" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
          RECENTLY VIEWED
        </h2>
        
        <div className="relative group" style={{
          height: "500px", // Fixed height to prevent vertical scrolling
          overflow: "hidden", // Hide overflow
        }}>
          {/* First Page with 4 items */}
          <div
            className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
            style={{
              opacity: currentDealIndex === 0 ? 1 : 0,
              transform: `translateX(${currentDealIndex === 0 ? "0" : "-100%"})`,
              pointerEvents: currentDealIndex === 0 ? "auto" : "none",
            }}
          >
            {deals.slice(0, 4).map((deal) => (
              <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden flex-grow">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                    MONTHLY DEALS
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-black mt-4">{deal.title}</h3>
                <p className="text-gray-500 text-sm line-through">{deal.oldPrice}</p>
                <p className="text-black font-semibold">{deal.newPrice} <span className="text-red-500">{deal.discount}</span></p>
                <Link to="/item-description">
                  <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                    CHOOSE OPTIONS
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Second Page with next 4 items */}
          <div
            className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
            style={{
              opacity: currentDealIndex === 1 ? 1 : 0,
              transform: `translateX(${currentDealIndex === 1 ? "0" : "100%"})`,
              pointerEvents: currentDealIndex === 1 ? "auto" : "none",
            }}
          >
            {deals.slice(4, 8).map((deal) => (
              <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden flex-grow">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                    MONTHLY DEALS
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-black mt-4">{deal.title}</h3>
                <p className="text-gray-500 text-sm line-through">{deal.oldPrice}</p>
                <p className="text-black font-semibold">{deal.newPrice} <span className="text-red-500">{deal.discount}</span></p>
                <Link to="/item-description">
                  <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                    CHOOSE OPTIONS
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {currentDealIndex === 1 && (
            <button
              onClick={() => setCurrentDealIndex(0)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
              style={{ zIndex: 10 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {currentDealIndex === 0 && (
            <button
              onClick={() => setCurrentDealIndex(1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
              style={{ zIndex: 10 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPurchase;