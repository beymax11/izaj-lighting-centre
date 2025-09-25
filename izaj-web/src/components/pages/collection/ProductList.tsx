"use client";

import React from "react";
import { Icon } from '@iconify/react';
import Link from "next/link";
import { formatCurrency } from '../../../utils/helpers';

// Local product type for New/Collection page
type CollectionProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  colors?: string[];
  isOnSale?: boolean;
  isNew?: boolean;
};

interface ProductListProps {
  filteredProducts: CollectionProduct[];
  viewMode: 'grid' | 'list';
  selectedColors: Record<number, string>;
  isCarousel: boolean;
  handleColorSelect: (productId: number, color: string) => void;
  handleViewModeChange: (mode: 'grid' | 'list') => void;
  sortOption: string;
  handleSortChange: (option: string) => void;
  setSortModalOpen: (open: boolean) => void;
  setFilterDrawerOpen: (open: boolean) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
  viewMode,
  selectedColors,
  isCarousel,
  handleColorSelect,
  handleViewModeChange,
  sortOption,
  handleSortChange,
  setSortModalOpen,
  setFilterDrawerOpen,
}) => {
  return (
    <section className="w-full lg:w-5/6 p-0 sm:p-4 md:px-8 lg:px-12 mobile-center-main">
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
                  onClick={() => setSortModalOpen(true)}
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
                  {product.colors?.map((color: string) => (
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
                <p className="font-bold text-gray-800 mt-auto text-sm sm:text-base">{formatCurrency(product.price)}</p>
                <p className="text-green-600 text-xs mt-1">● In stock</p>
                <Link href={`/item-description/${product.id}?source=new`} className="mt-3 sm:mt-4 w-full bg-black text-white py-1.5 sm:py-2 hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm text-center block">
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
                    <p className="text-lg font-semibold text-gray-800 mb-1">{formatCurrency(product.price)}</p>
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
                    {product.colors?.map((color: string) => (
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
                  <p className="font-bold text-gray-800 mt-auto text-sm sm:text-base">{formatCurrency(product.price)}</p>
                  <p className="text-green-600 text-xs mt-1 mb-3">● In stock</p>
                  <Link href={`/item-description/${product.id}?source=new`} className="mt-auto w-full bg-black text-white py-1.5 sm:py-2 hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm text-center block">
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
    </section>
  );
};

export default ProductList;


