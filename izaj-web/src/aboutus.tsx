import React, { useState } from 'react';

import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const SimpleAboutUs: React.FC = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [user, setUser] = useState<{ name: string } | null>({
        name: 'Daniel',
    }); // Hardcoded user for example
      
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
    };

    const handleLogout = () => {
        setUser(null);
    };

 return (
     <div className="flex flex-col min-h-screen">
       {/* Updated Header */}
       <header className="bg-white px-10 py-3 flex flex-col ">
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

     {/* Main Content - Contact Information */}
<main className="flex-grow container mx-auto px-4 py-12">
  <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-center">
    <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wide">About Us</h1>
    
    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Our Story</h2>
      </div>

      <div className="space-y-4">
        <p>
          At <span className="font-semibold text-black">Izaj Lightning Centre</span>, we don't just sell chandeliers—we create breathtaking lighting experiences that transform spaces into works of art. From classic crystal masterpieces to modern, statement-making designs, our chandeliers bring elegance, sophistication, and brilliance to every home and business.
        </p>
        <p>
          What started as a single store fueled by a passion for luxury lighting has now grown into seven branches, each dedicated to offering the finest selection of chandeliers. Our journey has been built on craftsmanship, innovation, and a deep understanding of what makes a space truly shine.
        </p>
        <p>
          At Izaj Lightning Centre, we believe the right chandelier does more than illuminate—it tells a story, sets a mood, and adds timeless beauty. Whether you're looking for a grand centerpiece or a contemporary lighting solution, our expert team is here to guide you in finding the perfect piece for your space.
        </p>
        <p>
          Visit us today and let us light up your world with brilliance and style.
        </p>
      </div>
    </div>
  </div>
</main>

{/* Subscription Section */}
<section className="bg-black py-16 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6 text-white leading-snug">
      Get fabulous discounts and exclusive offers by signing up to our mailing list.
    </h2>
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
      <input
        type="email"
        placeholder="Your email address"
        className="px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-white text-gray-800 max-w-md w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 hover:text-white transition duration-300"
      >
        Subscribe
      </button>
    </form>
    <p className="text-sm text-gray-400 mt-4 italic">100% free. Unsubscribe any time.</p>
  </div>
</section>


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

export default SimpleAboutUs;