import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './AuthForm';
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
import ChatNow from './ChatNow';
import { Link } from 'react-router-dom';
import "./App.css";

interface UserData {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = (userData: UserData) => {
    console.log("Logged in user:", userData);
    setUser(userData);
    setIsModalOpen(false); // close the login modal
  };
  const handleLogout = () => {
    setUser(null);
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
      <Route path="/my-purchase" element={<MyPurchase />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/addresses" element={<Addresses />} />
      <Route path="/chatnow" element={<ChatNow />} />
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
 <div
 className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
 onClick={() => setIsModalOpen(false)} // close when clicking the background
>
 <div
   className="relative"
   onClick={(e) => e.stopPropagation()} // prevent close when clicking inside the modal
 >
   <button
     onClick={() => setIsModalOpen(false)}
     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
     aria-label="Close"
   >
     <Icon icon="mdi:close" width="20" height="20" />
   </button>
   <AuthForm
     isLoginForm={isLoginForm}
     toggleForm={toggleForm}
     onLogin={handleLogin}
   />
 </div>
</div>

)}
  </Router>

  );
};
const LightingCategory = () => {
  const allItems = [
    { id: 1, name: "Ceiling Lights", image: "celing.avif" },
    { id: 2, name: "Chandelier", image: "chandelier.avif" },
    { id: 3, name: "Pendant Lights", image: "pendant.avif" },
    { id: 4, name: "Wall Lights", image: "wall.avif" },
    { id: 5, name: "Table Lamps", image: "table.avif" },
    { id: 6, name: "Cluster Chandelier", image: "cluster2.avif" },
    { id: 7, name: "Floor Lamps", image: "floor.avif" },
    { id: 8, name: " Table Lamps", image: "rechargeable.avif" },
    { id: 9, name: "Painting Lights", image: "painting.avif" },
    { id: 10, name: "Indoor Lights", image: "indoor.avif" },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const firstPageItems = allItems.slice(0, 6);
  const secondPageItems = allItems.slice(6, 10);

  const handleNextClick = () => {
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 px-8 mt-16 mx-8">
        <h2 className="text-2xl text-black" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
          LIGHTING CATEGORY
        </h2>
        <div className="flex items-center">
          <Link
            to="/product-list"
            className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
          >
            VIEW ALL
          </Link>
        </div>
      </div>

      <div
        className="relative group"
        style={{
          minHeight: "220px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              width: 0;
              height: 0;
              display: none;
            }
          `}
        </style>

        <div
          className="flex justify-center space-x-6 transition-all duration-700 ease-in-out absolute w-full"
          style={{
            opacity: currentPage === 0 ? 1 : 0,
            transform: `translateX(${currentPage === 0 ? "0" : "-100%"})`,
            pointerEvents: currentPage === 0 ? "auto" : "none",
          }}
        >
          {firstPageItems.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-48 flex flex-col items-center relative group">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-white duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3
                className="text-lg font-light text-black mt-2 text-center hover:text-orange-500 transition-all duration-500 relative"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "300" }}
              >
                <span className="inline-block group-hover:translate-x-[-10px] transition-transform duration-500">
                  {item.name}
                </span>
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Icon icon="stash:arrow-right-light" className="text-black" width="20" height="20" />
                </span>
              </h3>
            </div>
          ))}
        </div>

        <div
          className="flex justify-center space-x-6 transition-all duration-700 ease-in-out absolute w-full"
          style={{
            opacity: currentPage === 1 ? 1 : 0,
            transform: `translateX(${currentPage === 1 ? "0" : "100%"})`,
            pointerEvents: currentPage === 1 ? "auto" : "none",
          }}
        >
          {secondPageItems.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-48 flex flex-col items-center relative group">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-white duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3
                className="text-lg font-light text-black mt-2 text-center hover:text-orange-500 transition-all duration-500 relative"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "300" }}
              >
                <span className="inline-block group-hover:translate-x-[-10px] transition-transform duration-500">
                  {item.name}
                </span>
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Icon icon="stash:arrow-right-light" className="text-black" width="20" height="20" />
                </span>
              </h3>
            </div>
          ))}
        </div>

        {currentPage === 1 && (
          <button
            onClick={handleNextClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110 opacity-0 group-hover:opacity-100"
            style={{ zIndex: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110 opacity-0 group-hover:opacity-100"
          style={{ zIndex: 10 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
};


const VideoStreamingUI: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserData | null;
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
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const heroImages = [
    {
      image: "hero1.jpg",
      heading: "IZAJ LIGHTING CENTRE",
      subheading: "Our team is passionate about helping you find the perfect lighting.                                                  ",
    },
    {
      image: "hero2.jpg",
      heading: "IZAJ LIGHTING CENTRE",
      subheading: "Illuminate your home with style.",
    },
    {
      image: "hero3.jpg",
      heading: "IZAJ LIGHTING CENTRE",
      subheading: "Discover what's new and trending.",
    },
  ];
  
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // 5 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  // Sample deals data
  const deals = [
    {
      id: 1,
      image: "ceiling.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 2,
      image: "chadelier.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 3,
      image: "cluster.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 4,
      image: "pendant.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 5,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 6,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 7,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 8,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
  ];

 
  


  
  return (
    <div className="min-h-screen bg-white text-white font-sans">
  
      {/* Header */}
      <header className="bg-white px-10 py-3 flex flex-col ">
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
                    onClick={() => setIsModalOpen(true)}
                    className="text-black hover:text-orange-500 transition-colors duration-200"
                    aria-label="Login"
                  >
                    <Icon icon="lucide:user" width="28" height="28" />
                  </button>
                  
                  {/* Notification Icon - Always visible */}
                  <Icon
                    icon="mingcute:notification-newdot-line"
                    className="text-black cursor-pointer hover:text-orange-500"
                    width="28"
                    height="28"
                  />
                  
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
                <div className="flex items-center">
                  <div className="relative">
                    <button
                      onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                      className="flex items-center transition-transform duration-300"
                      aria-haspopup="true"
                      aria-expanded={isAccountDropdownOpen}
                      style={{
                      transform: isAccountDropdownOpen ? "translateY(-2px)" : "translateY(0)",
                      color: isAccountDropdownOpen ? "#4B0082" : "black",
                      }}
                    >
                      {/* User icon aligned with other icons */}
                      <Icon
                      icon="lucide:user"
                      width="30"
                      height="30"
                      className="text-black hover:text-orange-500 transition-colors duration-200"
                      />
                      
                      {/* Text container aligned to the left */}
                      <div className="flex flex-col ml-2 text-left">
                      {/* Username and My Account aligned with minimal spacing */}
                      <span
                        className="font-medium text-sm text-gray-500 leading-none"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "200" }}
                      >
                        Hello {user.name}
                      </span>
                      <div className="flex items-center text-black">
                        <span
                        className="font-medium text-lg"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
                        >
                        My Account
                        </span>
                        <Icon
                        icon="mdi:chevron-down"
                        width="20"
                        height="20"
                        className={`ml-1 text-black transition-transform duration-300 ${
                          isAccountDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                        />
                      </div>
                      </div>
                    </button>

                    {isAccountDropdownOpen && (
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

                     <Link
                     to="/my-purchase"
                     className="flex items-center px-4 py-3 text-sm text-black hover:bg-indigo-50 hover:text-indigo-600 transition-colors group"
                     >
                     <Icon icon="mdi:heart-outline" className="h-5 w-5 mr-3 text-black group-hover:text-indigo-500" />
                     My Favorites
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
                  
                  {/* Notification Icon */}
                  <Icon
                    icon="mingcute:notification-newdot-line"
                    className="text-black cursor-pointer hover:text-orange-500 ml-4"
                    width="28"
                    height="28"
                  />

                  {/* Cart Icon */}
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
            

        {/* Navbar */}
        <nav className="bg-white py-3">
          <ul className="flex justify-center space-x-10 text-sm font-medium">
            <li><a href="#home" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>
        

{/* Products Dropdown - Full Width Mega Menu */}
<li className="relative group">
  <div
    className="text-black font-medium text-sm hover:border-b-2 border-black pb-1 flex items-center justify-between cursor-pointer transition-all duration-300"
    style={{
      transform: isDropdownOpen ? "translateY(-2px)" : "translateY(0)",
      color: isDropdownOpen ? "#4B0082" : "black",
    }}
    onMouseEnter={() => setIsDropdownOpen(true)}
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
      className="fixed left-0 right-0 bg-white text-black shadow-xl z-50 border-t border-gray-200 mt-2"
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
                          {/* Hero Slideshow */}
                            <div className="relative w-full h-[500px] overflow-hidden z-0 mt-[-1px]">
                              {/* Hero Image */}
                              <img 
                                src={`/public/${heroImages[currentHeroIndex].image}`}
                                alt="Hero Slide"
                                className="w-full h-full object-cover transition-opacity duration-1000"
                              />

                              {/* Overlay Text */}
                              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-left p-4 rounded-lg shadow-lg">
                                <h1 
                                className="text-2xl md:text-3xl font-bold mb-2" 
                                style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                {heroImages[currentHeroIndex].heading}
                                </h1>
                                <p className="text-lg md:text-xl" style={{ fontFamily: "'Poppins', serif" }}>
                                {heroImages[currentHeroIndex].subheading}
                                </p>
                              </div>

                              {/* Dots Navigation */}
                              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {heroImages.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentHeroIndex(index)}
                                    className={`w-3 h-3 rounded-full ${
                                      index === currentHeroIndex ? "bg-white" : "bg-gray-400"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>





      <LightingCategory />

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
<div className="mt-16 px-8 mx-8">
  {/* Title */}
  <h2 className="text-2xl font-bold text-black mb-8 text-left" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
    MONTHLY DEALS
  </h2>
  
  <div className="relative group" style={{
    height: "500px", // Fixed height to prevent vertical scrolling
    overflow: "hidden", // Hide overflow
  }}>
    {/* First Page with 4 items */}
    <div
      className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
      style={{
        opacity: currentDealIndex === 0 ? 1 : 0,
        transform: `translateX(${currentDealIndex === 0 ? "0" : "-100%"})`,
        pointerEvents: currentDealIndex === 0 ? "auto" : "none",
      }}
    >
      {deals.slice(0, 4).map((deal) => (
        <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          <div className="relative overflow-hidden flex-grow">
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
            />
            <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
              MONTHLY DEALS
            </span>
          </div>
          <h3 className="text-lg font-semibold text-black mt-4">{deal.title}</h3>
          <p className="text-gray-500 text-sm line-through">{deal.oldPrice}</p>
          <p className="text-black font-semibold">{deal.newPrice} <span className="text-red-500">{deal.discount}</span></p>
          <Link to="/item-description">
            <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
              CHOOSE OPTIONS
            </button>
          </Link>
        </div>
      ))}
    </div>

    {/* Second Page with next 4 items */}
    <div
      className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
      style={{
        opacity: currentDealIndex === 1 ? 1 : 0,
        transform: `translateX(${currentDealIndex === 1 ? "0" : "100%"})`,
        pointerEvents: currentDealIndex === 1 ? "auto" : "none",
      }}
    >
      {deals.slice(4, 8).map((deal) => (
        <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          <div className="relative overflow-hidden flex-grow">
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
            />
            <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
              MONTHLY DEALS
            </span>
          </div>
          <h3 className="text-lg font-semibold text-black mt-4">{deal.title}</h3>
          <p className="text-gray-500 text-sm line-through">{deal.oldPrice}</p>
          <p className="text-black font-semibold">{deal.newPrice} <span className="text-red-500">{deal.discount}</span></p>
          <Link to="/item-description">
            <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
              CHOOSE OPTIONS
            </button>
          </Link>
        </div>
      ))}
    </div>

    {/* Navigation Buttons */}
    {currentDealIndex === 1 && (
      <button
        onClick={() => setCurrentDealIndex(0)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
        style={{ zIndex: 10 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )}

    {currentDealIndex === 0 && (
      <button
        onClick={() => setCurrentDealIndex(1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
        style={{ zIndex: 10 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )}
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
  <div className="mt-12 px-8 mx-8">
    {/* Title */}
    <h2 className="text-2xl font-bold text-black mb-8 text-left" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
      FRESH DROPS
    </h2>
    
    <div className="relative group" style={{
      height: "500px", // Fixed height to prevent vertical scrolling
      overflow: "hidden", // Hide overflow
    }}>
      {/* First Page with 4 items */}
      <div
        className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
        style={{
          opacity: currentDealIndex === 0 ? 1 : 0,
          transform: `translateX(${currentDealIndex === 0 ? "0" : "-100%"})`,
          pointerEvents: currentDealIndex === 0 ? "auto" : "none",
        }}
      >
        {deals.slice(0, 4).map((deal) => (
          <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <div className="relative overflow-hidden flex-grow">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                FRESH DROPS
              </span>
            </div>
            <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
            <p className="text-gray-500 text-sm line-through">₱16,995</p>
            <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
            <Link to="/item-description">
              <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                CHOOSE OPTIONS
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Second Page with next 4 items */}
      <div
        className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
        style={{
          opacity: currentDealIndex === 1 ? 1 : 0,
          transform: `translateX(${currentDealIndex === 1 ? "0" : "100%"})`,
          pointerEvents: currentDealIndex === 1 ? "auto" : "none",
        }}
      >
        {deals.slice(4, 8).map((deal) => (
          <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <div className="relative overflow-hidden flex-grow">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                FRESH DROPS
              </span>
            </div>
            <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
            <p className="text-gray-500 text-sm line-through">₱16,995</p>
            <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
            <Link to="/item-description">
              <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                CHOOSE OPTIONS
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {currentDealIndex === 1 && (
        <button
          onClick={() => setCurrentDealIndex(0)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
          style={{ zIndex: 10 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {currentDealIndex === 0 && (
        <button
          onClick={() => setCurrentDealIndex(1)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
          style={{ zIndex: 10 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
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
        <h3 className="text-2xl font-extrabold text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>WHAT'S HOT?</h3>
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



      </main>
    </div>
  );
};
export default App;

