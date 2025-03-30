import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faBell, faShoppingCart, faUser, faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MyPurchase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('toPay');
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const purchases = [
    { id: 1, itemName: 'Aberdeen LED Chandelier', date: '2025-03-01', amount: 15995, status: 'Delivered' },
    { id: 2, itemName: 'Ceiling Light', date: '2025-02-20', amount: 7995, status: 'Shipped' },
    { id: 3, itemName: 'Pendant Light', date: '2025-01-15', amount: 4995, status: 'Delivered' },
    { id: 4, itemName: 'Cluster Chandelier', date: '2024-12-30', amount: 11995, status: 'Pending' },
  ];

  const filteredPurchases = purchases.filter(purchase => {
    if (activeTab === 'toPay') return purchase.status.toLowerCase() === 'pending';
    if (activeTab === 'toShip') return purchase.status.toLowerCase() === 'shipped';
    if (activeTab === 'toReceive') return purchase.status.toLowerCase() === 'shipped';
    if (activeTab === 'completed') return purchase.status.toLowerCase() === 'delivered';
    if (activeTab === 'cancelled') return purchase.status.toLowerCase() === 'cancelled';
    if (activeTab === 'returnRefund') return purchase.status.toLowerCase() === 'return' || purchase.status.toLowerCase() === 'refund';
    return false;
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header from App.tsx */}
      <header className="bg-white px-10 py-3 flex items-center border-b border-gray-200 sticky top-0 z-50">
        {/* Logo */}
        <div className="text-3xl font-playfair tracking-widest text-black flex-shrink-0">IZAJ</div>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-black rounded-full pl-10 pr-4 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          {/* User Account Section */}
          <div className="relative">
            <button 
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="text-black text-large font-large flex items-center hover:text-orange-500"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>Hello User</span>
              <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
            </button>

            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                <ul className="py-2">
                  <li>
                    <a href="#my-account" className="block px-4 py-2 hover:bg-gray-100">
                      My Account
                    </a>
                  </li>
                  <li>
                    <Link to="/my-purchases" className="block px-4 py-2 hover:bg-gray-100">
                      My Purchases
                    </Link>
                  </li>
                  <li>
                    <button 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Notification and Cart Icons */}
          <FontAwesomeIcon 
            icon={faBell} 
            className="text-lg text-black hover:text-orange-500 cursor-pointer" 
          />
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            className="text-lg text-black hover:text-orange-500 cursor-pointer" 
          />
        </div>
      </header>

      {/* Navbar from App.tsx */}
      <nav className="bg-white py-3 border-b border-gray-200">
        <ul className="flex justify-center space-x-10 text-sm font-medium">
          <li><a href="#home" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-black font-medium text-sm hover:border-b-2 border-black pb-1 flex items-center"
            >
              PRODUCTS <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-xs" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                <ul className="py-2">
                  <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-100">LIGHTING FIXTURES</a></li>
                  <li><Link to="/product-list" className="block px-4 py-2 hover:bg-gray-100">All Lighting Fixtures</Link></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Ceiling Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Semi Flush Mounted Lights</a></li>
                </ul>
              </div>
            )}
          </li>
          <li><Link to="/new" className="text-black hover:border-b-2 border-black pb-1">NEW</Link></li>
          <li><Link to="/sales" className="text-black hover:border-b-2 border-black pb-1">SALES</Link></li>
          <li><a href="#about" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</a></li>
        </ul>
      </nav>

      {/* Main Content Section */}
      <div className="flex bg-white min-h-screen">
     {/* Sidebar without the box */}
<div className="w-64 flex flex-col p-4 bg-white shadow-lg rounded-md border border-black box-border">
<div className="flex items-center space-x-3 mb-8">
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
    </div>
    <div>
      <div className="font-medium">Daniela Padilla</div>
      <div className="text-xs text-gray-500">Edit Profile</div>
    </div>
  </div>

  <ul className="space-y-4">
    <li className="flex items-center space-x-3">
      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
      <a href="#account" className="text-gray-700 hover:text-black">My Account</a>
    </li>
    <li className="flex items-center space-x-3 font-semibold">
      <FontAwesomeIcon icon={faClipboardList} className="text-black" />
      <Link to="/my-purchase" className="text-black">My Purchase</Link>
    </li>
  </ul>
</div>
    
        
        {/* Right Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white  shadow-sm rounded-md overflow-hidden border border-black">
            {/* Tab Navigation */}
            <div className="flex justify-center border-b-2 border-black space-x-8 box-border">

            <button
    onClick={() => setActiveTab('all')}
    className={`px-4 py-3 font-medium ${activeTab === 'all' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
  >
    ALL
  </button>
              <button
                onClick={() => setActiveTab('toPay')}
                className={`px-4 py-3 font-medium ${activeTab === 'toPay' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                TO PAY
              </button>
              <button
                onClick={() => setActiveTab('toShip')}
                className={`px-4 py-3 font-medium ${activeTab === 'toShip' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                TO SHIP
              </button>
              <button
                onClick={() => setActiveTab('toReceive')}
                className={`px-4 py-3 font-medium ${activeTab === 'toReceive' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                TO RECIEVE
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-3 font-medium ${activeTab === 'completed' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                COMPLETED
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-4 py-3 font-medium ${activeTab === 'cancelled' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                CANCELLED
              </button>
              <button
                onClick={() => setActiveTab('returnRefund')}
                className={`px-4 py-3 font-medium ${activeTab === 'returnRefund' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                RETURN/REFUND
              </button>
            </div>
            
            {/* Content Area */}
            <div className="p-6">
              {filteredPurchases.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-24 h-24 mb-4">
                    <FontAwesomeIcon icon={faClipboardList} className="text-6xl text-gray-400" />
                  </div>
                  <p className="text-lg text-gray-600">No orders yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-600 border-b">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Item Name</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPurchases.map((purchase) => (
                        <tr key={purchase.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{purchase.id}</td>
                          <td className="py-3 px-4">{purchase.itemName}</td>
                          <td className="py-3 px-4">{purchase.date}</td>
                          <td className="py-3 px-4">₱{purchase.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              purchase.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              purchase.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              purchase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {purchase.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
                </div>
              )}
            </div>
          </div>
          
      {/* Featured Products Section */}
<div className="mt-16 px-4">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    {/* Top Picks Card */}
    <div className="relative w-full h-80 rounded-lg overflow-hidden">
      <img
        src="featured.jpg"
        alt="Top Picks"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
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
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-xl font-semibold text-white">WHAT'S HOT?</h3>
        <p className="mt-2 text-sm text-white">GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
        <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
          SHOP NOW
        </button>
      </div>
    </div>
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default MyPurchase;