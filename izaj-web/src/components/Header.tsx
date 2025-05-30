import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import FavoritesDropdown from '../FavoritesDropdown';
import NotificationDropdown from '../NotificationDropdown';

interface HeaderProps {
  user: {
    name: string;
    email: string;
  } | null;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountDropdownOpen: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  setIsModalOpen,
  setIsAccountDropdownOpen,
  isAccountDropdownOpen,
  handleLogout
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close account dropdown when clicking outside
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
      
      // Close products dropdown when clicking outside
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsAccountDropdownOpen]);

  return (
    <header className="bg-white px-10 py-3 flex flex-col">
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
                  <div className="flex flex-col ml-2 text-left">
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
            )}

            {/* Heart Icon */}
            <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
              <FavoritesDropdown user={user} />
            </div>

            {/* Notification Icon */}
            <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
              <NotificationDropdown user={user} />
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
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white py-3">
        <ul className="flex justify-center space-x-10 text-sm font-medium">
          <li><a href="#home" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>

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
                          style={{ fontFamily: "'Playfair Display', serif" }}>
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
          <Link to="/aboutus" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 