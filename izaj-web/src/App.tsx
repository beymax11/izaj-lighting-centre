import React, { useState } from "react";
import { Icon } from '@iconify/react'; // Import Icon from Iconify
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './login';
import SignUpForm from './signup';
import ItemDescription from './item-description';
import Cart from './cart';
import ProductList from './product-list';
import Collection from './collection';
import Sales from './sales';
import Checkout from './checkout';
import MyPurchase from './MyPurchase';
import MyProfile from './MyProfile';
import BanksCards from './banks-cards';
import Addresses from './addresses'; 
import Aboutus from './aboutus'; 
import Contactus from './contactus'; 
import ChangePassword from './change-password';
import { Link } from 'react-router-dom';
import "./App.css";

interface User {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAccountDropdownOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={
          <VideoStreamingUI 
            setIsModalOpen={setIsModalOpen} 
            user={user} 
            setIsAccountDropdownOpen={setIsAccountDropdownOpen}
            isAccountDropdownOpen={isAccountDropdownOpen}
            handleLogout={handleLogout}
          />
        } />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/my-purchases" element={<MyPurchase />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/banks-cards" element={<BanksCards />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/new" element={<Collection />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/item-description" element={<ItemDescription />} />
      </Routes>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            {isLoginForm ? (
              <LoginForm 
                toggleForm={toggleForm} 
                onLogin={handleLogin}
              />
            ) : (
              <SignUpForm toggleForm={toggleForm} />
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-center text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Router>
  );
};

const VideoStreamingUI: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setIsAccountDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountDropdownOpen: boolean;
  handleLogout: () => void;
}> = ({ 
  setIsModalOpen, 
  user, 
  setIsAccountDropdownOpen, 
  isAccountDropdownOpen,
  handleLogout 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white text-white font-sans">
      {/* Header */}
      <header className="bg-white px-10 py-3 flex flex-col sticky top-0 z-50">
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex flex-col items-start flex-shrink-0">
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
          </div>

          {/* Right Section with Search, User, Notification, and Cart Icons */}
          <div className="flex items-center space-x-6">
            {/* Centered Search Bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-96">
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

            {/* Login/Signup or User Account Section */}
            {!user ? (
              <button
            onClick={() => setIsModalOpen(true)}
            className="text-black text-large font-large flex items-center hover:text-orange-500 font-bold"
              >
            <span>Login/Signup</span>
              </button>
            ) : (
              <div className="relative">
          <button 
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            className="text-black text-large font-large flex items-center hover:text-orange-500"
          >
            <Icon icon="mdi:account" className="mr-2" width="16" height="16" />
            <span>Hello {user.name}</span>
            <Icon icon="mdi:chevron-down" className="ml-2" width="16" height="16" />
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
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
              </ul>
            </div>
          )}
              </div>
            )}

            {/* Divider Line */}
            <div className="h-10 w-px bg-black"></div>

            {/* Notification Icon */}
            <div className="flex items-center space-x-2">
              <Icon 
          icon="mingcute:notification-newdot-line" 
          className="text-lg text-black cursor-pointer"
          width="40"
          height="40"
              />

              {/* Cart Icon */}
              <Icon 
          icon="mdi:cart-outline"  // Material Design Icons
          className="text-lg text-black hover:text-orange-500 cursor-pointer"
          width="40"
          height="40"
              />
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="bg-white py-3">
          <ul className="flex justify-center space-x-10 text-sm font-medium">
            <li><a href="#home" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>

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
                    <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-100">LIGHTING FIXTURES</a></li>
                    <li>
                      <Link to="/product-list" className="block px-4 py-2 hover:bg-gray-100">
                        All Lighting Fixtures
                      </Link>
                    </li>
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
            <Link to="/aboutus" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</Link>
          </ul>
        </nav>
      </header>


      {/* Main Content */}
      <main className="p-0 mx-0 w-full">
  {/* Full-width banner */}
  <div 
    className="w-full h-screen relative overflow-hidden"
    style={{ 
      backgroundImage: " url('/hero.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Content container */}
    <div className="absolute bottom-0 left-0 w-full px-10 py-12 text-white flex justify-between items-end">
      {/* Text content */}
      <div className="max-w-2xl">
        <h1 
          className="text-4xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          IZAJ LIGHTNING CENTRE
        </h1>
        <p 
          className="text-xl font-light mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our team is passionate about helping you
           find the perfect lighting.
        </p>
      </div>

      {/* Learn More button */}
      <button 
        className="px-0 py-2 text-white font-semibold text-xl hover:underline flex items-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        LEARN MORE <Icon icon="mdi:chevron-right" className="ml-1 text-xs" width="30" height="30" />
        <span className="ml-2 text-2xl"></span>
      </button>
    </div>
  </div>

        {/* Lightning Category Section */}
        <div className="flex justify-between items-center mb-4 px-4 mt-8 mx-4">
          {/* Left Text */}
          <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            LIGHTING CATEGORY
          </h2>
          {/* Right Link */}
          <Link to="/product-list" className="text-sm font-medium text-gray-500 hover:underline mt-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 mx-4 px-6">
            <div className="bg-white p-4 rounded-lg flex flex-col items-center rounded-2xl hover:shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="relative w-full h-80 overflow-hidden">
              <img
            src="ceiling.jpg"
            alt="Ceiling Lights"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl transform transition-transform duration-300 hover:scale-110"
              />
          </div>
          <h3 className="text-lg font-semibold text-black mt-2 text-center hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700" }}>
              Ceiling Lights
          </h3>
            </div>

