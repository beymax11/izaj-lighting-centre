import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faShoppingCart, faCaretDown, faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MyPurchase: React.FC = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  



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
          <ul className="w-full">
  {/* My Account - Active Item */}
  <li className="flex items-center p-2 bg-gray-100 rounded mb-1">  {/* Reduced margin-bottom */}
    <FontAwesomeIcon icon={faUser} className="text-black mr-2 w-4 h-4" />  {/* Fixed icon size */}
    <span className="text-black font-medium text-sm">My Account</span>  {/* Made text smaller */}
  </li>
  
  {/* Submenu Items */}
  <li className="pl-8 py-1">  {/* Tighter padding */}
    <a href="#profile" className="text-black font-medium text-sm block">Profile</a> 
  </li>
  <li className="pl-8 py-1">
    <Link to="/banks-cards" className="text-gray-600 hover:text-black text-sm block ">Banks & Cards </Link>
  </li>
  <li className="pl-8 py-1">
    <Link to="/addresses" className="text-gray-600 hover:text-black text-sm block">Addresses</Link>
  </li>
  <li className="pl-8 py-1">
     <Link to="/change-password" className="text-gray-600 hover:text-black text-sm block">Change Password</Link>
  </li>
</ul>
            <li className="flex items-center space-x-3 p-2">
              <FontAwesomeIcon icon={faClipboardList} className="text-gray-500" />
              <Link to="/my-purchase" className="text-gray-700  hover:text-black">My Purchase</Link>
            </li>
          </ul>
        </div>
      </div>
      
     {/* Right Column - Profile Content */}
<div className="flex-1">
  <div className="border border-black overflow-hidden">
    {/* Profile Header */}
    <div className="p-6 border-b border-black">
      <h2 className="text-xl font-bold">My Profile</h2>
      <p className="text-gray-600 text-sm mt-1">Manage and protect your account</p>
    </div>

    {/* Profile Form */}
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Form Fields */}
        <div className="flex-1">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field (disabled) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input 
              type="email" 
              value="danielpadilla@gmail.com" 
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number:</label>
            <input 
              type="tel" 
              value="091234567890" 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Request Account Deletion and Delete Buttons */}
          <div className="flex justify-between items-center mt-6 pt-4">
            <button className="text-red-500 text-sm font-medium">
              Request Account Deletion
            </button>
            <button className="px-6 py-2 bg-red-500 text-white text-sm font-medium rounded">
              Delete
            </button>
          </div>
        </div>

        {/* Right Column - Image Upload */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 mb-3">
            <img src="profile.webp" alt="Profile" className="w-full h-full object-cover"/>
          </div>
          <button className="text-blue-500 text-sm underline mb-1">Change Photo</button>
          <p className="text-gray-500 text-xs text-center md:text-left">
            File size: maximum 1 MB<br/>
            File extension: JPEG, PNG
          </p>
        </div>
      </div>

      {/* Save Button (Separate at bottom) */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 bg-black text-white text-sm font-medium rounded">
          Save
        </button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</main>

      

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