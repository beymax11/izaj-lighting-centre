import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


const MyPurchase: React.FC = () => {
 // Hardcoded user for example
  const [activeTab, setActiveTab] = useState('TO PAY');
  const [currentDealIndex, setCurrentDealIndex] = useState(0);


  const tabs = ['TO PAY', 'TO SHIP', 'TO RECIEVE', 'COMPLETED', 'CANCELLED', 'RETURN/REFUND'];

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

  return (
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      

{/* Main Content - My Purchase Section */}
<main className="flex-grow bg-gray-50 py-12">
  <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column - User Profile */}
      <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6 h-fit">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-indigo-100 shadow-sm">
            <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="font-medium text-lg mb-8 text-center">Daniela Padilla</div>
      
          <ul className="space-y-2 w-full">
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
        <h2 className="text-2xl font-semibold mb-6 text-black">MY PURCHASE</h2>
        
        {/* Purchase Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 px-2 text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'border-b-2 border-indigo-600 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
            ))}
          </div>
          
          {/* Purchase Content */}
          <div className="p-12 flex flex-col items-center justify-center min-h-96">
            <div className="w-48 h-48 mb-6 opacity-80">
              <img src="order.png" alt="No orders" className="w-full" />
            </div>
            <p className="text-xl text-gray-600 mb-4">No orders yet</p>
            <p className="text-gray-500 mb-8 text-center">Items you purchase will appear here</p>
            <Link 
              to="/shop" 
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Browse Products
            </Link>
          </div>
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