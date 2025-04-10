import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Header: React.FC<{
  user?: { name: string } | null;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountDropdownOpen?: boolean;
  handleLogout?: () => void;
}> = ({
  user = null,
  setIsModalOpen = () => {},
  setIsAccountDropdownOpen = () => {},
  isAccountDropdownOpen = false,
  handleLogout = () => {},
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white px-10 py-3 flex flex-col">
      <div className="flex items-center justify-between w-full">
        <div className="text-6xl tracking-wide flex-shrink-0 leading-tight font-regular" style={{ color: "#000000", fontFamily: "'Playfair Display', serif", textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)", letterSpacing: "10px" }}>
          IZAJ
        </div>

        <div className="flex items-center space-x-6">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2">
            <input type="text" placeholder="Search" className="w-full border border-black-500 pl-10 pr-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black rounded-full" />
            <Icon icon="ic:outline-search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" width="25" height="25" />
          </div>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <button onClick={() => setIsModalOpen(true)} className="text-black hover:text-orange-500 transition-colors duration-200" aria-label="Login">
                  <Icon icon="lucide:user" width="28" height="28" />
                </button>
                <Icon icon="mingcute:notification-newdot-line" className="text-black cursor-pointer hover:text-orange-500" width="28" height="28" />
                <Link to="/cart">
                  <Icon icon="mdi:cart-outline" className="text-black cursor-pointer hover:text-orange-500" width="28" height="28" />
                </Link>
              </>
            ) : (
              <div className="flex items-center">
                <div className="relative">
                  <button onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)} className="flex items-center" aria-haspopup="true" aria-expanded={isAccountDropdownOpen}>
                    <Icon icon="lucide:user" width="30" height="30" className="text-black hover:text-orange-500 transition-colors duration-200" />
                    <div className="flex flex-col ml-2 text-left">
                      <span className="font-medium text-sm text-gray-500 leading-none" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "200" }}>
                        Hello {user.name}
                      </span>
                      <div className="flex items-center text-black">
                        <span className="font-medium text-lg" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>My Account</span>
                        <Icon icon="mdi:chevron-down" width="20" height="20" className="ml-1 text-black" />
                      </div>
                    </div>
                  </button>

                  {isAccountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 animate-fade-in transition-all">
                      <ul className="py-2 text-sm text-black">
                        <li>
                          <a href="#my-account" className="block px-4 py-2 hover:bg-gray-100 transition-colors">My Account</a>
                        </li>
                        <li>
                          <Link to="/my-purchases" className="block px-4 py-2 hover:bg-gray-100 transition-colors">My Purchases</Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">Logout</button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Icon icon="mingcute:notification-newdot-line" className="text-black cursor-pointer hover:text-orange-500 ml-4" width="28" height="28" />
                <Link to="/cart">
                  <Icon icon="mdi:cart-outline" className="text-black cursor-pointer hover:text-orange-500 ml-4" width="28" height="28" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="bg-white py-3">
        <ul className="flex justify-center space-x-10 text-sm font-medium">
          <li><a href="/" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>
          <li className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-black font-medium text-sm hover:border-b-2 border-black pb-1 flex items-center">
              PRODUCTS <Icon icon="mdi:chevron-down" className="ml-1 text-xs" width="25" height="25" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                <ul className="py-2">
                  <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-100">LIGHTING FIXTURES</a></li>
                  <li><Link to="/product-list" className="block px-4 py-2 hover:bg-gray-100">All Lighting Fixtures</Link></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Ceiling Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Semi Flush Mounted Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Chandeliers</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Cluster Chandeliers</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Pendant Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Floor Lamps</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Table Lamps</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Rechargeable Table Lamps</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Wall Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Painting & Bathroom Lights</a></li>
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
  );
};
const ProductList: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/5 p-6 border-r">
          <h3 className="font-bold text-black mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm text-black">
            <li className="font-bold">Lighting Fixtures</li>
            <li className="pl-2 hover:underline cursor-pointer">Ceiling Lights</li>
            <li className="pl-2 hover:underline cursor-pointer">Semi Flush Mounted Lights</li>
            <li className="pl-2 hover:underline cursor-pointer">Chandelier</li>
            <li className="pl-2 hover:underline cursor-pointer">Cluster Chandelier</li>
            <li className="pl-2 hover:underline cursor-pointer">Pendant Lights</li>
            <li className="pl-2 hover:underline cursor-pointer">Floor Lamps</li>
            <li className="pl-2 hover:underline cursor-pointer">Table Lamps</li>
            <li className="pl-2 hover:underline cursor-pointer">Rechargeable Table Lamps</li>
            <li className="pl-2 hover:underline cursor-pointer">Wall Lights</li>
            <li className="pl-2 hover:underline cursor-pointer">Painting & Bathroom Lights</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-4/5 p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-black">All Lighting Fixtures</h1>
            <img src="banner.png" alt="Banner" className="w-full h-56 object-cover rounded-md my-4" />
            <div className="flex justify-between items-center mb-6">
              <div>
                <label htmlFor="sort" className="mr-2 text-sm text-gray-700">Sort by:</label>
                <select id="sort" className="border text-sm px-2 py-1 rounded-md">
                  <option>Alphabetical, A-Z</option>
                  <option>Alphabetical, Z-A</option>
                  <option>Price, Low to High</option>
                  <option>Price, High to Low</option>
                </select>
              </div>
              
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                <img
                  src="ceiling.jpg"
                  alt="Product"
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-sm font-semibold text-black mt-3">Aberdeen | Modern LED Chandelier</h3>
                <p className="text-black text-lg font-bold mt-1">₱16,995</p>
                <p className="text-xs text-gray-500">INQUIRE NOW</p>
                <button className="mt-2 w-full py-1 bg-black text-white text-sm font-medium rounded">CHOOSE OPTIONS</button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            <button className="px-3 py-1 border rounded bg-black text-white">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <span className="px-3 py-1">...</span>
            <button className="px-3 py-1 border rounded">10</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
          
        </main>
        
      </div>
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
        <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>TOP PICKS</h3>
        <p className="mt-2 text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>SHOP DESIGNER FAVORITES</p>
        <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
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
        <h3 className="text-2xl font-extrabold text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>WHAT'S HOT?</h3>
        <p className="mt-2 text-sm text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
        <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
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
      
      <img
        src="ceiling.jpg" 
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
      
      <img
        src="ceiling.jpg" 
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
    
      <img
        src="ceiling.jpg" 
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
      
      <img
        src="ceiling.jpg" 
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

