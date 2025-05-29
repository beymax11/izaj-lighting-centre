import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import './App.css';
import ChatNow from './ChatNow';
import FavoritesDropdown from './FavoritesDropdown';
import NotificationDropdown from './NotificationDropdown';

interface User {
  name: string;
  email: string;
}

const Header: React.FC<{
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: User | null;
  setIsAccountDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountDropdownOpen?: boolean;
  handleLogout?: () => void;
}> = ({ 
  setIsModalOpen, 
  user, 
  setIsAccountDropdownOpen, 
  isAccountDropdownOpen,
  handleLogout 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white px-10 py-3 flex flex-col">
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex flex-col items-start flex-shrink-0">
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
        </div>

        {/* Right Section with Search, User, Notification, and Cart Icons */}
        <div className="flex items-center space-x-6">
          {/* Centered Search Bar */}
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

          {/* Login/Signup Section with Icons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-4">
                {/* User Icon (for Login) */}
                <button
                  onClick={() => setIsModalOpen && setIsModalOpen(true)}
                  className="text-black hover:text-orange-500 transition-colors duration-200"
                  aria-label="Login"
                >
                  <Icon icon="lucide:user" width="28" height="28" />
                </button>
                
                {/* FavoritesDropdown and NotificationDropdown for not logged in */}
                <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                  <FavoritesDropdown user={user as null} />
                </div>
                <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                  <NotificationDropdown user={user as null} />
                </div>
                
                {/* Cart Icon - Always visible */}
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
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsAccountDropdownOpen && setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    className="flex items-center"
                    aria-haspopup="true"
                    aria-expanded={isAccountDropdownOpen}
                  >
                    {/* User icon aligned with other icons */}
                    <Icon icon="lucide:user" width="30" height="30" className="text-black hover:text-orange-500 transition-colors duration-200" />
                    
                    {/* Text container aligned to the left */}
                    <div className="flex flex-col ml-2 text-left">
                      {/* Username and My Account aligned with minimal spacing */}
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

                  {isAccountDropdownOpen && (user) && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200 transform origin-top-right transition-all duration-200 ease-out">
                      <div className="py-1">
                        <Link
                          to="/my-profile"
                          className="flex items-center px-4 py-3 text-sm text-black hover:bg-indigo-50 hover:text-indigo-600 transition-colors group"
                        >
                          <Icon icon="mdi:account-circle-outline" className="h-5 w-5 mr-3 text-black group-hover:text-indigo-500" />
                          My Account
                        </Link>
                        <Link
                          to="/my-purchase"
                          className="flex items-center px-4 py-3 text-sm text-black hover:bg-indigo-50 hover:text-indigo-600 transition-colors group"
                        >
                          <Icon icon="mdi:clipboard-list-outline" className="h-5 w-5 mr-3 text-black group-hover:text-indigo-500" />
                          My Purchases
                        </Link>
                        <hr className="border-gray-200 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors group"
                        >
                          <Icon icon="mdi:logout" className="h-5 w-5 mr-3 text-red-400 group-hover:text-red-500" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* FavoritesDropdown and NotificationDropdown */}
                <div className="flex items-center justify-center ml-4" style={{ marginTop: "4px" }}>
                  <FavoritesDropdown user={user as typeof user} />
                </div>
                <div className="flex items-center justify-center ml-4" style={{ marginTop: "4px" }}>
                  <NotificationDropdown user={user as typeof user} />
                </div>

                {/* Cart Icon */}
                <Link to="/cart">
                  <Icon
                    icon="mdi:cart-outline"
                    className="text-black cursor-pointer hover:text-orange-500"
                    width="28"
                    height="28"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white py-3">
        <ul className="flex justify-center space-x-10 text-sm font-medium">
          <li><a href="#home" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>

          {/* Products Dropdown Menu (gaya ng App.tsx) */}
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
                  transform: "translateX(-44%)",
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
                            <img src="ceiling.avif" alt="Ceiling Lights" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
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
                        <li><a href="#product3" className="hover:text-orange-500 transition-colors duration-200 text-sm">Indoor Lights</a></li>
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

          <li>
            <Link to="/new" className="text-black hover:border-b-2 border-black pb-1">
              NEW
            </Link>
          </li>
          <li>
            <Link to="/sales" className="text-black hover:border-b-2 border-black pb-1">
              SALES
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};


const ItemDescription: React.FC = () => {
  const [mainImage, setMainImage] = useState("aber.webp");
  const [zoomStyle, setZoomStyle] = useState({});
  const imgRef = useRef<HTMLDivElement>(null);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  
  const thumbnails = [
    "aber.webp",
    "aber2.webp",
    "aber3.webp",
    "aber4.webp"
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Product Info Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Product Images */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {thumbnails.map((thumbnail, index) => (
                  <img 
                    key={index}
                    src={thumbnail}
                    className={`w-16 h-16 md:w-20 md:h-20 object-cover border cursor-pointer transition-all ${
                      mainImage === thumbnail ? 'ring-2 ring-black' : 'border-gray-200'
                    }`}
                    onClick={() => setMainImage(thumbnail)}
                    alt={`Thumbnail ${index + 1}`}
                  />
                ))}
              </div>

              {/* Main Product Image with Zoom Effect */}
              <div className="flex-1 order-1 md:order-2">
                <div 
                  ref={imgRef}
                  className="relative overflow-hidden rounded-lg aspect-square w-full"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Original Image */}
                  <img
                    src={mainImage}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Product Image"
                  />
                  
                  {/* Zoom Layer */}
                  {Object.keys(zoomStyle).length > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        ...zoomStyle,
                        backgroundRepeat: 'no-repeat',
                        zIndex: 10
                      }}
                    />
                  )}
                </div>

                {/* Social Media Icons below main image */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Share:</span>
                    <Icon icon="logos:messenger" className="w-5 h-5 text-blue-500 cursor-pointer hover:opacity-80" />
                    <Icon icon="ic:baseline-facebook" className="w-5 h-5 text-blue-700 cursor-pointer hover:opacity-80" />
                    <Icon icon="mdi:instagram" className="w-5 h-5 text-pink-500 cursor-pointer hover:opacity-80" />
                    <Icon icon="mdi:twitter" className="w-5 h-5 text-blue-400 cursor-pointer hover:opacity-80" />
                  </div>

                  <div className="flex items-center text-gray-600 text-sm gap-1">
                    <Icon icon="mdi:heart" className="text-red-500 text-lg" />
                    Favorite (2.7k)
                  </div>
                </div>
                {/* Product Description - Added below Social Media Icons */}
                <div className="mt-4 p-4 ">
                  <h3 className="font-bold text-black text-lg mb-2">PRODUCT DESCRIPTION</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Color: Black, Black + Gold</li>
                    <li>Material: Iron art + Aluminum</li>
                    <li>Width: 120cm</li>
                  </ul>
                </div>
                {/* Payment & Security Section */}
                <div className="mt-4 p-4 border-t border-gray-200">
                  <h3 className="font-bold text-black text-lg mb-4">PAYMENT & SECURITY</h3>
                  <div className="flex justify-center">
                    <img 
                      src="payment.webp" 
                      alt="Payment security badges" 
                      className="w-80 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          {/* Product Details */}
          <div className="flex-1">
            {/* Chat Now Button */}
            <button 
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm mb-6 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              onClick={() => setIsChatModalOpen(true)}
            >
              <Icon icon="material-symbols:chat-outline-rounded" className="text-lg" />
              INQUIRE NOW
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Aberdeen | Modern LED Chandelier
            </h2>

            {/* Monthly Deals & Ratings */}
            <div className="flex items-center mb-4 gap-2">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">MONTHLY DEALS</span>
              <div className="flex items-center">
                <span className="mr-1">4.5</span>
                {[...Array(4)].map((_, i) => (
                  <Icon key={i} icon="mdi:star" className="text-yellow-500 text-lg" />
                ))}
                <Icon icon="mdi:star-half" className="text-yellow-500 text-lg" />
              </div>
              <span className="text-gray-500 text-sm">7.3K Ratings | 10K+ Sold</span>
            </div>

            {/* Color Options */}
            <div className="mb-6">
              <p className="font-semibold mb-2">Color: Black</p>
              <div className="flex gap-2">
                <img src="floor.jpg" className="w-12 h-12 object-cover border border-gray-200 rounded cursor-pointer hover:ring-2 hover:ring-black" />
                <img src="floor.jpg" className="w-12 h-12 object-cover border border-gray-200 rounded cursor-pointer hover:ring-2 hover:ring-black" />
              </div>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold mb-4">₱16,995</p>

            {/* Stock */}
            <p className="mb-6 text-gray-600">Stock: <span className="font-semibold text-green-600">In Stock</span></p>

            {/* Quantity & Branch Availability */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <input 
                  type="number" 
                  min="1" 
                  defaultValue="1" 
                  className="w-16 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none" 
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-medium">Branch Availability:</label>
                <select className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black focus:outline-none">
                  <option>San Pablo City</option>
                  <option>Quezon</option>
                  <option>Laguna</option>
                  <option>Cavite</option>
                  <option>Batangas</option>
                  <option>Camarines Sur</option>
                  <option>Sorsogon</option>
                  <option>La Union</option>
                </select>
              </div>
            </div>

            {/* Shipping Schedule */}
            <div className="bg-yellow-100 p-4 rounded-lg mb-8 flex items-start">
              <Icon 
                icon="mdi:truck-delivery-outline" 
                className="text-gray-800 text-2xl mr-3 mt-1 flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Shipping Schedule</h3>
                <p className="text-gray-800 text-sm">
                  Dispatched within 10-14 working days (for store pick up), 10-14 days (Metro Manila), and 14 days (Provincial).
                </p>
              </div>
            </div>

            {/* Buttons */} 
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:cart-outline" className="text-lg" />
                ADD TO CART
              </button>
              
                <Link 
                to="/checkout"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                <Icon icon="mdi:credit-card-outline" className="text-lg" />
                BUY NOW
                </Link>
            </div>

            {/* Wrap the following two sections in a fragment to avoid JSX errors */}
            <>
              {/* Delivery & Installation Section */}
              <div className="mb-8 border-b border-gray-200 pb-6">
                <button 
                  className="w-full flex items-center justify-between text-xl font-semibold text-black mb-4"
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                >
                  <span>DELIVERY & INSTALLATION</span>
                  <Icon 
                    icon={isDeliveryOpen ? "mdi:minus" : "mdi:plus"} 
                    className="text-black text-xl" 
                  />
                </button>
                
                {isDeliveryOpen && (
                  <div className="max-h-64 overflow-y-auto">
                    <div className="space-y-4 pr-2">
                      <h4 className="text-lg font-bold">To ensure quality service, please read our Delivery and Installation guidelines:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Free Delivery:</strong> Orders Php10,000 and above* 
                          <span className="text-gray-600"> (within San Pablo City only)</span>
                        </li>
                        <li>
                          <strong>Free installation:</strong> Orders Php10,000 and above* 
                          <span className="text-gray-600"> (within San Pablo City only)</span> Installation should be done on the same day of Delivery.
                        </li>
                        <li>
                          <strong>Regular Installation Fee</strong> – Php 900.00/pc*
                        </li>
                      </ul>
                      <p className="text-gray-600">
                        *Installations are applicable to lighting fixtures only.
                      </p>

                      <div className="pt-4">
                        <h4 className="text-lg font-bold mb-2">Added notes on Delivery & Installation:</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>The customer shall be responsible to ensure that either he/she personally or a valid representative will receive the products and approve of its condition before the delivery team leaves. Damaged products should be pointed out to the delivery team upon delivery so a replacement may be scheduled.</li>
                          <li>The customer should apply for all necessary gate passes, working and other permits needed for the delivery day.</li>
                          <li>If the customer is not available to receive the delivery at the agreed day, new delivery will be scheduled with a corresponding delivery fee.</li>
                          <li>Kindly check the condition of goods before signing receipt before the delivery team leaves as warranties are not indulged in our offers.</li>
                          <li>For installation, the customer shall be responsible in ensuring that the ceiling are fit for installations. Gypsum boards without support are not fit for big fixture installation.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Care Instruction Section */}
              <div className="mb-8 border-b border-gray-200 pb-6">
                <button 
                  className="w-full flex items-center justify-between text-xl font-semibold text-black mb-4"
                  onClick={() => setIsCareOpen(!isCareOpen)}
                >
                  <span>CARE INSTRUCTION</span>
                  <Icon 
                    icon={isCareOpen ? "mdi:minus" : "mdi:plus"} 
                    className="text-black text-xl" 
                  />
                </button>
                {isCareOpen && (
                  <div className="max-h-64 overflow-y-auto">
                    <div className="border-t border-gray-200 pt-4 space-y-4 pr-2">
                      <h4 className="font-semibold text-lg">Care Instructions for Your Chandelier</h4>
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-medium mb-2">1. Identify How Your Chandelier Should be Handled</h5>
                          <p className="text-gray-700">
                            The type, size, and age of your chandelier will affect the steps you will have to take to care for it. If you
                            have an antique or a crystal chandelier, for example, then you will need to take more precautions than
                            if you have a newer or mass-produced chandelier. Check out advice from your chandelier's manufacturer
                            for tips on how you should care for your chandelier and how often. You can find a lot of useful tips online
                            as well.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">2. Dismantle and Clean</h5>
                          <p className="text-gray-700 mb-2">
                            It is possible to clean a chandelier with just a dry cloth to avoid risk from the electrical components, but it isn't
                            as effective and can actually take longer sometimes. A better method is to take your chandelier apart and hand
                            clean it piece by piece. It is a little time consuming but doing it every few months or whenever you have an
                            important event coming up will be enough. Experts suggest every two to six months, depending on
                            the conditions in the room the chandelier is hanging.
                          </p>
                          <p className="text-gray-700 font-medium mb-1">Essentially, you need to:</p>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Carefully take the chandelier down</li>
                            <li>Lay out each individual piece on a blanket</li>
                            <li>Wash each piece with hot water and a little detergent</li>
                            <li>Rinse, dry, polish, and then put the chandelier back together again</li>
                          </ul>
                          <p className="text-gray-700 mt-2">
                            Take special care with crystals or other delicate components and be wary of electrical parts. Scheduling time to
                            do this however often your chandelier needs it will keep it looking nice at all times.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">3. Dust Weekly</h5>
                          <p className="text-gray-700">
                            When you are doing your daily or weekly cleaning, it can be easy to forget about your light fixtures which is
                            how dust and grime can build up on them so easily, often without you noticing. Not only does this make it
                            harder when it does come time to give them a thorough cleaning, it can be troublesome for people with
                            asthma or allergies. Instead, don't forget to run your chandelier over with a duster at least once a week and get
                            as much dust as you are able to. It won't always be possible to get your chandelier completely clean this way,
                            but it will make things easier when you do your thorough cleaning as described above.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">4. Hire a Professional</h5>
                          <p className="text-gray-700">
                            If dismantling and cleaning your chandelier seems too difficult or too much for you to do alone, consider hiring
                            a professional cleaning company which specializes in chandeliers. Not only will the professional cleaners be
                            able to take apart and reassemble your chandelier safely, they will also be able to give it that extra sparkle. It is
                            a big job so if you don't have the time or skills, a professional pays for themselves. Check out cleaning
                            companies in your area which can help you and schedule a visit every few months or so.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">5. Regular Maintenance</h5>
                          <p className="text-gray-700">
                            Cleaning is only one aspect of keeping your chandelier looking good. You also need to make sure it is working
                            properly and being put together correctly. Again, you can either pick this up yourself by looking for some online guides
                            or YouTube videos or hire a professional who knows how to maintain chandeliers. If you have an antique or a
                            particularly large chandelier then this will be even more important. There are companies which specialize in
                            restoring antique chandeliers which have lost their shine. Even smaller modern chandeliers will need some
                            maintenance every once in a while to keep them functional. Many companies will be able to clean and fix up
                            your chandelier on the same visit, saving you both time and money. Don't forget to clean and change the
                            light bulbs regularly as well.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700">
                            Taking care of your chandelier can seem like a daunting task at first, but it is well worth it when you see how
                            shiny and nice looking your chandelier will become. Whether you do it yourself or hire a professional,
                            making regular chandelier cleaning, maintenance, and restoration a part of your cleaning routine along
                            with weekly dusting will ensure your chandelier will always impress and make your home look good.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          </div>
        </div>
      </div>

        
      {/* Chat Modal */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop with fade animation */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsChatModalOpen(false)}
          />
          
          {/* Modal container with slide-up animation */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button overlay */}
              <button
                onClick={() => setIsChatModalOpen(false)}
                className="absolute -top-10 -right-10 md:top-4 md:right-4 z-10 p-2 text-white hover:text-gray-200 transition-colors"
              >
                <Icon icon="mdi:close" width={24} height={24} />
              </button>
              
              {/* Chat component */}
              <div className="h-full">
                <ChatNow onClose={() => setIsChatModalOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Ratings, Feature Section, Footer */}
      <div>
        {/* Product Ratings */}
        <div className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-black mb-6">PRODUCT RATINGS</h3>

          {/* Review Box */}
          <div className="border border-black rounded-lg p-6 shadow-sm relative">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Icon icon="qlementine-icons:user-16" className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-2">
                {/* User Name */}
                <p className="font-semibold text-black">John D.</p>
                
                {/* Star Rating */}
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>

                {/* Date and Variation */}
                <p className="text-gray-500 text-sm">2025-03-14 12:00 | Variation: Black</p>
                
                {/* Ratings */}
                <div className="space-y-1 mt-2">
                  <p className="text-black">Performance: Good</p>
                  <p className="text-black">Durability: Good</p>
                  <p className="text-black">Quality: Good</p>
                </div>
                
                {/* Comment */}
                <div className="mt-2">
                  <p className="text-black font-medium">Comment: <span className="font-normal">Very Good</span></p>
                </div>

                {/* Image */}
                <div className="mt-3">
                  <img 
                    src="aber.webp" 
                    alt="Review" 
                    className="w-24 h-24 object-cover rounded-md border border-gray-200"
                  />
                </div>

                {/* Like Button */}
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:thumb-up-outline" className="h-5 w-5" />
                    <span>123</span>
                  </button>
                </div>
              </div>
            </div>

            {/* View More */}
            <div className="absolute bottom-4 right-4">
              <button className="text-sm text-gray-500 hover:underline">View More</button>
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

export default ItemDescription;
