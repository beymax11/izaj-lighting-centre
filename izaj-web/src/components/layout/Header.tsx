"use client";
// Capitalize first letter of each name
function capitalize(str: string) {
    if (!str) return '';
    return str.split(' ').map(name => 
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    ).join(' ');
  }
  import React, { useState, useEffect, useRef } from 'react';
  import Link from 'next/link';
  import { useRouter } from 'next/navigation';
  import { Icon } from '@iconify/react';
  import FavoritesDropdown from '../common/FavoritesDropdown';
  import NotificationDropdown from '../common/NotificationDropdown';
  import LoginModal from '../common/LoginModal';
  import { useUserContext } from '../../context/UserContext';
  import { useCartContext } from '../../context/CartContext';
  
  interface User {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  interface HeaderProps {
    user?: User | null;
    setIsAccountDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isAccountDropdownOpen?: boolean;
    handleLogout?: () => void;
    setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  }
  
  const Header: React.FC<HeaderProps> = ({
    user: propUser,
    setIsAccountDropdownOpen: propSetIsAccountDropdownOpen,
    isAccountDropdownOpen: propIsAccountDropdownOpen,
    handleLogout: propHandleLogout,
    setUser: propSetUser
  }) => {
    // Use UserContext as primary source, props as fallback
    const { user: contextUser, logout: contextLogout } = useUserContext();
    const { cart } = useCartContext();
    const user = propUser !== undefined ? propUser : contextUser;
    const handleLogout = propHandleLogout || contextLogout;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const accountDropdownRef = useRef<HTMLDivElement>(null);
    const productsDropdownRef = useRef<HTMLLIElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const cartIconRef = useRef<HTMLAnchorElement>(null);
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);
  
    // Compute mobile breakpoint on client only to avoid SSR hydration mismatch
    useEffect(() => {
      setIsClient(true);
      const updateIsMobile = () => {
        setIsMobile(window.innerWidth <= 767);
      };
      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);
      return () => window.removeEventListener('resize', updateIsMobile);
    }, []);
  
  
  
    const handleLogoutClick = () => {
      // Clear auth token but keep user data
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      
      // Call the logout handler
      handleLogout();
      
      // Close the dropdown
      setIsAccountDropdownOpen(false);
      
      // Navigate to home page
      router.push('/');
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
      router.push('/');
    };
  
    return (
      <>
        <div className="bg-black text-white text-center py-2 md:py-3 flex items-center justify-center w-full" style={{ height: undefined, minHeight: '30px', zIndex: 100 }}>
          <p className="text-xs md:text-sm px-2 md:px-4 truncate whitespace-nowrap overflow-x-auto w-full">
            Monthly Sale is here! &rarr; Enjoy 10% OFF items for the month of June
          </p>
        </div>
  
        <header className="bg-white px-4 lg:px-10 py-3 flex flex-col">
             {/* Top Header Row */}
             <div className="flex items-center justify-between w-full">
            {/* Mobile Menu Button and Logo Container */}
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden text-black"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Icon icon="mdi:menu" width="28" height="28" />
              </button>
  
              {/* Logo */}
              <Link href="/" className="flex flex-col items-start flex-shrink-0 w-full">
                <div
                  className="text-3xl lg:text-6xl tracking-wide flex-shrink-0 leading-tight font-regular"
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
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Search Bar - Hidden on mobile */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl">
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
                className="lg:hidden text-black"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Icon icon="ic:outline-search" width="25" height="25" />
              </button>
  
              {/* Login/Signup Section with Icons */}
              <div className="flex items-center space-x-4">
                {/* User Icon or Account Dropdown */}
                {!isClient ? (
                  // Server-side rendering: always show the login button to avoid hydration mismatch
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-black hover:text-orange-500 transition-colors duration-200"
                    aria-label="Login"
                  >
                    <Icon icon="lucide:user" width="28" height="28" />
                  </button>
                ) : (
                  // Client-side rendering: use mobile detection and user state
                  isMobile ? (
                    <button
                      onClick={() => {
                        if (user) {
                          router.push('/account');
                        } else {
                          setIsLoginModalOpen(true);
                        }
                      }}
                      className="text-black hover:text-orange-500 transition-colors duration-200"
                      aria-label="User"
                    >
                      <Icon icon="lucide:user" width="28" height="28" />
                    </button>
                  ) : (
                    !user ? (
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
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
                              Hello, {user ? `${capitalize((user.firstName || '').split(' ')[0])}` : 'Guest'}
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
                                href="/account"
                                className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50 hover:text-black transition-colors group"
                                onClick={() => setIsAccountDropdownOpen(false)}
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
                    )
                  )
                )}
  
                {/* Heart Icon */}
                <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                  {!isClient ? (
                    // Server-side rendering: always show the favorites dropdown to avoid hydration mismatch
                    <FavoritesDropdown 
                      user={null} 
                      onOpenAuthModal={() => setIsLoginModalOpen(true)}
                    />
                  ) : (
                    // Client-side rendering: use mobile detection
                    isMobile ? (
                      <button
                        onClick={() => {
                          if (user) {
                            router.push('/favorites');
                        } else {
                          setIsLoginModalOpen(true);
                        }
                        }}
                        className="text-black hover:text-orange-500 transition-colors duration-200"
                        aria-label="Favorites"
                        id="favorites-icon"
                      >
                        <Icon icon="mdi:heart-outline" width="28" height="28" />
                      </button>
                    ) : (
                      <FavoritesDropdown 
                        user={user} 
                        onOpenAuthModal={() => setIsLoginModalOpen(true)}
                      />
                    )
                  )}
                </div>
  
                {/* Notification Icon */}
                <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                  <NotificationDropdown 
                    user={!isClient ? null : user} 
                    onOpenAuthModal={() => setIsLoginModalOpen(true)}
                  />
                </div>
  
                {/* Cart Icon */}
                {!isClient ? (
                  // Server-side rendering: always show the login button to avoid hydration mismatch
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-black hover:text-orange-500 transition-colors duration-200"
                  >
                    <Icon
                      icon="mdi:cart-outline"
                      width="28"
                      height="28"
                    />
                  </button>
                ) : (
                  // Client-side rendering: use user state
                  user ? (
                    <Link href="/cart" className="relative" ref={cartIconRef} id="cart-icon">
                      <Icon
                        icon="mdi:cart-outline"
                        className="text-black cursor-pointer hover:text-orange-500 w-7 h-7 translate-y-1"
                        width="28"
                        height="28"
                      />
                      {cart.totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {cart.totalItems}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="text-black hover:text-orange-500 transition-colors duration-200"
                    >
                      <Icon
                        icon="mdi:cart-outline"
                        width="28"
                        height="28"
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
  
          {/* Mobile Search Bar - Only visible when search icon is clicked */}
          {isMobileSearchOpen && (
            <div className="lg:hidden mt-4 relative">
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
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Modal Content */}
              <div
                ref={mobileMenuRef}
                className="lg:hidden fixed left-0 top-0 w-[85%] max-w-sm h-screen bg-white z-50 shadow-xl overflow-y-auto"
              >
                {/* Top Bar with Close Button */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                  <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
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
                <div className="h-auto">
                  <nav className="px-4 py-6">
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="/"
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
                                href="/product-list"
                                className="block px-4 py-2 text-base text-gray-700 hover:text-black hover:bg-orange-100 rounded transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                All Lighting Fixtures
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/collection"
                                className="block px-4 py-2 text-base text-gray-700 hover:text-black hover:bg-orange-100 rounded transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                New Arrivals
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/sales"
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
                          href="/collection"
                          className="flex items-center px-4 py-3 text-lg font-medium text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon icon="mdi:star-outline" className="mr-3 text-gray-600" width="24" height="24" />
                          NEW
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/sales"
                          className="flex items-center px-4 py-3 text-lg font-medium text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon icon="mdi:tag-outline" className="mr-3 text-gray-600" width="24" height="24" />
                          SALES
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/aboutus"
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
                          Hello, {user ? `${capitalize((user.firstName || '').split(' ')[0])}` : 'Guest'}
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
                          setIsLoginModalOpen(true);
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
          <nav className="hidden lg:block bg-white py-3">
            <ul className="flex justify-center items-center space-x-10 text-sm font-medium">
              {/* HOME NAVIGATION - use onClick for SPA navigation */}
              <li className="flex items-center h-full">
                <a
                  href="#home"
                  className="text-black hover:border-b-2 border-black pb-1 flex items-center h-full"
                  onClick={handleHomeClick}
                  style={{height: '100%'}}>
                  HOME
                </a>
              </li>
  
              {/* Products Dropdown Menu */}
              <li className="relative group flex items-center h-full" ref={productsDropdownRef}>
                <div
                  className="text-black font-medium text-sm hover:border-b-2 border-black pb-1 flex items-center justify-between cursor-pointer transition-all duration-300 h-full"
                  style={{
                    transform: isDropdownOpen ? "translateY(-2px)" : "translateY(0)",
                    color: isDropdownOpen ? "#4B0082" : "black",
                    height: '100%'
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
                                href="/product-list" 
                                className="flex items-center group"
                              >
                                <Icon icon="mdi:lightbulb-outline" className="mr-2 text-gray-600 group-hover:text-orange-500" width="22" height="22" />
                                <span className="group-hover:text-orange-500 group-hover:translate-x-1 transition-transform duration-200">
                                  All Lighting Fixtures 
                                </span>
                              </Link>
                            </li>
                            <li className="mb-3">
                              <Link href="/collection" className="flex items-center group">
                                <Icon icon="mdi:star-circle-outline" className="mr-2 text-gray-600 group-hover:text-orange-500" width="22" height="22" />
                                <span className="group-hover:text-orange-500 group-hover:translate-x-1 transition-transform duration-200">
                                  New Arrivals
                                </span>
                              </Link>
                            </li>
                            <li className="mb-3">
                              <Link href="/sales" className="flex items-center group">
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
                                <img src="/ceiling.avif" alt="Ceiling Lights" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                              </div>
                              <p className="text-sm font-medium">Ceiling Lights</p>
                            </div>
                            <div className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-lg mb-2">
                                <img src="/chandelier.avif" alt="Chandeliers" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                              </div>
                              <p className="text-sm font-medium">Chandeliers</p>
                            </div>
                            <div className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-lg mb-2">
                                <img src="/pendant.avif" alt="Pendant Lights" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                              </div>
                              <p className="text-sm font-medium">Pendant Lights</p>
                            </div>
                            <div className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-lg mb-2">
                                <img src="/wall.avif" alt="Wall Lights" className="w-full h-24 object-cover group-hover:scale-110 transition-all duration-300" />
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
                            <p className="text-xs text-gray-500">Within San Pablo City Area</p>
                          </div>
                          <Link 
                            href="/sales" 
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
              <li className="flex items-center h-full">
                <Link href="/collection" className="text-black hover:border-b-2 border-black pb-1 flex items-center h-full">
                  NEW
                </Link>
              </li>
              <li className="flex items-center h-full">
                <Link href="/sales" className="text-black hover:border-b-2 border-black pb-1 flex items-center h-full">
                  SALES
                </Link>
              </li>
              <li className="flex items-center h-full">
                <Link href="/aboutus" className="text-black hover:border-b-2 border-black pb-1 flex items-center h-full">ABOUT US</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Login Modal */}
        <LoginModal 
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </>
    );
  };
  
  export { Header };