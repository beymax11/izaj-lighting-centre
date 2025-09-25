"use client";

import React from "react";
import { Icon } from '@iconify/react';

interface ProductListFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarDropdownOpen: boolean;
  setSidebarDropdownOpen: (open: boolean) => void;
  architecturalDropdownOpen: boolean;
  setArchitecturalDropdownOpen: (open: boolean) => void;
  mirrorsDropdownOpen: boolean;
  setMirrorsDropdownOpen: (open: boolean) => void;
  fansDropdownOpen: boolean;
  setFansDropdownOpen: (open: boolean) => void;
  selectCategoryOpen: boolean;
  setSelectCategoryOpen: (open: boolean) => void;
}

const ProductListFilterDrawer: React.FC<ProductListFilterDrawerProps> = ({
  isOpen,
  onClose,
  sidebarDropdownOpen,
  setSidebarDropdownOpen,
  architecturalDropdownOpen,
  setArchitecturalDropdownOpen,
  mirrorsDropdownOpen,
  setMirrorsDropdownOpen,
  fansDropdownOpen,
  setFansDropdownOpen,
  selectCategoryOpen,
  setSelectCategoryOpen,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-50 sm:hidden"
        onClick={onClose}
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
            onClick={onClose}
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
              onClick={() => setSelectCategoryOpen(!selectCategoryOpen)}
            >
              Select a category
              <Icon icon={selectCategoryOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="ml-2 text-xl" />
            </button>
            {selectCategoryOpen && (
              <ul className="space-y-2 text-sm text-black">
                <li className="font-bold flex items-center justify-between cursor-pointer select-none" onClick={() => setSidebarDropdownOpen(!sidebarDropdownOpen)}>
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
                <li className="font-bold flex items-center justify-between cursor-pointer select-none mt-4" onClick={() => setArchitecturalDropdownOpen(!architecturalDropdownOpen)}>
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
                <li className="font-bold flex items-center justify-between cursor-pointer select-none mt-4" onClick={() => setMirrorsDropdownOpen(!mirrorsDropdownOpen)}>
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
                <li className="font-bold flex items-center justify-between cursor-pointer select-none mt-4" onClick={() => setFansDropdownOpen(!fansDropdownOpen)}>
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
            onClick={onClose}
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
  );
};

export default ProductListFilterDrawer;


