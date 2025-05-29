import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import FavoritesDropdown from './FavoritesDropdown';
import NotificationDropdown from './NotificationDropdown';

type Product = {
  description: string;
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
};

const ProductList: React.FC = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarDropdownOpen, setSidebarDropdownOpen] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Daniel',
    email: 'daniel@example.com',
  });
  
  // State for sorting and filtering
  const [sortOption, setSortOption] = useState<string>('Alphabetical, A-Z');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Mock product data - in a real app, this would come from an API
  useEffect(() => {
    const mockProducts: Product[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      name: `Aberdeen | Modern LED Chandelier ${i + 1}`,
      description: `This is a description for product ${i + 1}.`,
      price: i % 3 === 0 ? 15995 : 16995,
      originalPrice: i % 3 === 0 ? 16995 : undefined,
      rating: 4,
      reviewCount: 18,
      image: "/aber.webp",
      isNew: i % 4 === 0,
      isOnSale: i % 3 === 0
    }));
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);
    
    let sortedProducts = [...filteredProducts];
    
    switch(option) {
      case 'Alphabetical, A-Z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Alphabetical, Z-A':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Price, Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price, High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setFilteredProducts(sortedProducts);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Updated Header from cart.tsx */}
      <header className="bg-white px-10 py-3 flex flex-col ">
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
                  {/* FavoritesDropdown and NotificationDropdown for not logged in */}
                  <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                    <FavoritesDropdown user={user} />
                  </div>
                  <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                    <NotificationDropdown user={user} />
                  </div>
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
                  {/* User Dropdown */}
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

                    {isAccountDropdownOpen && (user) && (
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
                  {/* FavoritesDropdown and NotificationDropdown for logged in */}
                  <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                    <FavoritesDropdown user={user} />
                  </div>
                  <div className="flex items-center justify-center" style={{ marginTop: "4px" }}>
                    <NotificationDropdown user={user} />
                  </div>
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

        {/* Navigation */}
        <nav className="bg-white py-3">
          <ul className="flex justify-center space-x-10 text-sm font-medium">
            <li><Link to="/" className="text-black hover:border-b-2 border-black pb-1">HOME</Link></li>
               {/* Products Dropdown Menu */}
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
                     transform: "translateX(-44%)", // Center the dropdown horizontally
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
            <li><Link to="/new" className="text-black hover:border-b-2 border-black pb-1">NEW</Link></li>
            <li><Link to="/sales" className="text-black hover:border-b-2 border-black pb-1">SALES</Link></li>
            <li><Link to="/aboutus" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</Link></li>
          </ul>
        </nav>
      </header>
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
         <aside className="w-1/5 p-6 border-r">
                <h3 className="font-bold text-black mb-4">SHOP</h3>
                <ul className="space-y-2 text-sm text-black">
                  <li className="font-bold flex items-center justify-between cursor-pointer select-none" onClick={() => setSidebarDropdownOpen(v => !v)}>
                    <span>All Lighting Fixtures</span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`ml-2 transition-transform duration-200 ${sidebarDropdownOpen ? "rotate-180" : ""}`}
                      width="20"
                      height="20"
                    />
                  </li>
                  {sidebarDropdownOpen && (
                    <ul className="pl-4 space-y-1">
                      <li className="hover:underline cursor-pointer">Ceiling Lights</li>
                      <li className="hover:underline cursor-pointer">Semi Flush Mounted Lights</li>
                      <li className="hover:underline cursor-pointer">Chandelier</li>
                      <li className="hover:underline cursor-pointer">Cluster Chandelier</li>
                      <li className="hover:underline cursor-pointer">Pendant Lights</li>
                      <li className="hover:underline cursor-pointer">Floor Lamps</li>
                      <li className="hover:underline cursor-pointer">Table Lamps</li>
                      <li className="hover:underline cursor-pointer">Rechargeable Table Lamps</li>
                      <li className="hover:underline cursor-pointer">Wall Lights</li>
                      <li className="hover:underline cursor-pointer">Painting & Bathroom Lights</li>
                    </ul>
                  )}
                </ul>
              </aside>

        {/* Product List */}
        <main className="w-4/5 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black mb-3" style={{ fontFamily: "'Poppins', serif" }}>All Lighting Fixtures</h1>
            
            {/* Banner with overlay text */}
            <div className="relative mb-6">
              <img src="/banner2.jpg" alt="Banner" className="w-full h-56 object-cover rounded-md shadow-sm" />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-start p-8 rounded-md">
                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Elevate Your Space</h2>
                <p className="text-white text-lg mb-3">Premium lighting solutions for every room</p>
                <button className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-black hover:text-white transition-all duration-300">
                  Explore Collection
                </button>
              </div>
            </div>
            
            {/* Filter and Sort Controls - Now Functional */}
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-md">
              <div>
                <label htmlFor="sort" className="mr-2 text-sm text-gray-700">Sort by:</label>
                <select 
                  id="sort" 
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border text-sm px-3 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                >
                  <option>Alphabetical, A-Z</option>
                  <option>Alphabetical, Z-A</option>
                  <option>Price, Low to High</option>
                  <option>Price, High to Low</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
                <div className="flex">
                  <button 
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-1.5 border border-r-0 rounded-l-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                    title="Grid view"
                  >
                    <Icon icon="mdi:grid" width="16" height="16" />
                  </button>
                  <button 
                    onClick={() => handleViewModeChange('list')}
                    className={`p-1.5 border rounded-r-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                    title="List view"
                  >
                    <Icon icon="mdi:format-list-bulleted" width="16" height="16" />
                  </button>
                </div>
              </div>
            </div>
          </div>

         {/* Product Grid - Enhanced Design */}
{viewMode === 'grid' ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {filteredProducts.map((product) => (
      <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
        <div className="relative">
          <div className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          </div>
          
         {/* Badges directly in image */}
         {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
              SALE
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
              NEW
            </div>
          )}
          
          {/* Quick Action Buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
            <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300 transform hover:scale-110 shadow-md">
              <Icon icon="mdi:magnify" width="18" height="18" />
            </button>
            <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300 transform hover:scale-110 shadow-md">
              <Icon icon="mdi:heart-outline" width="18" height="18" />
            </button>
            <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300 transform hover:scale-110 shadow-md">
              <Icon icon="mdi:cart-outline" width="18" height="18" />
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i} 
                  icon={i < Math.floor(product.rating) ? "mdi:star" : i < product.rating ? "mdi:star-half" : "mdi:star-outline"} 
                  width="14" 
                  height="14" 
                  className="text-yellow-400" 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2 font-medium">({product.reviewCount})</span>
          </div>
          
          <h3 className="text-sm font-bold text-gray-800 mt-1 group-hover:text-orange-600 transition-colors">{product.name}</h3>
          
          {product.isOnSale ? (
            <div className="mt-2 flex items-baseline space-x-2">
              <p className="text-orange-600 text-lg font-bold">₱{product.price.toLocaleString()}</p>
              <p className="text-gray-400 text-sm line-through">₱{product.originalPrice?.toLocaleString()}</p>
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">
                {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
              </span>
            </div>
          ) : (
            <p className="text-orange-600 text-lg font-bold mt-2">₱{product.price.toLocaleString()}</p>
          )}
          
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">Available for Inquiry</p>
          
          <button className="mt-4 w-full py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2 group">
            <span>CHOOSE OPTIONS</span>
            <Icon icon="mdi:arrow-right" width="16" height="16" className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="space-y-6">
    {filteredProducts.map((product) => (
      <div key={product.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="sm:w-1/3 md:w-1/4 relative group overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 sm:h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Badge Container */}
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
              SALE
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
              NEW
            </div>
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-300">
            <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300">
              <Icon icon="mdi:magnify" width="16" height="16" />
            </button>
          </div>
        </div>
        
        <div className="sm:w-2/3 md:w-3/4 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800 hover:text-orange-600 transition-colors cursor-pointer">{product.name}</h3>
              
              <div className="flex items-center my-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i} 
                      icon={i < Math.floor(product.rating) ? "mdi:star" : i < product.rating ? "mdi:star-half" : "mdi:star-outline"} 
                      width="16" 
                      height="16" 
                      className="text-yellow-400" 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="mt-3 md:mt-0">
              {product.isOnSale ? (
                <div className="flex items-center space-x-2">
                  <p className="text-orange-600 text-2xl font-bold">₱{product.price.toLocaleString()}</p>
                  <div className="flex flex-col items-end">
                    <p className="text-gray-400 text-sm line-through">₱{product.originalPrice?.toLocaleString()}</p>
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">
                      {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-orange-600 text-2xl font-bold">₱{product.price.toLocaleString()}</p>
              )}
            </div>
          </div>
          
          <div className="h-px bg-gray-100 my-4"></div>
          
          <p className="text-gray-600 text-sm mb-5">
            {product.description || "This premium product offers exceptional quality and value. Perfect for those who appreciate fine craftsmanship and attention to detail."}
          </p>
          
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="px-6 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2 group">
              <Icon icon="mdi:eye-outline" width="18" height="18" />
              <span>VIEW DETAILS</span>
            </button>
            
            <button className="px-6 py-2.5 border-2 border-gray-800 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
              <Icon icon="mdi:cart-outline" width="18" height="18" />
              <span>ADD TO CART</span>
            </button>
            
            <button className="p-2.5 border-2 border-gray-200 text-gray-500 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors duration-300">
              <Icon icon="mdi:heart-outline" width="18" height="18" />
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:truck-delivery-outline" width="16" height="16" />
              <span>Free shipping on orders over ₱1,000</span>
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-1">
            <button className="px-3 py-1.5 border rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <Icon icon="mdi:chevron-left" width="16" height="16" />
            </button>
            <button className="px-3 py-1.5 border rounded-md bg-black text-white">1</button>
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-100 transition-colors">2</button>
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-100 transition-colors">3</button>
            <span className="px-3 py-1.5">...</span>
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-100 transition-colors">10</button>
            <button className="px-3 py-1.5 border rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <Icon icon="mdi:chevron-right" width="16" height="16" />
            </button>
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
