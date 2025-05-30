// MyFavorites.tsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';


interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isOutOfStock: boolean;
  rating: number;
}

const MyFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: 1,
      name: "Modern Crystal Chandelier",
      price: 15999,
      image: "chadelier.jpg",
      category: "Chandeliers",
      isOutOfStock: false,
      rating: 4.5
    },
    {
      id: 2,
      name: "Industrial Pendant Light",
      price: 8999,
      image: "pendant.jpg",
      category: "Pendant Lights",
      isOutOfStock: false,
      rating: 4.2
    },
    {
      id: 3,
      name: "Contemporary Wall Sconce",
      price: 4999,
      image: "cluster.jpg",
      category: "Wall Lights",
      isOutOfStock: false,
      rating: 4.0
    }
  ]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: number) => {
    // Add to cart logic here
    console.log(`Added item ${id} to cart`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            icon={star <= rating ? "mdi:star" : "mdi:star-outline"}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">My Favorites</h1>
          <p className="text-lg text-gray-600">Save your favorite items for later</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Icon icon="mdi:heart-outline" className="mx-auto h-16 w-16 text-gray-400 animate-pulse" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">No favorites yet</h3>
            <p className="mt-2 text-gray-500">Start adding items to your favorites list</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-w-1 aspect-h-1 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {item.isOutOfStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">Out of Stock</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                  >
                    <Icon icon="mdi:heart" className="w-6 h-6 text-red-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    {renderStars(item.rating)}
                    <p className="text-2xl font-bold text-gray-900">₱{item.price.toLocaleString()}</p>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      disabled={item.isOutOfStock}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        item.isOutOfStock
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-gray-800 active:transform active:scale-95'
                      }`}
                    >
                      {item.isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
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