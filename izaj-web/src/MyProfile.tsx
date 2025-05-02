import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const MyPurchase: React.FC = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>({
    name: 'Daniel ',
  }); // Hardcoded user for example
 

  const handleLogout = () => {
    setUser(null);
  };

 

  return (
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Updated Header */}
      <header className="bg-white px-10 py-3 flex flex-col ">
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
            <Link to="/" className="flex flex-col items-start flex-shrink-0">
            <div
              className="text-5xl tracking-wide flex-shrink-0 leading-tight font-regular"
              style={{
              color: "#000000",
              fontFamily: "'Playfair Display', serif",
              textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)",
              letterSpacing: "10px",
              }}
            >
              IZAJ
            </div>
            </Link>

          {/* Right Section with Search, User, Notification, and Cart Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2">
              <input
                type="text"
                placeholder="Search"
                className="w-full border border-black-500 pl-10 pr-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black rounded-full"
              />
              <Icon
                icon="ic:outline-search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                width="25"
                height="25"
              />
            </div>

            {/* User/Dropdown */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <div className="flex items-center space-x-4">
                  <button
                    className="text-black hover:text-orange-500 transition-colors duration-200"
                    aria-label="Login"
                  >
                    <Icon icon="lucide:user" width="28" height="28" />
                  </button>
                  <Icon
                    icon="mingcute:notification-newdot-line"
                    className="text-black cursor-pointer hover:text-orange-500"
                    width="28"
                    height="28"
                  />
                  <Link to="/cart">
                    <Icon
                      icon="mdi:cart-outline"
                      className="text-black cursor-pointer hover:text-orange-500"
                      width="28"
                      height="28"
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="relative">
                    <button
                      onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                      className="flex items-center"
                      aria-haspopup="true"
                      aria-expanded={isAccountDropdownOpen}
                    >
                      <Icon icon="lucide:user" width="30" height="30" className="text-black hover:text-orange-500 transition-colors duration-200" />
                      <div className="flex flex-col ml-2 text-left">
                        <span className="font-medium text-sm text-gray-500 leading-none" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "200" }}>
                          Hello {user.name}
                        </span>
                        <div className="flex items-center text-black">
                          <span className="font-medium text-lg" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                            My Account
                          </span>
                          <Icon icon="mdi:chevron-down" width="20" height="20" className="ml-1 text-black" />
                        </div>
                      </div>
                    </button>

                    {isAccountDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 animate-fade-in transition-all">
                        <ul className="py-2 text-sm text-black">
                          <li>
                            <Link to="/my-profile" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                              My Account
                            </Link>
                          </li>
                          <li>
                            <Link to="/my-purchases" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                              My Purchases
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <Icon
                    icon="mingcute:notification-newdot-line"
                    className="text-black cursor-pointer hover:text-orange-500 ml-4"
                    width="28"
                    height="28"
                  />
                  <Link to="/cart">
                    <Icon
                      icon="mdi:cart-outline"
                      className="text-black cursor-pointer hover:text-orange-500 ml-4"
                      width="28"
                      height="28"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white py-3">
          <ul className="flex justify-center space-x-10 text-sm font-medium">
            <li><Link to="/" className="text-black hover:border-b-2 border-black pb-1">HOME</Link></li>
             {/* Products Dropdown Menu */}
                        <li className="relative group">
                          <div
                            className="text-black font-medium text-sm hover:border-b-2 border-black pb-1 flex items-center justify-between cursor-pointer transition-all duration-300"
                            style={{
                              transform: isDropdownOpen ? "translateY(-2px)" : "translateY(0)",
                              color: isDropdownOpen ? "#4B0082" : "black",
                            }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => {
                              setTimeout(() => {
                                if (!document.querySelector('.dropdown-content:hover')) {
                                  setIsDropdownOpen(false);
                                }
                              }, 100);
                            }}
                          >
                            PRODUCTS
                            <Icon 
                              icon="mdi:chevron-down" 
                              className="ml-1 text-xs transition-transform duration-300" 
                              style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} 
                              width="25" 
                              height="25" 
                            />
                          </div>
                        
                          {isDropdownOpen && (
                            <div 
                              className="absolute bg-white text-black shadow-xl z-50 border-t border-gray-200 dropdown-content"
                              style={{ 
                              top: "100%",
                              left: "50%",
                              transform: "translateX(-44%)", // Center the dropdown horizontally
                              width: "100vw"
                              }}
                              onMouseEnter={() => setIsDropdownOpen(true)}
                              onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                              <div className="max-w-7xl mx-auto px-6 py-8">
                                <div className="grid grid-cols-3 gap-8">
                                  {/* First Column - Main Categories */}
                                  <div>
                                    <h3 className="font-bold text-base mb-4 border-b border-gray-200 pb-2" 
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                      LIGHTING FIXTURES
                                    </h3>
                                    <ul>
                                      <li className="mb-3">
                                        <Link to="/product-list" className="flex items-center group">
                                          <Icon icon="mdi:lightbulb-outline" className="mr-2 text-gray-600 group-hover:text-orange-500" width="22" height="22" />
                                          <span className="group-hover:text-orange-500 group-hover:translate-x-1 transition-transform duration-200">
                                            All Lighting Fixtures
                                          </span>
                                        </Link>
                                      </li>
                                      <li className="mb-3">
                                        <Link to="/new" className="flex items-center group">
                                          <Icon icon="mdi:star-circle-outline" className="mr-2 text-gray-600 group-hover:text-orange-500" width="22" height="22" />
                                          <span className="group-hover:text-orange-500 group-hover:translate-x-1 transition-transform duration-200">
                                            New Arrivals
                                          </span>
                                        </Link>
                                      </li>
                                      <li className="mb-3">
                                        <Link to="/sales" className="flex items-center group">
                                          <Icon icon="mdi:tag-outline" className="mr-2 text-gray-600 group-hover:text-orange-500" width="22" height="22" />
                                          <span className="group-hover:text-orange-500 group-hover:translate-x-1 transition-transform duration-200">
                                            Special Offers
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                        
                                  {/* Second Column - Categories with Images */}
                                  <div>
                                    <h3 className="font-bold text-base mb-4 border-b border-gray-200 pb-2"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                      POPULAR CATEGORIES
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-lg mb-2">
                                          <img src="celing.avif" alt="Ceiling Lights" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
                                          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                        </div>
                                        <p className="text-sm font-medium">Ceiling Lights</p>
                                      </div>
                                      <div className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-lg mb-2">
                                          <img src="chandelier.avif" alt="Chandeliers" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
                                          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                        </div>
                                        <p className="text-sm font-medium">Chandeliers</p>
                                      </div>
                                      <div className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-lg mb-2">
                                          <img src="pendant.avif" alt="Pendant Lights" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
                                          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                        </div>
                                        <p className="text-sm font-medium">Pendant Lights</p>
                                      </div>
                                      <div className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-lg mb-2">
                                          <img src="wall.avif" alt="Wall Lights" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
                                          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                        </div>
                                        <p className="text-sm font-medium">Wall Lights</p>
                                      </div>
                                    </div>
                                  </div>
                        
                                  {/* Third Column - Complete Categories List */}
                                  <div>
                                    <h3 className="font-bold text-base mb-4 border-b border-gray-200 pb-2"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                      ALL CATEGORIES
                                    </h3>
                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Ceiling Lights</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Semi Flush Mounted</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Chandeliers</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Cluster Chandeliers</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Pendant Lights</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Floor Lamps</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Table Lamps</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Rechargeable Lamps</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Wall Lights</a></li>
                                      <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Painting & Bathroom</a></li>
                                    </ul>
                                  </div>
                                </div>
                        
                                {/* Bottom Banner Section */}
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-medium">Free Installation on Orders Above ₱10,000</p>
                                      <p className="text-xs text-gray-500">Within Metro Manila Area</p>
                                    </div>
                                    <Link 
                                      to="/sales" 
                                      className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-orange-500 transition-colors duration-300"
                                    >
                                      VIEW PROMOTIONS
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </li>
            <li><Link to="/new" className="text-black hover:border-b-2 border-black pb-1">NEW</Link></li>
            <li><Link to="/sales" className="text-black hover:border-b-2 border-black pb-1">SALES</Link></li>
            <li><Link to="/aboutus" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</Link></li>
          </ul>
        </nav>
      </header>

   {/* Main Content - My Profile Section */}
<main className="flex-grow bg-gray-50 py-12">
  <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column - User Profile (Narrower) */}
      <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-indigo-100 shadow-sm">
            <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="font-medium text-lg mb-6 text-center">Daniela Padilla</div>
      
          <ul className="w-full space-y-1">
            {/* My Account - Active Item */}
            <li className="flex items-center p-3 bg-indigo-50 rounded-lg mb-1">
              <Icon icon="mdi:account" className="text-indigo-600 mr-2 w-5 h-5" />
              <span className="text-indigo-700 font-medium text-sm">My Account</span>
            </li>
            
            {/* Submenu Items */}
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <a href="#profile" className="text-indigo-600 font-medium text-sm block">Profile</a> 
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link to="/banks-cards" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link to="/addresses" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Addresses</Link>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg mb-2">
               <Link to="/change-password" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Change Password</Link>
            </li>
            
            <li className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Icon icon="mdi:clipboard-list-outline" className="text-gray-500 mr-2 w-5 h-5" />
              <Link to="/my-purchase" className="text-gray-700 hover:text-gray-900 text-sm font-medium">My Purchase</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right Column - Profile Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">MY ACCOUNT</h2>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
            <p className="text-gray-600 text-sm mt-1">Manage and protect your account</p>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Form Fields */}
              <div className="flex-1">
                {/* Name Field */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field (disabled) */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                  <input 
                    type="email" 
                    value="danielpadilla@gmail.com" 
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number:</label>
                  <input 
                    type="tel" 
                    value="091234567890" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
                  />
                </div>

                {/* Request Account Deletion and Delete Buttons */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                  <button className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
                    Request Account Deletion
                  </button>
                  <button className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                    Delete
                  </button>
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="flex flex-col items-center md:items-start">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 mb-4 shadow-sm">
                  <img src="profile.webp" alt="Profile" className="w-full h-full object-cover"/>
                </div>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 mb-2 transition-colors">
                  Change Photo
                </button>
                <p className="text-gray-500 text-xs">
                  File size: maximum 1 MB<br/>
                  File extension: JPEG, PNG
                </p>
              </div>
            </div>

            {/* Save Button (Separate at bottom) */}
            <div className="flex justify-end mt-8">
              <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

      

       {/* Feature Section */}
                   <div className="bg-white py-12 mt-12">
                     <div className="max-w-7xl mx-auto px-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                         {/* Free Delivery & Installation */}
                         <div className="flex items-start">
                           <Icon icon="mdi:truck-delivery-outline" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
                           <div>
                             <h3 className="font-semibold text-lg mb-2 text-black">Free delivery & installation</h3>
                             <p className="text-gray-600">For orders P10,000.00 and above within Metro Manila.</p>
                           </div>
                         </div>
                   
                         {/* Phone Contact */}
                         <div className="flex items-start">
                           <Icon icon="mdi:phone-outline" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
                           <div>
                             <h3 className="font-semibold text-lg mb-2 text-black">Phone Contact</h3>
                             <p className="text-gray-600">Monday to Sunday 9:00am - 5:00pm</p>
                           </div>
                         </div>
                   
                         {/* Top-notch support */}
                         <div className="flex items-start">
                           <Icon icon="mdi:headset" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
                           <div>
                             <h3 className="font-semibold text-lg mb-2 text-black">Top-notch support</h3>
                             <p className="text-gray-600">Any question? Our team is just one click away!</p>
                           </div>
                         </div>
                   
                         {/* Secure payments */}
                         <div className="flex items-start">
                           <Icon icon="mdi:lock-outline" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
                           <div>
                             <h3 className="font-semibold text-lg mb-2 text-black">Secure payments</h3>
                             <p className="text-gray-600">Your payment information is processed securely</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                
                   
                 {/* Footer */}
                 <footer className="bg-white text-black py-12 border-t border-gray-200">
                   <div className="max-w-7xl mx-auto px-4">
                     {/* Top Footer Sections */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                       
                       {/* Our Company */}
                       <div>
                         <h3 className="font-semibold text-lg mb-4">OUR COMPANY</h3>
                         <ul className="space-y-2">
                           <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
                           <li><a href="#about-us" className="hover:text-orange-500 transition-colors">About Us</a></li>
                           <li><a href="#subscribe" className="hover:text-orange-500 transition-colors">Subscribe</a></li>
                         </ul>
                       </div>
                 
                       {/* More Info */}
                       <div>
                         <h3 className="font-semibold text-lg mb-4">MORE INFO</h3>
                         <ul className="space-y-2">
                           <li><a href="#delivery" className="hover:text-orange-500 transition-colors">Delivery & Installation</a></li>
                           <li><a href="#privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                           <li><a href="#returns" className="hover:text-orange-500 transition-colors">Returns & Refunds</a></li>
                           <li><a href="#help" className="hover:text-orange-500 transition-colors">Help & FAQs</a></li>
                           <li><a href="#terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</a></li>
                           <li><a href="#warranty" className="hover:text-orange-500 transition-colors">Warranty Terms</a></li>
                           <li><a href="#careers" className="hover:text-orange-500 transition-colors">Careers</a></li>
                         </ul>
                       </div>
                 
                       {/* Connect with Us */}
                       <div>
                         <h3 className="font-semibold text-lg mb-4">CONNECT WITH US</h3>
                         <ul className="space-y-2">
                           <li><a href="tel:+639123456789" className="hover:text-orange-500 transition-colors">+639123456789</a></li>
                           <li><a href="mailto:example@gmail.com" className="hover:text-orange-500 transition-colors">example@gmail.com</a></li>
                           <li><a href="https://wa.me/639123456789" className="hover:text-orange-500 transition-colors">WhatsApp</a></li>
                           <li><a href="https://m.me/yourpage" className="hover:text-orange-500 transition-colors">Messenger</a></li>
                         </ul>
                       </div>
                 
                       {/* Our Location */}
                       <div>
                         <h3 className="font-semibold text-lg mb-4">OUR LOCATION</h3>
                         <p className="mb-2">Izaj Lighting Centre</p>
                         <p className="text-gray-600 mb-6">San Pablo - 173 I, San Pablo City, 4000 Laguna</p>
                         <h3 className="font-semibold text-lg mb-4">OUR BRANCHES</h3>
                         <ul className="space-y-2 text-gray-600">
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
                         <img src="payments.png" alt="Payment Methods" className="w-full max-w-xs" />
                       </div>
                     </div>
                 
                     {/* Bottom Footer */}
                     <div className="mt-12 text-center text-sm text-gray-500">
                       <p>© 2025 IZAJ LIGHTING CENTRE. All Rights Reserved.</p>
                     </div>
                   </div>
                 </footer>
    </div>
  );
};

export default MyPurchase;