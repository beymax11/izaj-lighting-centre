import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const MyPurchase: React.FC = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Banks & Cards');

  const paymentTabs = ['Banks & Cards', 'E-Wallet'];
  const [user, setUser] = useState<{ name: string } | null>({
    name: 'Daniel ',
  }); // Hardcoded user for example
 
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Updated Header */}
      <header className="bg-white px-10 py-3 flex flex-col shadow-sm">
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full">
        {/* Logo */}
                   <Link to="/" className="flex flex-col items-start flex-shrink-0">
                   <div
                     className="text-6xl tracking-wide flex-shrink-0 leading-tight font-regular"
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
                className="w-full border border-gray-300 pl-10 pr-4 py-3 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 rounded-full transition-colors shadow-sm"
              />
              <Icon
                icon="ic:outline-search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                width="25"
                height="25"
              />
            </div>

            {/* User/Dropdown */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <div className="flex items-center space-x-4">
                  <button
                    className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                    aria-label="Login"
                  >
                    <Icon icon="lucide:user" width="28" height="28" />
                  </button>
                  <Icon
                    icon="mingcute:notification-newdot-line"
                    className="text-gray-700 cursor-pointer hover:text-indigo-600"
                    width="28"
                    height="28"
                  />
                  <Link to="/cart">
                    <Icon
                      icon="mdi:cart-outline"
                      className="text-gray-700 cursor-pointer hover:text-indigo-600"
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
                      <Icon icon="lucide:user" width="30" height="30" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200" />
                      <div className="flex flex-col ml-2 text-left">
                        <span className="font-medium text-sm text-gray-500 leading-none" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "200" }}>
                          Hello {user.name}
                        </span>
                        <div className="flex items-center text-gray-800">
                          <span className="font-medium text-lg" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                            My Account
                          </span>
                          <Icon icon="mdi:chevron-down" width="20" height="20" className="ml-1 text-gray-700" />
                        </div>
                      </div>
                    </button>

                    {isAccountDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 animate-fade-in transition-all">
                        <ul className="py-2 text-sm text-gray-700">
                          <li>
                            <Link to="/my-profile" className="block px-4 py-2 hover:bg-gray-50 transition-colors">
                              My Account
                            </Link>
                          </li>
                          <li>
                            <Link to="/my-purchases" className="block px-4 py-2 hover:bg-gray-50 transition-colors">
                              My Purchases
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
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
                    className="text-gray-700 cursor-pointer hover:text-indigo-600 ml-4"
                    width="28"
                    height="28"
                  />
                  <Link to="/cart">
                    <Icon
                      icon="mdi:cart-outline"
                      className="text-gray-700 cursor-pointer hover:text-indigo-600 ml-4"
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
            <li><Link to="/" className="text-gray-800 hover:text-indigo-600 hover:border-b-2 border-indigo-600 pb-1 transition-colors">HOME</Link></li>
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-800 font-medium text-sm hover:text-indigo-600 hover:border-b-2 border-indigo-600 pb-1 flex items-center transition-colors"
              >
                PRODUCTS <Icon icon="mdi:chevron-down" className="ml-1 text-xs" width="25" height="25" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48 z-50">
                  <ul className="py-2">
                    <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Ceiling Lights</a></li>
                    <li><a href="#product2" className="block px-4 py-2 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Pendant Lights</a></li>
                    <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Chandeliers</a></li>
                  </ul>
                </div>
              )}
            </li>
            <li><Link to="/new" className="text-gray-800 hover:text-indigo-600 hover:border-b-2 border-indigo-600 pb-1 transition-colors">NEW</Link></li>
            <li><Link to="/sales" className="text-gray-800 hover:text-indigo-600 hover:border-b-2 border-indigo-600 pb-1 transition-colors">SALES</Link></li>
            <li><Link to="/aboutus" className="text-gray-800 hover:text-indigo-600 hover:border-b-2 border-indigo-600 pb-1 transition-colors">ABOUT US</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - User Profile */}
            <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-indigo-100 shadow-sm">
                  <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="font-medium text-lg mb-6 text-center">Daniela Padilla</div>
            
                <ul className="w-full space-y-1">
                  <li className="flex items-center p-3 bg-indigo-50 rounded-lg mb-1">
                    <Icon icon="lucide:user" className="text-indigo-600 mr-2 w-5 h-5" />
                    <span className="text-indigo-700 font-medium text-sm">My Account</span>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
                    <Link to="/my-profile" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Profile</Link>
                  </li>
                  <li className="pl-10 py-2 bg-indigo-50 rounded-lg">
                    <Link to="/banks-cards" className="text-indigo-600 font-medium text-sm block">Payment Methods</Link>
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
            
            {/* Right Column - Payment Methods */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">PAYMENT METHODS</h2>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Tabs Navigation */}
                <div className="flex border-b border-gray-200">
                  {paymentTabs.map((tab) => (
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

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'Banks & Cards' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold flex items-center text-gray-800">
                          <Icon icon="mdi:credit-card-outline" className="mr-2 text-indigo-600" width="24" height="24" />
                          Credit/Debit Cards
                        </h3>
                        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                          Add New Card
                        </button>
                      </div>
                      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
                        <Icon icon="mdi:credit-card-off-outline" className="mx-auto mb-4 text-gray-400" width="48" height="48" />
                        <p className="text-gray-500">You don't have any cards yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Add a card to make checkout faster</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'E-Wallet' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold flex items-center text-gray-800">
                          <Icon icon="mdi:wallet-outline" className="mr-2 text-indigo-600" width="24" height="24" />
                          E-Wallet
                        </h3>
                        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                          Add E-Wallet
                        </button>
                      </div>
                      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
                        <Icon icon="mdi:wallet-off-outline" className="mx-auto mb-4 text-gray-400" width="48" height="48" />
                        <p className="text-gray-500">You don't have any e-wallets yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Add an e-wallet for convenient payments</p>
                      </div>
                    </div>
                  )}
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