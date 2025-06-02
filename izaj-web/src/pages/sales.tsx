import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

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

interface ProductListProps {
  user?: {
    name: string;
    email: string;
  } | null;
}

const Sales: React.FC<ProductListProps> = ({ user }) => {

  const [sortOption, setSortOption] = useState<string>('Alphabetical, A-Z');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sidebarDropdownOpen, setSidebarDropdownOpen] = useState(true);
  const [architecturalDropdownOpen, setArchitecturalDropdownOpen] = useState(false);
  const [mirrorsDropdownOpen, setMirrorsDropdownOpen] = useState(false);
  const [fansDropdownOpen, setFansDropdownOpen] = useState(false);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [deals, setDeals] = useState<{ id: number; title: string; oldPrice: string; newPrice: string; discount: string; image: string }[]>([]);

  // Sample deals data
  useEffect(() => {
    const sampleDeals = [
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
    
    setDeals(sampleDeals);
  }, []);

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
    setFilteredProducts(mockProducts.filter(product => product.isOnSale));
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


 {/* Main Content */}
  return (
    <div className="bg-white min-h-screen px-24">
      {/* Breadcrumb */}
      <div className="text-sm text-black mb-6 pt-6">
        <a href="/" className="hover:underline">Home</a>
        <Icon icon="mdi:chevron-right" width="16" height="16" className="mx-1 inline-block align-middle" />
        <span>Sales</span>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/6 p-6 pl-12 pr-4">
          <h3 className="font-bold text-black mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm text-black">
            <li className="font-bold flex items-center justify-between cursor-pointer select-none" onClick={() => setSidebarDropdownOpen(v => !v)}>
              <span>Lighting Fixtures</span>
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

            <li className="font-bold flex items-center justify-between cursor-pointer select-none mt-4" onClick={() => setArchitecturalDropdownOpen(v => !v)}>
              <span>Architectural Lights</span>
              <Icon
                icon="mdi:chevron-down"
                className={`ml-2 transition-transform duration-200 ${architecturalDropdownOpen ? "rotate-180" : ""}`}
                width="20"
                height="20"
              />
            </li>
            {architecturalDropdownOpen && (
              <ul className="pl-4 space-y-1">
                <li className="hover:underline cursor-pointer">Track Lights</li>
                <li className="hover:underline cursor-pointer">Recessed Lights</li>
                <li className="hover:underline cursor-pointer">Spot Lights</li>
                <li className="hover:underline cursor-pointer">Strip Lights</li>
                <li className="hover:underline cursor-pointer">Emergency Lights</li>
              </ul>
            )}

            <li className="font-bold flex items-center justify-between cursor-pointer select-none mt-4" onClick={() => setMirrorsDropdownOpen(v => !v)}>
              <span>Mirrors</span>
              <Icon
                icon="mdi:chevron-down"
                className={`ml-2 transition-transform duration-200 ${mirrorsDropdownOpen ? "rotate-180" : ""}`}
                width="20"
                height="20"
              />
            </li>
            {mirrorsDropdownOpen && (
              <ul className="pl-4 space-y-1">
                <li className="hover:underline cursor-pointer">Bathroom Mirrors</li>
                <li className="hover:underline cursor-pointer">Wall Mirrors</li>
                <li className="hover:underline cursor-pointer">LED Mirrors</li>
                <li className="hover:underline cursor-pointer">Decorative Mirrors</li>
              </ul>
            )}

            <li className="font-bold flex items-center justify-between cursor-pointer select-none mt-4" onClick={() => setFansDropdownOpen(v => !v)}>
              <span>Ceiling Fans</span>
              <Icon
                icon="mdi:chevron-down"
                className={`ml-2 transition-transform duration-200 ${fansDropdownOpen ? "rotate-180" : ""}`}
                width="20"
                height="20"
              />
            </li>
            {fansDropdownOpen && (
              <ul className="pl-4 space-y-1">
                <li className="hover:underline cursor-pointer">Standard Fans</li>
                <li className="hover:underline cursor-pointer">DC Fans</li>
                <li className="hover:underline cursor-pointer">Industrial Fans</li>
                <li className="hover:underline cursor-pointer">Outdoor Fans</li>
              </ul>
            )}
          </ul>
        </aside>

        {/* Product List */}
        <main className="w-5/6 p-6 px-24">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black mb-3" style={{ fontFamily: "'Poppins', serif" }}>Monthly Deals</h1>
            
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
                <label htmlFor="sort" className="mr-2 text-sm text-black">Sort by:</label>
                <select 
                  id="sort" 
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border text-sm px-3 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none text-black"
                >
                  <option>Alphabetical, A-Z</option>
                  <option>Alphabetical, Z-A</option>
                  <option>Price, Low to High</option>
                  <option>Price, High to Low</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-black">{filteredProducts.length} products</span>
                <div className="flex">
                  <button 
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-1.5 border border-r-0 rounded-l-md ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                    title="Grid view"
                  >
                    <Icon icon="mdi:grid" width="16" height="16" />
                  </button>
                  <button 
                    onClick={() => handleViewModeChange('list')}
                    className={`p-1.5 border rounded-r-md ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <p className="text-black text-lg font-bold">₱{product.price.toLocaleString()}</p>
              <p className="text-gray-400 text-sm line-through">₱{product.originalPrice?.toLocaleString()}</p>
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">
                {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
              </span>
            </div>
          ) : (
            <p className="text-black text-lg font-bold mt-2">₱{product.price.toLocaleString()}</p>
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
                  <p className="text-black text-2xl font-bold">₱{product.price.toLocaleString()}</p>
                  <div className="flex flex-col items-end">
                    <p className="text-gray-400 text-sm line-through">₱{product.originalPrice?.toLocaleString()}</p>
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">
                      {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-black text-2xl font-bold">₱{product.price.toLocaleString()}</p>
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
 <div className="mt-16 px-16 mx-16">
          {/* Title */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-black text-left" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
              RECENTLY VIEWED
            </h2>
            <Link
              to="/product-list"
              state={user ? { user } : undefined}
              className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
            >
              View all
            </Link>
          </div>
          
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
                      RECENTLY VIEWED
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
                      RECENTLY VIEWED
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
                <Icon icon="mdi:chevron-left" className="h-6 w-6 text-gray-600" width="24" height="24" />
              </button>
            )}

            {currentDealIndex === 0 && (
              <button
                onClick={() => setCurrentDealIndex(1)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
                style={{ zIndex: 10 }}
              >
                <Icon icon="mdi:chevron-right" className="h-6 w-6 text-gray-600" width="24" height="24" />
              </button>
            )}
          </div>
        </div>

    </div>

  );
};

export default Sales;