            <div className="bg-white p-4 rounded-lg flex flex-col items-center hover:shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="relative w-full h-80 overflow-hidden">
              <img
            src="chadelier.jpg"
            alt="Chandelier"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl transform transition-transform duration-300 hover:scale-110"
              />
          </div>
          <h3 className="text-lg font-semibold text-black mt-2 text-center hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700" }}>
              Chandelier
          </h3>
            </div>

            <div className="bg-white p-4 rounded-lg flex flex-col items-center hover:shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="relative w-full h-80 overflow-hidden">
              <img
            src="cluster.jpg"
            alt="Cluster Chandelier"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl transform transition-transform duration-300 hover:scale-110"
              />
          </div>
          <h3 className="text-lg font-semibold text-black mt-2 text-center hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700" }}>
              Cluster Chandelier
          </h3>
            </div>

            <div className="bg-white p-4 rounded-lg flex flex-col items-center hover:shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="relative w-full h-80 overflow-hidden">
              <img
            src="pendant.jpg"
            alt="Pendant Lights"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl transform transition-transform duration-300 hover:scale-110"
              />
          </div>
          <h3 className="text-lg font-semibold text-black mt-2 text-center hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700" }}>
              Pendant Lights
          </h3>
            </div>

            <div className="bg-white p-4 rounded-lg flex flex-col items-center hover:shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="relative w-full h-80 overflow-hidden">
              <img
            src="floor.jpg"
            alt="Floor Lights"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl transform transition-transform duration-300 hover:scale-110"
              />
          </div>
          <h3 className="text-lg font-semibold text-black mt-2 text-center hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700" }}>
              Floor Lights
          </h3>
            </div>
        </div>

{/* About Us Section - Plain Version */}
<div className="mt-16 mb-16 px-4">
<h2 className="text-3xl font-bold text-black mb-8 text-center"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extra-bold" }}>About IZAJ</h2>
  <p className="text-lg text-black leading-relaxed mb-6 text-center max-w-4xl mx-auto"style={{ fontFamily: "'Poppins', sans-serif", }}>
    Izaj Lighting Centre is a premier provider of high-quality chandeliers and lighting solutions in the Philippines. With a commitment to enhancing interiors through exceptional illumination, we offer a curated selection of lighting fixtures that blend functionality with aesthetic appeal.
  </p>
  
  <div className="max-w-4xl mx-auto flex justify-center">
  <h3 className="text-large font-bold text-white bg-black py-2 px-5 rounded-md text-center"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
      About Us
    </h3>
  </div>
</div>

{/* Monthly Deals Section */}
<div className="mt-16 px-4 mx-4">
  <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
    MONTHLY DEALS
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Deal 1 */}
    <div className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-md">
      <img
        src="ceiling.jpg"
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-110"
      />
      <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
        MONTHLY DEALS
      </span>
      </div>
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      {/* Link for navigation */}
      <Link to="/item-description">
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
        CHOOSE OPTIONS
      </button>
      </Link>
    </div>

    {/* Repeat similar blocks for other deals */}
    <div className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <div className="relative overflow-hidden rounded-md">
        <img
          src="chadelier.jpg"
          alt="Aberdeen LED Chandelier"
          className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-110"
        />
         <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
        MONTHLY DEALS
      </span>
      </div>
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      {/* Link for navigation */}
      <Link to="/item-description">
        <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
          CHOOSE OPTIONS
        </button>
      </Link>
    </div>

    {/* Add other deals as needed */}
    <div className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <div className="relative overflow-hidden rounded-md">
        <img
          src="cluster.jpg"
          alt="Aberdeen LED Chandelier"
          className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-110"
        />
         <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
        MONTHLY DEALS
      </span>
      </div>
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      {/* Link for navigation */}
      <Link to="/item-description">
        <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
          CHOOSE OPTIONS
        </button>
      </Link>
    </div>

    <div className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <div className="relative overflow-hidden rounded-md">
        <img
          src="floor.jpg"
          alt="Aberdeen LED Chandelier"
          className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-110"
        />
         <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
        MONTHLY DEALS
      </span>
      </div>
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      {/* Link for navigation */}
      <Link to="/item-description">
        <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
          CHOOSE OPTIONS
        </button>
      </Link>
    </div>
  </div>
</div>



