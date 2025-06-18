import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import FavoritesDropdown from '../FavoritesDropdown';
import NotificationDropdown from '../NotificationDropdown';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface HeaderProps {
  user: User | null;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountDropdownOpen: boolean;
  handleLogout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Header: React.FC<HeaderProps> = ({
  user,
  setIsModalOpen,
  setIsAccountDropdownOpen,
  isAccountDropdownOpen,
  handleLogout,
  setUser
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, [setUser]);


  const handleLogoutClick = () => {
    // Clear auth token but keep user data
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
    // Call the original logout handler
    handleLogout();
    
    // Close the dropdown
    setIsAccountDropdownOpen(false);
    
    // Navigate to home page
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsAccountDropdownOpen]);

  // Handler for Home navigation
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <div className="bg-black text-white text-center py-3 flex items-center justify-center" style={{ height: '30px', zIndex: 100 }}>
        <p className="text-sm px-4">Monthly Sale is here! &rarr; Enjoy 10% OFF items for the month of May</p>
      </div>

      <header className="bg-white px-4 md:px-10 py-3 flex flex-col">
           {/* Top Header Row */}
           <div className="flex items-center justify-between w-full">
          {/* Mobile Menu Button and Logo Container */}
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon icon="mdi:menu" width="28" height="28" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-start flex-shrink-0 w-full">
              <div
                className="text-3xl md:text-6xl tracking-wide flex-shrink-0 leading-tight font-regular"
                style={{
                  color: "#000000",
                  fontFamily: "'Playfair Display', serif",
                  textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)",
                  letterSpacing: "4px",
                  whiteSpace: "nowrap",
                  width: "100%",
                  display: "inline-block",
                  transform: "scale(0.95)",
                  transformOrigin: "left"
                }}
              >
                IZAJ
              </div>
            </Link>
          </div>

          {/* Right Section with Search, User, Notification, and Cart Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1/2">
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

            {/* Mobile Search Button */}
            <button 
              className="md:hidden text-black"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Icon icon="ic:outline-search" width="25" height="25" />
            </button>

            {/* Login/Signup Section with Icons */}
            <div className="flex items-center space-x-4">
              {/* User Icon or Account Dropdown */}
              {!user ? (
                <button
                  onClick={() => setIsModalOpen?.(true)}
                  className="text-black hover:text-orange-500 transition-colors duration-200"
                  aria-label="Login"
                >
                  <Icon icon="lucide:user" width="28" height="28" />
                </button>
              ) : (
                <div className="relative" ref={accountDropdownRef}>
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
                    <Icon
                      icon="lucide:user"
                      width="28"
                      height="28"
                      className="text-black hover:text-orange-500 transition-colors duration-200"
                    />
                    <div className="hidden md:flex flex-col ml-2 text-left">
                      <span
                        className="font-medium text-sm text-gray-500 leading-none"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "200" }}
                      >
                        Hello, {user?.firstName || 'Guest'}
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

                  {/* Account Dropdown - Adjusted for mobile */}
                  {isAccountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200 transform origin-top-right transition-all duration-200 ease-out">
                      <div className="py-1">
                        <Link
                          to="/my-profile"
                          className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50 hover:text-black transition-colors group"
                        >
                          <Icon icon="mdi:account-circle-outline" className="h-5 w-5 mr-3 text-black group-hover:text-black" />
                          My Account
                        </Link>
                       
                        <hr className="border-gray-200 my-1" />
                        <button
                          onClick={handleLogoutClick}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors group"
                        >
                          <Icon icon="mdi:logout" className="h-5 w-5 mr-3 text-red-400 group-hover:text-red-500" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Heart Icon */}
              <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                <FavoritesDropdown 
                  user={user} 
                  onOpenAuthModal={() => setIsModalOpen?.(true)}
                />
              </div>

              {/* Notification Icon */}
              <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                <NotificationDropdown 
                  user={user} 
                  onOpenAuthModal={() => setIsModalOpen?.(true)}
                />
              </div>

              {/* Cart Icon */}
              {user ? (
                <Link to="/cart" className="relative">
                  <Icon
                    icon="mdi:cart-outline"
                    className="text-black cursor-pointer hover:text-orange-500 w-7 h-7 translate-y-1"
                    width="28"
                    height="28"
                  />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => setIsModalOpen?.(true)}
                  className="text-black hover:text-orange-500 transition-colors duration-200"
                >
                  <Icon
                    icon="mdi:cart-outline"
                    width="28"
                    height="28"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Only visible when search icon is clicked */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-4 relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-black-500 pl-10 pr-4 py-2 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black rounded-full"
              autoFocus
            />
            <Icon 
              icon="ic:outline-search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              width="20"
              height="20"
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <Icon icon="mdi:close" width="20" height="20" />
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Modal Content */}
            <div
              ref={mobileMenuRef}
              className="md:hidden absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-xl"
            >
              {/* Top Bar with Close Button */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <div
                    className="text-3xl tracking-wide leading-tight font-regular"
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
                <button
                  className="text-black p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon icon="mdi:close" width="28" height="28" />
                </button>
              </div>
              {/* Navigation Menu - Scrollable */}
              <div className="h-[calc(100vh-64px)] overflow-y-auto">
                <nav className="px-4 py-6">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/"
                        className="flex items-center px-4 py-3 text-lg font-medium text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon icon="mdi:home-outline" className="mr-3 text-gray-600" width="24" height="24" />
                        HOME
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-black hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                        aria-controls="mobile-products-dropdown"
                      >
                        <div className="flex items-center">
                          <Icon icon="mdi:lightbulb-outline" className="mr-3 text-gray-600" width="24" height="24" />
                          PRODUCTS
                        </div>
                        <Icon
                          icon="mdi:chevron-down"
                          className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                          width="24"
                          height="24"
                        />
                      </button>
                      <div
                        id="mobile-products-dropdown"
                        className={`overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} bg-gray-50 rounded-lg mt-1 ml-8`}
                        style={{ borderLeft: isDropdownOpen ? '3px solid #f59e42' : '3px solid transparent' }}
                      >
                        <ul className="py-2">
                          <li>
                            <Link
                              to="/product-list"
                              className="block px-4 py-2 text-base text-gray-700 hover:text-black hover:bg-orange-100 rounded transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              All Lighting Fixtures
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/collection"
                              className="block px-4 py-2 text-base text-gray-700 hover:text-black hover:bg-orange-100 rounded transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              New Arrivals
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/sales"
                              className="block px-4 py-2 text-base text-gray-700 hover:text-black hover:bg-orange-100 rounded transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Special Offers
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="/collection"
                        className="flex items-center px-4 py-3 text-lg font-medium text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon icon="mdi:star-outline" className="mr-3 text-gray-600" width="24" height="24" />
                        NEW
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/sales"
                        className="flex items-center px-4 py-3 text-lg font-medium text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon icon="mdi:tag-outline" className="mr-3 text-gray-600" width="24" height="24" />
                        SALES
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/aboutus"
                        className="flex items-center px-4 py-3 text-lg font-medium text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon icon="mdi:information-outline" className="mr-3 text-gray-600" width="24" height="24" />
                        ABOUT US
                      </Link>
                    </li>
                  </ul>
                </nav>
                {/* Bottom Section */}
                <div className="px-4 py-6 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-sm text-gray-600">
                        Hello, {user.firstName}
                      </div>
                      <button
                        onClick={() => {
                          handleLogoutClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-3 text-lg font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Icon icon="mdi:logout" className="mr-3" width="24" height="24" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsModalOpen?.(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 text-lg font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    >
                      <Icon icon="mdi:login" className="mr-2" width="24" height="24" />
                      Login / Sign Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Desktop Navbar - Hidden on mobile */}
        <nav className="hidden md:block bg-white py-3">
          <ul className="flex justify-center space-x-10 text-sm font-medium">
            {/* HOME NAVIGATION - use onClick for SPA navigation */}
            <li>
              <a
                href="#home"
                className="text-black hover:border-b-2 border-black pb-1"
                onClick={handleHomeClick}
              >
                HOME
              </a>
            </li>

            {/* Products Dropdown Menu */}
            <li className="relative group" ref={productsDropdownRef}>
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
                           >
                          LIGHTING FIXTURES
                        </h3>
                        <ul>
                          <li className="mb-3">
                            <Link 
                              to="/product-list" 
                              state={user ? { user } : undefined}
                              className="flex items-center group"
                            >
                              <Icon icon="mdi:lightbulb-outline" className="mr-2 text-gray-600 group-hover:text-orange-500" width="22" height="22" />
                              <span className="group-hover:text-orange-500 group-hover:translate-x-1 transition-transform duration-200">
                                All Lighting Fixtures 
                              </span>
                            </Link>
                          </li>
                          <li className="mb-3">
                            <Link to="/collection" className="flex items-center group">
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
                            >
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
                            >
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
              <Link to="/collection" className="text-black hover:border-b-2 border-black pb-1">
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
    </>
  );
};

export default Header;