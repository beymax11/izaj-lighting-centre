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
  size?: string;
  colors?: string[];
};

interface CollectionProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const Collection: React.FC<CollectionProps> = ({ user }) => {

  const [sortOption, setSortOption] = useState<string>('Alphabetical, A-Z');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sidebarDropdownOpen, setSidebarDropdownOpen] = useState(true);
  const [architecturalDropdownOpen, setArchitecturalDropdownOpen] = useState(false);
  const [mirrorsDropdownOpen, setMirrorsDropdownOpen] = useState(false);
  const [fansDropdownOpen, setFansDropdownOpen] = useState(false);
  const [] = useState(0);
  const [, setDeals] = useState<{ id: number; title: string; oldPrice: string; newPrice: string; discount: string; image: string }[]>([]);
  
  // New state variables for Recently Viewed section
  const [isCarousel, setIsCarousel] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectCategoryOpen, setSelectCategoryOpen] = useState(true);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      setSlideDirection('left');
      setCurrentPage(prev => prev + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setSlideDirection('right');
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleColorSelect = (productId: number, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setSlideDirection('right');
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setSlideDirection('left');
      setCurrentPage(currentPage + 1);
    }
  };

  // Check for mobile view
  useEffect(() => {
    const checkDevice = () => {
      setIsCarousel(window.innerWidth <= 1024);
      if (window.innerWidth <= 640) {
        setProductsPerPage(2);
      } else if (window.innerWidth <= 1024) {
        setProductsPerPage(3);
      } else {
        setProductsPerPage(5);
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Sample product data for Recently Viewed
  const allProducts = [
    {
      id: 1,
      name: "Abednego | Chandelier/Large",
      price: "₱32,995",
      image: "/public/abed.webp",
      colors: ["black", "gold", "silver"]
    },
    {
      id: 2,
      name: "Aberdeen | Modern LED Chandelier",
      price: "₱25,464",
      image: "/public/aber.webp",
      colors: ["black", "gold"]
    },
    {
      id: 3,
      name: "Acadia | Table Lamp",
      price: "₱12,234",
      image: "/public/acad.webp",
      colors: ["black"]
    },
    {
      id: 4,
      name: "Ademar | Modern Chandelier",
      price: "₱11,237",
      image: "/public/mar.webp",
      colors: ["black"]
    },
    {
      id: 5,
      name: "Aeris | Modern Pendant Light",
      price: "₱9,435",
      image: "/public/aeris.webp",
      colors: ["black"]
    }
  ];

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

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
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Abednego | Chandelier/Large",
        description: "A stunning large chandelier that adds elegance to any space.",
        price: 32995,
        rating: 4,
        reviewCount: 18,
        image: "/public/abed.webp",
        colors: ["black", "gold", "silver"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 2,
        name: "Aberdeen | Modern LED Chandelier",
        description: "Modern LED chandelier with contemporary design.",
        price: 25464,
        rating: 4,
        reviewCount: 15,
        image: "/public/aber.webp",
        colors: ["black", "gold"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 3,
        name: "Acadia | Table Lamp",
        description: "Elegant table lamp perfect for any room.",
        price: 12234,
        rating: 4,
        reviewCount: 12,
        image: "/public/acad.webp",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 4,
        name: "Ademar | Modern Chandelier",
        description: "Modern chandelier with unique design elements.",
        price: 11237,
        rating: 4,
        reviewCount: 10,
        image: "/public/mar.webp",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 5,
        name: "Aeris | Modern Pendant Light",
        description: "Contemporary pendant light for modern spaces.",
        price: 9435,
        rating: 4,
        reviewCount: 8,
        image: "/public/aeris.webp",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 6,
        name: "Aina | Modern LED Chandelier",
        description: "Stunning LED chandelier with modern aesthetics.",
        price: 29995,
        rating: 4,
        reviewCount: 20,
        image: "/public/aina.webp",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 7,
        name: "Alabama | Table Lamp",
        description: "Classic table lamp with modern touches.",
        price: 27995,
        rating: 4,
        reviewCount: 16,
        image: "/public/alab.webp",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 8,
        name: "Alphius | Surface Mounted Downlight",
        description: "Efficient surface mounted downlight for any space.",
        price: 25995,
        rating: 4,
        reviewCount: 14,
        image: "/public/alph.webp",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 9,
        name: "Altair | Modern LED Chandelier",
        description: "Contemporary LED chandelier with unique design.",
        price: 23995,
        rating: 4,
        reviewCount: 13,
        image: "/public/alta.jpg",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      },
      {
        id: 10,
        name: "Amalfi | Boho Rattan Soliya Pendant Lamp",
        description: "Bohemian style pendant lamp with rattan details.",
        price: 21995,
        rating: 4,
        reviewCount: 11,
        image: "/public/ama.webp",
        colors: ["black"],
        isOnSale: false,
        isNew: true
      }
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    setSortModalOpen(false);
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
    <div className="bg-white min-h-screen px-4 sm:px-8 md:px-16 lg:px-24">
      <style>
        {`
          @media (max-width: 767px) {
            .mobile-hide { display: none !important; }
            .mobile-center-main { margin-left: auto !important; margin-right: auto !important; float: none !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
          }
          @keyframes slideInLeft {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInRight {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .slide-container {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .animate-fadeIn { animation: fadeIn 0.2s ease; }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;     /* Firefox */
          }
        `}
      </style>

      {/* Breadcrumb - hidden on screens below lg (1024px) */}
      <div className="hidden lg:block text-xs sm:text-sm text-black mb-4 sm:mb-6 pt-4 sm:pt-6">
        <a href="/" className="hover:underline">Home</a>
        <Icon icon="mdi:chevron-right" width="16" height="16" className="mx-1 inline-block align-middle" />
        <span>New </span>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="hidden lg:block w-full lg:w-1/6 p-0 sm:p-4 lg:p-6 lg:pl-12 lg:pr-4 mobile-hide">
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
        <main className="w-full lg:w-5/6 p-0 sm:p-4 md:px-8 lg:px-12 mobile-center-main">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col items-start mb-4 sm:mb-6 mt-6 mb-6 sm:mt-0 sm:mb-6">
              <h1 className="text-2xl sm:text-2xl font-extrabold text-black" style={{ fontFamily: 'Avenir Next, sans-serif' }}>Fresh Drops</h1>
              <h2 className="text-sm sm:text-base font-medium text-black mt-4" style={{ fontFamily: 'Avenir Next, sans-serif' }}>
                Ready to ship Fresh new items!
              </h2>
            </div>
            
            {/* Filter and Sort Controls - Now Functional */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 p-2 sm:p-4 rounded-md gap-2 sm:gap-0">
              {/* Left: Product count (desktop only, hidden on lg and below) */}
              <span className="hidden lg:inline text-xs sm:text-sm text-black">{filteredProducts.length} products</span>
              {/* Mobile: Filter, Sort by, Grid/List view arrangement */}
              {isCarousel ? (
                <div className="flex w-full items-center justify-between">
                  {/* Left: Filter button */}
                  <button
                    type="button"
                    className="inline-flex items-center text-xs text-black focus:outline-none"
                    onClick={() => setFilterDrawerOpen(true)}
                  >
                    <Icon icon="mdi:filter-variant" width="18" height="18" className="mr-1" />
                    Filter
                  </button>
                  {/* Center: Sort by button */}
                  <div className="flex-1 flex justify-center">
                    <button
                      id="sortby-btn"
                      onClick={() => setSortModalOpen(v => !v)}
                      className="flex items-center text-xs text-black px-0 py-0 bg-transparent hover:underline focus:outline-none"
                    >
                      <span className="mr-1">Sort by</span>
                      <Icon icon="mdi:chevron-down" width="18" height="18" />
                    </button>
                  </div>
                  {/* Right: Grid/List view buttons */}
                  <div className="flex ml-2">
                    <button 
                      onClick={() => handleViewModeChange('grid')}
                      className={`p-1 border border-r-0 rounded-l-md ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                      title="Grid view"
                    >
                      <Icon icon="mdi:grid" width="16" height="16" />
                    </button>
                    <button 
                      onClick={() => handleViewModeChange('list')}
                      className={`p-1 border rounded-r-md ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                      title="List view"
                    >
                      <Icon icon="mdi:format-list-bulleted" width="16" height="16" />
                    </button>
                  </div>
                </div>
              ) : (
                // Desktop: unchanged
                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end ml-auto">
                  {/* Desktop: native select for Sort by */}
                  <select
                    value={sortOption}
                    onChange={e => handleSortChange(e.target.value)}
                    className="hidden sm:inline-block text-xs sm:text-sm text-black px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black bg-white mr-2"
                  >
                    <option value="Alphabetical, A-Z">Alphabetical, A-Z</option>
                    <option value="Alphabetical, Z-A">Alphabetical, Z-A</option>
                    <option value="Price, Low to High">Price, Low to High</option>
                    <option value="Price, High to Low">Price, High to Low</option>
                  </select>
                  <div className="flex ml-2">
                    <button 
                      onClick={() => handleViewModeChange('grid')}
                      className={`p-1 border border-r-0 rounded-l-md ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                      title="Grid view"
                    >
                      <Icon icon="mdi:grid" width="16" height="16" />
                    </button>
                    <button 
                      onClick={() => handleViewModeChange('list')}
                      className={`p-1 border rounded-r-md ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                      title="List view"
                    >
                      <Icon icon="mdi:format-list-bulleted" width="16" height="16" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

         {/* Product Grid/List - Responsive Design */}
{viewMode === 'grid' ? (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {filteredProducts.map((product) => (
      <div key={product.id} className="bg-white overflow-hidden relative flex flex-col h-full max-w-sm mx-auto w-full">
        <div className="relative flex-grow">
          <img src={product.image} alt={product.name} className="w-full h-56 sm:h-80 object-cover" />
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-sm shadow-md z-10">
              NEW
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
          <div className="flex items-center space-x-2 mb-2 mt-2">
            {product.colors?.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(product.id, color)}
                className={`w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 transition-all duration-200 ${
                  selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                }`}
                style={{ backgroundColor: color }}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
              />
            ))}
          </div>
          <p className="font-bold text-gray-800 mt-auto text-sm sm:text-base">₱{product.price.toLocaleString()}</p>
          <p className="text-green-600 text-xs mt-1">● In stock</p>
          <Link
            to={`/item-description/${product.id}`}
            state={user ? { user } : undefined}
            className="mt-3 sm:mt-4 w-full bg-black text-white py-1.5 sm:py-2 hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm text-center block"
          >
            Choose options
          </Link>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="space-y-6">
    {filteredProducts.map((product) => (
      isCarousel ? (
        <div key={product.id}
          className="flex flex-row bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 p-3 items-center space-x-4 transition-all duration-300"
        >
          {/* Image on the left */}
          <div className="w-24 h-24 flex-shrink-0 bg-white flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Details on the right */}
          <div className="flex-1 pl-2 flex flex-col justify-center min-w-0"> 
            <div>
              <h3 className="font-bold text-base mb-1 text-gray-900 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</h3>
              <p className="text-lg font-semibold text-gray-800 mb-1">₱{product.price.toLocaleString()}</p>
              <div className="flex items-center text-sm mb-3">
                <span className="w-2 h-2 rounded-full bg-gray-700 mr-2 inline-block"></span>
                <span className="text-green-600">In stock</span>
              </div>
            </div>
            <button
              className="w-full py-2 rounded bg-black text-white font-bold text-base mt-1"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Choose options
            </button>
            <button
              className="w-full py-2 rounded bg-[#F6D376] text-white font-bold text-base mt-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        <div key={product.id} className="bg-white overflow-hidden relative flex flex-col h-[420px] rounded-lg">
          <div className="relative flex-grow h-[280px]">
            <div className="w-full h-full bg-white flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
            </div>
          </div>
          <div className="p-3 sm:p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
            <div className="flex items-center space-x-2 mb-2 mt-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(product.id, color)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 transition-all duration-200 ${
                    selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </div>
            <p className="font-bold text-gray-800 mt-auto text-sm sm:text-base">{product.price}</p>
            <p className="text-green-600 text-xs mt-1 mb-3">● In stock</p>
            <Link
              to={`/item-description/${product.id}`}
              state={user ? { user } : undefined}
              className="mt-auto w-full bg-black text-white py-1.5 sm:py-2 hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm text-center block"
            >
              Choose options
            </Link>
          </div>
        </div>
      )
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
<div className="mt-12 sm:mt-16 px-0 sm:px-4">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    {/* Top Picks Card */}
    <div className="relative w-full h-48 sm:h-80 rounded-lg overflow-hidden">
      <img
        src="featured.jpg"
        alt="Top Picks"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6">
        <h3 className="text-lg sm:text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>TOP PICKS</h3>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>SHOP DESIGNER FAVORITES</p>
        <button className="mt-2 sm:mt-4 px-3 sm:px-6 py-1.5 sm:py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-xs sm:text-base" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
          SHOP NOW
        </button>
      </div>
    </div>

    {/* What's Hot Card */}
    <div className="relative w-full h-48 sm:h-80 rounded-lg overflow-hidden">
      <img
        src="featured.jpg"
        alt="What's Hot"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6">
        <h3 className="text-lg sm:text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>WHAT'S HOT?</h3>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
        <button className="mt-2 sm:mt-4 px-3 sm:px-6 py-1.5 sm:py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-xs sm:text-base" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
          SHOP NOW
        </button>
      </div>
    </div>
  </div>
</div>

 {/* RECENTLY VIEWED */}
 <section className="container mx-auto px-1 sm:px-2 md:px-4 lg:px-6 py-8 max-w-[98%] relative">
  <div className="flex justify-between items-baseline mb-6">
    <h2 className="text-lg md:text-xl text-black" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
      Recently Viewed
    </h2>
    <div className="flex-grow"></div>
    <Link
      to="/product-list"
      state={user ? { user } : undefined}
      className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
    >
      View all
    </Link>
  </div>

  <div 
    className="relative px-4 sm:px-12"
    onMouseEnter={() => setIsHoveringProducts(true)}
    onMouseLeave={() => setIsHoveringProducts(false)}
  >
    {/* Navigation Buttons - Hidden on mobile */}
    {!isCarousel && currentPage > 0 && (
      <button 
        onClick={handlePrevPage}
        className={`absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 z-10 shadow-lg ${
          isHoveringProducts ? 'opacity-90' : 'opacity-0'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )}
    {!isCarousel && currentPage < totalPages - 1 && (
      <button 
        onClick={handleNextPage}
        className={`absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 z-10 shadow-lg ${
          isHoveringProducts ? 'opacity-90' : 'opacity-0'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )}

    <div 
      className="relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {isCarousel ? (
        <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 px-1 -mx-1 hide-scrollbar">
          {allProducts.map((product) => {
            // Card width: 48vw for <=640px, 32vw for 641-1024px
            let cardWidth = '48vw';
            if (window.innerWidth > 640 && window.innerWidth <= 1024) cardWidth = '32vw';
            return (
              <div
                key={product.id}
                className="bg-white overflow-hidden flex flex-col h-[420px] rounded-lg"
                style={{ flex: `0 0 ${cardWidth}`, minWidth: cardWidth, maxWidth: '340px' }}
              >
                <div className="relative flex-shrink-0 h-[280px]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-800 text-xs line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2 mt-2">
                    {product.colors?.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(product.id, color)}
                        className={`w-3 h-3 border border-gray-300 transition-all duration-200 ${
                          selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: color }}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      />
                    ))}
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{product.price}</p>
                  <p className="text-green-600 text-xs mt-1">● In stock</p>
                  <div className="flex-grow"></div>
                  <Link
                    to={`/item-description/${product.id}`}
                    state={user ? { user } : undefined}
                    className="mt-auto w-full bg-black text-white py-1.5 hover:bg-gray-800 transition-colors duration-300 text-xs text-center block"
                  >
                    Choose options
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 sm:gap-6 justify-center transition-all duration-300 ease-out">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white overflow-hidden relative flex flex-col h-[420px] rounded-lg">
              <div className="relative flex-grow h-[280px]">
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                </div>
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                <div className="flex items-center space-x-2 mb-2 mt-2">
                  {product.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(product.id, color)}
                      className={`w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 transition-all duration-200 ${
                        selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
                <p className="font-bold text-gray-800 mt-auto text-sm sm:text-base">{product.price}</p>
                <p className="text-green-600 text-xs mt-1 mb-3">● In stock</p>
                <Link
                  to={`/item-description/${product.id}`}
                  state={user ? { user } : undefined}
                  className="mt-auto w-full bg-black text-white py-1.5 sm:py-2 hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm text-center block"
                >
                  Choose options
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</section>

        {sortModalOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-50"
              onClick={() => setSortModalOpen(false)}
            />
            {/* Bottom Sheet Modal */}
            <div
              id="sort-modal"
              className="fixed left-0 right-0 bottom-0 z-50 animate-slideUp bg-white shadow-2xl w-[100vw]"
              style={{
                minHeight: '50vh',
                maxHeight: '70vh',
                height: 'auto',
                overflowY: 'auto',
                transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b">
                <span className="text-base font-bold">Sort by</span>
                <button
                  className="text-2xl text-gray-500 hover:text-black"
                  onClick={() => setSortModalOpen(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col px-4 py-2">
                {['Alphabetical, A-Z', 'Alphabetical, Z-A', 'Price, Low to High', 'Price, High to Low'].map(option => (
                  <button
                    key={option}
                    onClick={() => handleSortChange(option)}
                    className={`block w-full text-left px-5 py-3 text-sm rounded-lg mb-1 hover:bg-gray-100 transition-colors ${
                      sortOption === option ? 'font-bold text-black bg-gray-100' : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <style>{`
              @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
              .animate-slideUp { animation: slideUp 0.25s cubic-bezier(0.4,0,0.2,1); }
            `}</style>
          </>
        )}

        {filterDrawerOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-50 sm:hidden"
              onClick={() => setFilterDrawerOpen(false)}
            />
            {/* Right Side Drawer */}
            <div
              className="fixed top-0 right-0 h-screen w-[95vw] bg-white z-50 animate-slideInRight sm:hidden shadow-2xl flex flex-col"
              style={{ transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)' }}
            >
              {/* Top Bar */}
              <div className="flex items-center px-4 pt-6 pb-4 border-b">
                <button
                  className="text-2xl text-gray-700 hover:text-black mr-4"
                  onClick={() => setFilterDrawerOpen(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Filters</span>
              </div>
              {/* Filter Content (scrollable) */}
              <div className="flex-1 overflow-y-auto px-4 pb-28 pt-4">
                <h3 className="font-bold text-black mb-4 text-lg">SHOP</h3>
                <div className="mb-4">
                  <button
                    className="w-full flex items-center justify-between font-bold text-black text-base mb-2 focus:outline-none"
                    onClick={() => setSelectCategoryOpen(v => !v)}
                  >
                    Select a category
                    <Icon icon={selectCategoryOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="ml-2 text-xl" />
                  </button>
                  {selectCategoryOpen && (
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
                  )}
                </div>
              </div>
              {/* Sticky View Results Button */}
              <div className="absolute bottom-0 left-0 w-full px-4 pb-6 pt-2 bg-white border-t flex justify-center">
                <button
                  className="w-full py-3 rounded-md font-bold text-base text-white"
                  style={{ background: '#F6D376' }}
                  onClick={() => setFilterDrawerOpen(false)}
                >
                  View results
                </button>
              </div>
            </div>
            <style>{`
              @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              .animate-slideInRight { animation: slideInRight 0.25s cubic-bezier(0.4,0,0.2,1); }
            `}</style>
          </>
        )}
      </div>
    );
};

export default Collection;