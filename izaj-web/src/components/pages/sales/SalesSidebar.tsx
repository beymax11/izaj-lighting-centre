"use client";

import React from "react";
import { Icon } from '@iconify/react';

interface SalesSidebarProps {
  sidebarDropdownOpen: boolean;
  setSidebarDropdownOpen: (open: boolean) => void;
  architecturalDropdownOpen: boolean;
  setArchitecturalDropdownOpen: (open: boolean) => void;
  mirrorsDropdownOpen: boolean;
  setMirrorsDropdownOpen: (open: boolean) => void;
  fansDropdownOpen: boolean;
  setFansDropdownOpen: (open: boolean) => void;
}

const SalesSidebar: React.FC<SalesSidebarProps> = ({
  sidebarDropdownOpen,
  setSidebarDropdownOpen,
  architecturalDropdownOpen,
  setArchitecturalDropdownOpen,
  mirrorsDropdownOpen,
  setMirrorsDropdownOpen,
  fansDropdownOpen,
  setFansDropdownOpen,
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
    </aside>
  );
};

export default SalesSidebar;
