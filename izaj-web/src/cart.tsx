import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import './App.css';

// Cart Component
const Cart: React.FC = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>({
    name: 'Daniel ',
  }); // Hardcoded user for example

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Updated Header from MyPurchase.tsx */}
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
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-black font-medium text-sm hover:border-b-2 border-black pb-1 flex items-center"
              >
                PRODUCTS <Icon icon="mdi:chevron-down" className="ml-1 text-xs" width="25" height="25" />
              </button>
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
            <li><Link to="/new" className="text-black hover:border-b-2 border-black pb-1">NEW</Link></li>
            <li><Link to="/sales" className="text-black hover:border-b-2 border-black pb-1">SALES</Link></li>
            <li><Link to="/aboutus" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
<div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6">
  {/* Shopping Header */}
  <h1 className="text-lg font-bold uppercase tracking-wider mb-4">SHOPPING</h1>

  {/* Cart Table Container */}
  <div className="border-t border-b border-l border-r border-gray-300">
    {/* Table Header */}
    <div className="grid grid-cols-12 border-b border-gray-300 py-3 px-4">
      <div className="col-span-6">
        <div className="flex items-center">
          <input type="checkbox" className="mr-3 h-4 w-4" />
          <span className="uppercase font-medium text-sm">PRODUCT</span>
        </div>
      </div>
      <div className="col-span-2 text-sm uppercase font-medium">
        UNIT PRICE
      </div>
      <div className="col-span-2 text-sm uppercase font-medium">
        QUANTITY
      </div>
      <div className="col-span-1 text-sm uppercase font-medium">
        TOTAL PRICE
      </div>
      <div className="col-span-1 text-sm uppercase font-medium">
        ACTIONS
      </div>
    </div>

    {/* Product Item */}
    <div className="grid grid-cols-12 items-center py-4 px-4 border-b border-gray-200">
      <div className="col-span-6">
        <div className="flex items-center">
          <input type="checkbox" className="mr-3 h-4 w-4" />
          <div className="w-24 h-24 mr-4">
            <img
              src="ceiling.jpg"
              alt="Aberdeen Modern LED Chandelier"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">Aberdeen | Modern LED Chandelier</p>
            <p className="text-xs text-gray-500 mt-1">
              Dispatched within 7 working days (Metro Manila) and 14 days (Provincial)
            </p>
            <div className="mt-2">
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full inline-flex items-center">
                Monthly Deals (-₱1,000) <span className="ml-1 text-xs cursor-pointer">×</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div>
          <p className="font-medium">₱15,995</p>
          <p className="text-xs text-gray-500 line-through">₱16,995</p>
        </div>
      </div>
      <div className="col-span-2">
        <div className="relative inline-block">
          <select className="border border-gray-300 rounded py-1 pl-2 pr-8 appearance-none bg-white">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="col-span-1 font-medium">
        ₱15,995
      </div>
      <div className="col-span-1">
        <button className="text-red-500 text-sm">Delete</button>
      </div>
    </div>
  </div>

  {/* Lower Section */}
  <div className="mt-8 grid grid-cols-12 gap-6">
    {/* Shipping Estimate */}
    <div className="col-span-12 lg:col-span-6">
      <div className="border border-gray-300 p-4">
        <div className="flex justify-between items-center cursor-pointer">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="uppercase font-medium text-sm">ESTIMATE SHIPPING</span>
          </div>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Order Summary */}
    <div className="col-span-12 lg:col-span-6">
      <div className="border border-gray-300 p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium">Total</span>
          <span className="font-medium">₱15,995</span>
        </div>
        <div className="text-sm text-red-500 mb-3">
          You saved ₱1,000!
        </div>
        <div className="flex justify-between items-center mb-3 cursor-pointer">
          <span className="text-sm">Order Instructions</span>
          <span className="text-lg font-bold">+</span>
        </div>
        <button className="w-full bg-black text-white py-3 uppercase font-bold mt-3">
          CHECKOUT
        </button>
        <div className="text-xs text-center mt-2 text-gray-500">
          Taxes and shipping calculated at checkout
        </div>
      </div>
    </div>
  </div>
</div>

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

export default Cart;