{/* Feature Section */}
<div className="bg-white py-8">
  <div className="max-w-screen-xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Free Delivery & Installation */}
      <div className="flex items-center text-left">
        <Icon icon="mdi:truck-delivery-outline" width="32" height="32" className="text-black mr-4" />
        <div>
          <h3 className="font-semibold text-lg mb-2 text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>Free delivery & installation</h3>
          <p className="text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>For orders P10,000.00 and above within Metro Manila.</p>
        </div>
      </div>

      {/* Phone Contact */}
      <div className="flex items-center text-left">
        <Icon icon="mdi:phone-outline" width="32" height="32" className="text-black mr-4" />
        <div>
          <h3 className="font-semibold text-lg mb-2 text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>Phone Contact</h3>
          <p className="text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>Monday to Sunday 9:00am - 5:00pm</p>
        </div>
      </div>

      {/* Top-notch support */}
      <div className="flex items-center text-left">
        <Icon icon="mdi:headset" width="32" height="32" className="text-black mr-4" />
        <div>
          <h3 className="font-semibold text-lg mb-2 text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>Top-notch support</h3>
          <p className="text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>Any question? Our team is just one click away!</p>
        </div>
      </div>

      {/* Secure payments */}
      <div className="flex items-center text-left">
        <Icon icon="mdi:lock-outline" width="32" height="32" className="text-black mr-4" />
        <div>
          <h3 className="font-semibold text-lg mb-2 text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>Secure payments</h3>
          <p className="text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>Your payment information is processed securely</p>
        </div>
      </div>
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
        <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>OUR COMPANY</h3>
        <ul className="space-y-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>
          <li><a href="#home" className="hover:text-orange-500">Home</a></li>
          <li><a href="#about-us" className="hover:text-orange-500">About Us</a></li>
          <li><a href="#subscribe" className="hover:text-orange-500">Subscribe</a></li>
        </ul>
      </div>

      {/* More Info */}
      <div>
        <h3 className="font-semibold text-lg mb-4"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>MORE INFO</h3>
        <ul className="space-y-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>
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
        <h3 className="font-semibold text-lg mb-4"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>CONNECT WITH US</h3>
        <ul className="space-y-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>
          <li><a href="tel:+639123456789" className="hover:text-orange-500">+639123456789</a></li>
          <li><a href="mailto:example@gmail.com" className="hover:text-orange-500">example@gmail.com</a></li>
          <li><a href="https://wa.me/639123456789" className="hover:text-orange-500">WhatsApp</a></li>
          <li><a href="https://m.me/yourpage" className="hover:text-orange-500">Messenger</a></li>
        </ul>
      </div>

      {/* Our Location */}
      <div>
        <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>OUR LOCATION</h3>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>Izaj Lighting Centre</p>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>San Pablo - 173 I, San Pablo City, 4000 Laguna</p>
        <h3 className="font-semibold text-lg mt-6 mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>OUR BRANCHES</h3>
        <ul className="space-y-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>
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
        <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>PAYMENTS METHOD</h3>
        <img src="payments.png" alt="Payments Methods" className="w-full" />
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="mt-10 text-center text-sm text-gray-400" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>
      <p>© 2025 IZAJ LIGHTING CENTRE. All Rights Reserved.</p>
    </div>
  </div>
</footer>
    </div>

  );
};

export default ProductList;