{/* New Collection Banner */}
<div className="w-full h-screen bg-cover bg-center relative mt-4" // Adjusted margin-top slightly higher
  style={{
    backgroundImage: "url('/bradakan-uzlUBEYwufo-unsplash.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
    {/* Left content - Image area */}
    <div className="w-3/5 h-4/5"> {/* Reduced height from full to 4/5 */}
      <img 
        src="/collection.jpg"
        alt="Chandelier"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right content - Text and Button */}
    <div className="w-1/2 h-4/5 flex flex-col justify-between px-12 text-white bg-black">
      {/* IZAJ text at the top */}
      <div className="mt-2"> {/* Adjusted margin-top slightly higher */}
        <h1 
          className="text-6xl" 
          style={{ 
        fontFamily: "'Playfair Display', serif", 
        letterSpacing: "0.3em" 
          }}
        >
          IZAJ
        </h1>
      </div>

      {/* New Collection text and button at the top */}
      <div className="text-left mt-2 mb-6"> {/* Adjusted margin-bottom slightly higher */}
        <p className="text-5xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.2em" }}>NEW COLLECTION</p>
        <p className="mt-1 text-lg" style={{ fontFamily: "'Poppins', serif" }}>Free Delivery & Installation</p>
        <div className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 w-40">
            <button className="text-center" style={{ fontFamily: "'Poppins', serif" }}>
            SHOP NOW
            </button>
        </div>  
      </div>
    
      
    </div>
  </div>
</div>


  {/* Fresh Drops Section */}
  <div className="mt-4 px-4 mx-4">
    <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
      FRESH DROPS
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Deal 1 */}
      <div className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden rounded-md">
          <img
            src="ceiling.jpg"
            alt="Aberdeen LED Chandelier"
            className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
          />
          <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            FRESH DROPS
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black mt-2">Aberdeen | Modern LED Chandelier</h3>
        <p className="text-gray-500 text-sm line-through">₱16,995</p>
        <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
        {/* Link for navigation */}
        <Link to="/item-description">
          <button className="mt-2 w-full py-2 bg-black text-white font-semibold rounded-lg">
            CHOOSE OPTIONS
          </button>
        </Link>
      </div>

      {/* Repeat similar blocks for other deals */}
      <div className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden rounded-md">
          <img
            src="chadelier.jpg"
            alt="Aberdeen LED Chandelier"
            className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
          />
          <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            FRESH DROPS
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black mt-2">Aberdeen | Modern LED Chandelier</h3>
        <p className="text-gray-500 text-sm line-through">₱16,995</p>
        <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
        {/* Link for navigation */}
        <Link to="/item-description">
          <button className="mt-2 w-full py-2 bg-black text-white font-semibold rounded-lg">
            CHOOSE OPTIONS
          </button>
        </Link>
      </div>

      {/* Add other deals as needed */}
      <div className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden rounded-md">
          <img
            src="cluster.jpg"
            alt="Aberdeen LED Chandelier"
            className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
          />
          <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            FRESH DROPS
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black mt-2">Aberdeen | Modern LED Chandelier</h3>
        <p className="text-gray-500 text-sm line-through">₱16,995</p>
        <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
        {/* Link for navigation */}
        <Link to="/item-description">
          <button className="mt-2 w-full py-2 bg-black text-white font-semibold rounded-lg">
            CHOOSE OPTIONS
          </button>
        </Link>
      </div>

      <div className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden rounded-md">
          <img
            src="floor.jpg"
            alt="Aberdeen LED Chandelier"
            className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
          />
          <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            FRESH DROPS
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black mt-2">Aberdeen | Modern LED Chandelier</h3>
        <p className="text-gray-500 text-sm line-through">₱16,995</p>
        <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
        {/* Link for navigation */}
        <Link to="/item-description">
          <button className="mt-2 w-full py-2 bg-black text-white font-semibold rounded-lg">
            CHOOSE OPTIONS
          </button>
        </Link>
      </div>
    </div>
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
        <h3 className="text-xl font-semibold text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>WHAT'S HOT?</h3>
        <p className="mt-2 text-sm text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
        <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
          SHOP NOW
        </button>
      </div>
    </div>
  </div>
</div>
 {/* FREE DESIGN CONSULTATION*/}
<div className="mt-16 mb-16 px-4">
<h2 className="text-3xl font-bold text-black mb-8 text-center"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extra-bold" }}>FREE DESIGN CONSULTATION</h2>
  <p className="text-lg text-black leading-relaxed mb-6 text-center max-w-4xl mx-auto"style={{ fontFamily: "'Poppins', sans-serif", }}>
  We'd love to hear from you! Whether you have questions about our products, need assistance with your order, or want to provide feedback, please reach out to us through any of the following      
  channels.
  </p>
  
  <div className="max-w-4xl mx-auto flex justify-center">
  <Link to="/contactus" className="text-large font-bold text-white bg-black py-2 px-5 rounded-md text-center"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>Contact Us</Link>
            
  </div>
</div>

{/* Inserted Image Section */}
<div className="w-full">
  <img
    src="banner.png"
    alt="Testimonials"
    className="w-full object-cover"
  />
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



      </main>
    </div>
  );
};
export default App;

