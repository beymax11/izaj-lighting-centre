import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faShoppingCart, faCaretDown, faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MyPurchase: React.FC = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('TO PAY');

  const tabs = ['TO PAY', 'TO SHIP', 'TO RECIEVE', 'COMPLETED', 'CANCELLED', 'RETURN/REFUND'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white px-10 py-3 flex justify-between items-center border-b border-white sticky top-0 z-50">
        <div className="text-3xl font-playfair tracking-widest text-black">IZAJ</div>

        <div className="relative w-1/2">
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

        <div className="flex items-center space-x-6">
          <div
            className="relative"
            onMouseEnter={() => setIsAccountDropdownOpen(true)}
            onMouseLeave={() => setIsAccountDropdownOpen(false)}
          >
            <span className="text-xs text-gray-500 block text-left">Login/Signup</span>
            <button className="text-black text-sm font-medium flex items-center hover:text-orange-500">
              My Account <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
            </button>

            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                <ul className="py-2">
                  <li><a href="#profile" className="block px-4 py-2 hover:bg-gray-100">My Account</a></li>
                  <li><a href="#purchases" className="block px-4 py-2 hover:bg-gray-100">My Purchases</a></li>
                  <li><a href="#logout" className="block px-4 py-2 hover:bg-gray-100">Logout</a></li>
                </ul>
              </div>
            )}
          </div>

          <FontAwesomeIcon icon={faBell} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
          <FontAwesomeIcon icon={faShoppingCart} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white py-3 border-b border-gray-200">
        <ul className="flex justify-center space-x-10 text-sm font-medium">
          <li><a href="/" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>
          <li className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <a href="#" className="text-black hover:border-b-2 border-black pb-1 flex items-center">
              PRODUCTS <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-xs" />
            </a>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                <ul className="py-2">
                  <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-100">Ceiling Lights</a></li>
                  <li><a href="#product2" className="block px-4 py-2 hover:bg-gray-100">Pendant Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Chandeliers</a></li>
                </ul>
              </div>
            )}
          </li>
          <li><a href="/new" className="text-black hover:border-b-2 border-black pb-1">NEW</a></li>
          <li><a href="/sales" className="text-black hover:border-b-2 border-black pb-1">SALES</a></li>
          <li><a href="/about" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</a></li>
        </ul>
      </nav>

   {/* Main Content - My Purchase Section */}
<main className="flex-grow bg-white">
  <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Column - User Profile (Narrower) */}
      <div className="w-full md:w-64 bg-white border border-black p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
            <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="font-medium mb-6 text-center">Daniela Padilla</div>
      
          <ul className="space-y-4 w-full">
            <li className="flex items-center space-x-3 p-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-500" />
               <Link to="/my-profile" className="text-black font-semibold">My Account</Link>
            </li>
            
            <li className="flex items-center space-x-3 p-2 bg-gray-100 rounded">
              <FontAwesomeIcon icon={faClipboardList} className="text-black" />
              <Link to="/my-purchase" className="text-black font-semibold">My Purchase</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right Column - Purchase Tabs and Content (Wider) */}
      <div className="flex-1">
        {/* Purchase Tabs */}
        <div className="border border-black overflow-hidden">
          <div className="flex justify-between border-b border-black">
            {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
            ))}
          </div>
          
          {/* Purchase Content */}
          <div className="p-8 flex flex-col items-center justify-center min-h-96">
            <div className="w-40 h-40 mb-6">
              <img src="order.png" alt="No orders" className="w-full" />
            </div>
            <p className="text-lg text-gray-700 mb-8">No orders yet</p>
           
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

{/* RECENTLY VIEWED */}
<div className="mt-16 px-4">
<h2 className="text-2xl font-bold text-black mb-8 text-left">RECENTLY VIEWED</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Deal 1 */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>

    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>

    {/* Add other deals as needed */}
    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>
    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>
  </div>
</div>

      {/* Footer */}
      <footer className="bg-white text-black py-10">
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Top Footer Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Our Company */}
            <div>
              <h3 className="font-semibold text-lg mb-4">OUR COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-orange-500">Home</a></li>
                <li><a href="#about-us" className="hover:text-orange-500">About Us</a></li>
                <li><a href="#subscribe" className="hover:text-orange-500">Subscribe</a></li>
              </ul>
            </div>

            {/* More Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">MORE INFO</h3>
              <ul className="space-y-2">
                <li><a href="#delivery" className="hover:text-orange-500">Delivery & Installation</a></li>
                <li><a href="#privacy" className="hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="#returns" className="hover:text-orange-500">Returns & Refunds</a></li>
                <li><a href="#help" className="hover:text-orange-500">Help & FAQs</a></li>
                <li><a href="#terms" className="hover:text-orange-500">Terms & Conditions</a></li>
                <li><a href="#warranty" className="hover:text-orange-500">Warranty Terms</a></li>
                <li><a href="#careers" className="hover:text-orange-500">Careers</a></li>
              </ul>
            </div>

            {/* Connect with Us */}
            <div>
              <h3 className="font-semibold text-lg mb-4">CONNECT WITH US</h3>
              <ul className="space-y-2">
                <li><a href="tel:+639123456789" className="hover:text-orange-500">+639123456789</a></li>
                <li><a href="mailto:example@gmail.com" className="hover:text-orange-500">example@gmail.com</a></li>
                <li><a href="https://wa.me/639123456789" className="hover:text-orange-500">WhatsApp</a></li>
                <li><a href="https://m.me/yourpage" className="hover:text-orange-500">Messenger</a></li>
              </ul>
            </div>

            {/* Our Location */}
            <div>
              <h3 className="font-semibold text-lg mb-4">OUR LOCATION</h3>
              <p>Izaj Lighting Centre</p>
              <p>San Pablo - 173 I, San Pablo City, 4000 Laguna</p>
              <h3 className="font-semibold text-lg mt-6 mb-4">OUR BRANCHES</h3>
              <ul className="space-y-2">
                <li>Quezon</li>
                <li>Laguna</li>
                <li>Cavite</li>
                <li>Batangas</li>
                <li>Camarines Sur</li>
                <li>Sorsogon</li>
                <li>La Union</li>
              </ul>
            </div>

            {/* Payments Method */}
            <div>
              <h3 className="font-semibold text-lg mb-4">PAYMENTS METHOD</h3>
              <img src="payments.png" alt="Payments Methods" className="w-full" />
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-10 text-center text-sm text-gray-400">
            <p>© 2025 IZAJ LIGHTING CENTRE. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyPurchase;