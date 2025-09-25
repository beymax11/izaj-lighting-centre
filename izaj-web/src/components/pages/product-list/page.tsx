"use client";

import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import ProductListSidebar from './ProductListSidebar';
import ProductListMain from './ProductListMain';
import ProductListFeatured from './ProductListFeatured';
import ProductListRecentlyViewed from './ProductListRecentlyViewed';
import ProductListSortModal from './ProductListSortModal';
import ProductListFilterDrawer from './ProductListFilterDrawer';

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

interface ProductListProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const ProductList: React.FC<ProductListProps> = ({ user }) => {

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

  // Responsive products per page for Recently Viewed
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth <= 640) {
        setProductsPerPage(2);
      } else if (window.innerWidth <= 1024) {
        setProductsPerPage(3);
      } else {
        setProductsPerPage(5);
      }
    };
    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);

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
      image: "/abed.webp",
      colors: ["black", "gold", "silver"]
    },
    {
      id: 2,
      name: "Aberdeen | Modern LED Chandelier",
      price: "₱25,464",
      image: "/aber.webp",
      colors: ["black", "gold"]
    },
    {
      id: 3,
      name: "Acadia | Table Lamp",
      price: "₱12,234",
      image: "/acad.webp",
      colors: ["black"]
    },
    {
      id: 4,
      name: "Ademar | Modern Chandelier",
      price: "₱11,237",
      image: "/mar.webp",
      colors: ["black"]
    },
    {
      id: 5,
      name: "Aeris | Modern Pendant Light",
      price: "₱9,435",
      image: "/aeris.webp",
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
        image: "/ceiling.jpg",
        title: "Aberdeen | Modern LED Chandelier",
        oldPrice: "₱16,995",
        newPrice: "₱15,995",
        discount: "10% off"
      },
      {
        id: 2,
        image: "/chadelier.jpg",
        title: "Aberdeen | Modern LED Chandelier",
        oldPrice: "₱16,995",
        newPrice: "₱15,995",
        discount: "10% off"
      },
      {
        id: 3,
        image: "/cluster.jpg",
        title: "Aberdeen | Modern LED Chandelier",
        oldPrice: "₱16,995",
        newPrice: "₱15,995",
        discount: "10% off"
      },
      {
        id: 4,
        image: "/pendant.jpg",
        title: "Aberdeen | Modern LED Chandelier",
        oldPrice: "₱16,995",
        newPrice: "₱15,995",
        discount: "10% off"
      },
      {
        id: 5,
        image: "/floor.jpg",
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
        image: "/abed.webp",
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
        image: "/aber.webp",
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
        image: "/acad.webp",
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
        image: "/mar.webp",
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
        image: "/aeris.webp",
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
        image: "/aina.webp",
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
        image: "/alab.webp",
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
        image: "/alph.webp",
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
        image: "/alta.jpg",
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
        image: "/ama.webp",
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

  return (
    <div className="bg-white min-h-screen">
      <main className="bg-white min-h-screen px-4 sm:px-8 md:px-16 lg:px-24">
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
        <span>Product List</span>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <ProductListSidebar
          sidebarDropdownOpen={sidebarDropdownOpen}
          setSidebarDropdownOpen={setSidebarDropdownOpen}
          architecturalDropdownOpen={architecturalDropdownOpen}
          setArchitecturalDropdownOpen={setArchitecturalDropdownOpen}
          mirrorsDropdownOpen={mirrorsDropdownOpen}
          setMirrorsDropdownOpen={setMirrorsDropdownOpen}
          fansDropdownOpen={fansDropdownOpen}
          setFansDropdownOpen={setFansDropdownOpen}
        />

        {/* Product List */}
        <ProductListMain
          filteredProducts={filteredProducts}
          viewMode={viewMode}
          selectedColors={selectedColors}
          isCarousel={isCarousel}
          handleColorSelect={handleColorSelect}
          handleViewModeChange={handleViewModeChange}
          sortOption={sortOption}
          handleSortChange={handleSortChange}
          setSortModalOpen={setSortModalOpen}
          setFilterDrawerOpen={setFilterDrawerOpen}
        />
      </div>

      {/* Featured Products Section */}
      <ProductListFeatured />

      {/* Recently Viewed */}
      <ProductListRecentlyViewed
        isCarousel={isCarousel}
        currentPage={currentPage}
        selectedColors={selectedColors}
        totalPages={totalPages}
        currentProducts={currentProducts}
        allProducts={allProducts}
        isHoveringProducts={isHoveringProducts}
        slideDirection={slideDirection}
        setIsHoveringProducts={setIsHoveringProducts}
        handleColorSelect={handleColorSelect}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      <ProductListSortModal
        isOpen={sortModalOpen}
        sortOption={sortOption}
        onClose={() => setSortModalOpen(false)}
        onSortChange={handleSortChange}
      />

      <ProductListFilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sidebarDropdownOpen={sidebarDropdownOpen}
        setSidebarDropdownOpen={setSidebarDropdownOpen}
        architecturalDropdownOpen={architecturalDropdownOpen}
        setArchitecturalDropdownOpen={setArchitecturalDropdownOpen}
        mirrorsDropdownOpen={mirrorsDropdownOpen}
        setMirrorsDropdownOpen={setMirrorsDropdownOpen}
        fansDropdownOpen={fansDropdownOpen}
        setFansDropdownOpen={setFansDropdownOpen}
        selectCategoryOpen={selectCategoryOpen}
        setSelectCategoryOpen={setSelectCategoryOpen}
      />
      </main>
    </div>
    );
};

export default ProductList;


