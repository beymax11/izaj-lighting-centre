"use client";

import React from "react";
import { Icon } from '@iconify/react';

interface ProductListSidebarProps {
  sidebarDropdownOpen: boolean;
  setSidebarDropdownOpen: (open: boolean) => void;
  architecturalDropdownOpen: boolean;
  setArchitecturalDropdownOpen: (open: boolean) => void;
  mirrorsDropdownOpen: boolean;
  setMirrorsDropdownOpen: (open: boolean) => void;
  fansDropdownOpen: boolean;
  setFansDropdownOpen: (open: boolean) => void;
  selectedCategories: string[];
  handleCategorySelect: (category: string) => void;
}

const ProductListSidebar: React.FC<ProductListSidebarProps> = ({
  sidebarDropdownOpen,
  setSidebarDropdownOpen,
  architecturalDropdownOpen,
  setArchitecturalDropdownOpen,
  mirrorsDropdownOpen,
  setMirrorsDropdownOpen,
  fansDropdownOpen,
  setFansDropdownOpen,
  selectedCategories,
  handleCategorySelect,
}) => {
  return (
    <aside className="hidden lg:block w-full lg:w-1/6 p-0 sm:p-4 lg:p-6 lg:pl-12 lg:pr-4 mobile-hide">
      <h3 className="font-bold text-black mb-4">SHOP</h3>
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
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Ceiling Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Ceiling Lights')}
            >
              {selectedCategories.includes('Ceiling Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Ceiling Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Semi Flush Mounted Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Semi Flush Mounted Lights')}
            >
              {selectedCategories.includes('Semi Flush Mounted Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Semi Flush Mounted Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Chandelier') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Chandelier')}
            >
              {selectedCategories.includes('Chandelier') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Chandelier
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Cluster Chandelier') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Cluster Chandelier')}
            >
              {selectedCategories.includes('Cluster Chandelier') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Cluster Chandelier
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Pendant Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Pendant Lights')}
            >
              {selectedCategories.includes('Pendant Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Pendant Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Floor Lamps') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Floor Lamps')}
            >
              {selectedCategories.includes('Floor Lamps') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Floor Lamps
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Table Lamps') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Table Lamps')}
            >
              {selectedCategories.includes('Table Lamps') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Table Lamps
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Rechargeable Table Lamps') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Rechargeable Table Lamps')}
            >
              {selectedCategories.includes('Rechargeable Table Lamps') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Rechargeable Table Lamps
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Wall Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Wall Lights')}
            >
              {selectedCategories.includes('Wall Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Wall Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Painting & Bathroom Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Painting & Bathroom Lights')}
            >
              {selectedCategories.includes('Painting & Bathroom Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Painting & Bathroom Lights
            </li>
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
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Track Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Track Lights')}
            >
              {selectedCategories.includes('Track Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Track Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Recessed Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Recessed Lights')}
            >
              {selectedCategories.includes('Recessed Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Recessed Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Spot Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Spot Lights')}
            >
              {selectedCategories.includes('Spot Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Spot Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Strip Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Strip Lights')}
            >
              {selectedCategories.includes('Strip Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Strip Lights
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Emergency Lights') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Emergency Lights')}
            >
              {selectedCategories.includes('Emergency Lights') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Emergency Lights
            </li>
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
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Bathroom Mirrors') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Bathroom Mirrors')}
            >
              {selectedCategories.includes('Bathroom Mirrors') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Bathroom Mirrors
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Wall Mirrors') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Wall Mirrors')}
            >
              {selectedCategories.includes('Wall Mirrors') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Wall Mirrors
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('LED Mirrors') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('LED Mirrors')}
            >
              {selectedCategories.includes('LED Mirrors') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              LED Mirrors
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Decorative Mirrors') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Decorative Mirrors')}
            >
              {selectedCategories.includes('Decorative Mirrors') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Decorative Mirrors
            </li>
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
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Standard Fans') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Standard Fans')}
            >
              {selectedCategories.includes('Standard Fans') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Standard Fans
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('DC Fans') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('DC Fans')}
            >
              {selectedCategories.includes('DC Fans') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              DC Fans
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Industrial Fans') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Industrial Fans')}
            >
              {selectedCategories.includes('Industrial Fans') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Industrial Fans
            </li>
            <li 
              className={`hover:underline cursor-pointer flex items-center ${selectedCategories.includes('Outdoor Fans') ? 'font-bold text-black' : ''}`}
              onClick={() => handleCategorySelect('Outdoor Fans')}
            >
              {selectedCategories.includes('Outdoor Fans') && <Icon icon="mdi:check" width="16" height="16" className="mr-2" />}
              Outdoor Fans
            </li>
          </ul>
        )}
      </ul>
    </aside>
  );
};

export default ProductListSidebar;


