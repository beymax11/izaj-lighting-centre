"use client";
import React from 'react';
import Link from 'next/link';
import { useFavoritesContext } from '@/context/FavoritesContext';

const MyFavorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavoritesContext();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl pl-4 pr-4 md:pl-16 md:pr-0 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Favorites</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 mb-4">Wala ka pang favorites.</p>
            <Link href="/product-list" className="text-black underline">Tumingin ng products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item.productId} className="bg-white p-4 md:p-8 flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-0 rounded-md shadow-sm relative">
              <div className="relative flex-shrink-0 w-32 h-32 md:w-full md:h-96">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md md:w-full md:h-96 mb-0 md:mb-6" />
                <button 
                  onClick={() => removeFavorite(item.productId)}
                  className="hidden md:block absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => removeFavorite(item.productId)}
                className="absolute top-2 right-2 md:hidden bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <div className="flex flex-col flex-1 justify-between h-full">
                <div>
                  <h3 className="font-medium text-gray-800 text-lg md:text-xl">{item.name}</h3>
                  <p className="text-base md:text-lg font-semibold text-gray-900 mt-2">₱{item.price.toLocaleString()}</p>
                </div>
                <div className="mt-4 md:mt-auto pt-2 md:pt-4">
                  <Link href={`/item-description/${item.productId}`} className="bg-black text-white inline-block text-center py-2 px-6 md:px-8 rounded-md hover:bg-gray-800 transition-colors w-full md:w-[140px]">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;


