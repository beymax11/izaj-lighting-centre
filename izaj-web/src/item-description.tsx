import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faShoppingCart, faCaretDown, } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for routing
import './App.css';


const Header: React.FC = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  return (
    <header className="bg-white px-10 py-3 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-3xl font-playfair tracking-widest text-black">
        IZAJ
      </div>

      {/* Search Bar */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
        />
      </div>

      {/* Right Icons */}
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

          {/* Account Dropdown */}
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

        {/* Icons */}
        <FontAwesomeIcon icon={faBell} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
        <FontAwesomeIcon icon={faShoppingCart} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
      </div>
    </header>
  );
};

// Navigation Bar Component
const NavigationBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white py-3 border-b border-gray-200">
      <ul className="flex justify-center space-x-10 text-sm font-medium">
        <li><a href="/" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>
        <li className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          <a href="#" className="text-black hover:border-b-2 border-black pb-1 flex items-center">
            PRODUCTS <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-xs" />
          </a>
          {/* Dropdown for Products */}
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
              <ul className="py-2">
                <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-100">Product 1</a></li>
                <li><a href="#product2" className="block px-4 py-2 hover:bg-gray-100">Product 2</a></li>
                <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Product 3</a></li>
              </ul>
            </div>
          )}
        </li>
        <li><a href="/new" className="text-black hover:border-b-2 border-black pb-1">NEW</a></li>
        <li><a href="/sales" className="text-black hover:border-b-2 border-black pb-1">SALES</a></li>
        <li><a href="/about" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</a></li>
      </ul>
    </nav>
  );
};

// Item Description Component
const ItemDescription: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Header and Navigation Bar */}
      <Header />
      <NavigationBar />

      {/* Product Info Section */}
      <div className="flex flex-wrap gap-10 mt-10">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <img
            src="ceiling-light.jpg" // Replace with the actual product image URL
            alt="Aberdeen Modern LED Chandelier"
            className="w-full h-auto object-cover rounded-lg"
          />
          {/* Thumbnails for the images */}
          <div className="flex space-x-4 mt-4">
            <img
              src="ceiling-light.jpg" // Replace with actual thumbnail images
              alt="Thumbnail 1"
              className="w-20 h-20 object-cover rounded-md cursor-pointer"
            />
            <img
              src="ceiling-light.jpg" // Replace with actual thumbnail images
              alt="Thumbnail 2"
              className="w-20 h-20 object-cover rounded-md cursor-pointer"
            />
            <img
              src="ceiling-light.jpg" // Replace with actual thumbnail images
              alt="Thumbnail 3"
              className="w-20 h-20 object-cover rounded-md cursor-pointer"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-black mb-2">
            Aberdeen | Modern LED Chandelier
          </h2>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-gray-500 text-sm ml-2">(1.8K Ratings)</span>
          </div>

          <p className="text-xl font-bold text-red-600 mb-4">₱16,995</p>

          <div className="flex items-center space-x-4 mb-6">
            <div className="text-gray-600">Color:</div>
            <div className="w-6 h-6 rounded-full bg-black cursor-pointer" title="Black"></div>
            <div className="w-6 h-6 rounded-full bg-yellow-600 cursor-pointer" title="Black + Gold"></div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">Stock: <span className="font-semibold">In Stock</span></p>
          </div>

          {/* Quantity and Button */}
          <div className="flex items-center space-x-4 mb-6">
            <label className="text-gray-600">Quantity:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-20 p-2 border rounded-md border-gray-300"
            />
           <Link to="/cart">
 <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300">
              ADD TO CART
            </button>
</Link>

            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
              BUY NOW
            </button>
          </div>
          
          {/* Chat Now button */}
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
            CHAT NOW
          </button>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-black mb-4">PRODUCT DESCRIPTION</h3>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Color: Black, Black + Gold</li>
          <li>Material: Iron art + Aluminum</li>
          <li>Width: 120cm</li>
        </ul>
      </div>

      {/* Delivery & Installation Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-black mb-4">DELIVERY & INSTALLATION</h3>
        <p className="text-gray-600">
          Delivery and installation will be arranged with your order. Please allow 3-5 business days for processing.
        </p>
      </div>

      {/* Care Instructions */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-black mb-4">CARE INSTRUCTIONS</h3>
        <p className="text-gray-600">
          To clean, wipe with a soft, dry cloth. Avoid using chemical cleaners or abrasive materials.
        </p>
      </div>

      {/* Product Ratings */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-black mb-4">PRODUCT RATINGS</h3>
        <div className="flex items-center">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="text-gray-500 text-sm ml-2">(2.7K Reviews)</span>
        </div>

        <div className="mt-4">
          {/* Review List */}
          <div className="border-t border-gray-300 pt-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <p className="font-semibold">2025-03-14 12:00 | Variation: Black</p>
                <p className="text-gray-500 text-sm">Performance: Good, Durability: Good, Quality: Good</p>
                <p className="text-gray-600">Comment: Very Good</p>
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
        </div>
      </div>
    </div>
  );
};

export default ItemDescription;
