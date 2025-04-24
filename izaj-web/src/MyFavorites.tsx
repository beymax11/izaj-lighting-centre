// MyFavorites.tsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface FavoriteItem {
  id: number;
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  isOutOfStock: boolean;
  rating: number;
}

const MyFavorites: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([
    {
      id: 1,
      image: "ceiling.jpg",
      name: "Aberdeen | Modern LED Chandelier",
      price: "₱15,995",
      originalPrice: "₱16,995",
      discount: "10% off",
      isOutOfStock: false,
      rating: 4.5
    },
    {
      id: 2,
      image: "chandelier.jpg",
      name: "Vienna Crystal Chandelier",
      price: "₱22,500",
      isOutOfStock: false,
      rating: 5
    },
    {
      id: 3,
      image: "pendant.jpg",
      name: "Modern Pendant Light",
      price: "₱8,750",
      originalPrice: "₱10,500",
      discount: "20% off",
      isOutOfStock: true,
      rating: 4.2
    },
    {
      id: 4,
      image: "floor.jpg",
      name: "Industrial Floor Lamp",
      price: "₱12,300",
      isOutOfStock: false,
      rating: 4.7
    },
    {
      id: 5,
      image: "wall.jpg",
      name: "Minimalist Wall Sconce",
      price: "₱6,450",
      isOutOfStock: false,
      rating: 4.3
    },
    {
      id: 6,
      image: "table.jpg",
      name: "Rechargeable Table Lamp",
      price: "₱4,200",
      originalPrice: "₱5,250",
      discount: "25% off",
      isOutOfStock: false,
      rating: 4.8
    }
  ]);

  // Function to remove item from favorites
  const removeFromFavorites = (id: number) => {
    setFavoriteItems(favoriteItems.filter(item => item.id !== id));
  };

  // Function to render rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} icon="mdi:star" className="w-4 h-4 text-yellow-400" />);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(<Icon key="half" icon="mdi:star-half" className="w-4 h-4 text-yellow-400" />);
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} icon="mdi:star-outline" className="w-4 h-4 text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-end text-sm">
          <div className="flex space-x-6">
            <a href="#" className="flex items-center hover:text-orange-100">
              <Icon icon="mdi:truck-delivery-outline" className="mr-1 h-4 w-4" />
              <span>Free Shipping over ₱10,000</span>
            </a>
            <a href="#" className="flex items-center hover:text-orange-100">
              <Icon icon="mdi:phone" className="mr-1 h-4 w-4" />
              <span>Customer Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-white py-4 px-8 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <Link to="/" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition duration-150">
                    Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Icon icon="mdi:chevron-right" className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="ml-2 text-sm font-medium text-gray-900">My Favorites</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Favorites
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Items you've marked as favorites for future consideration
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              <Icon icon="mdi:heart" className="mr-1 h-4 w-4 text-red-500" />
              {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Filters & Sort */}
        {favoriteItems.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-3 sm:mb-0">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition">
                All
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition">
                In Stock
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition">
                On Sale
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
              <select className="text-sm border border-gray-300 rounded-md p-1 pr-8 focus:ring-orange-500 focus:border-orange-500">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        )}

        {/* Favorites List */}
        {favoriteItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="rounded-full bg-gray-100 p-6 w-24 h-24 mx-auto flex items-center justify-center">
              <Icon 
                icon="mdi:heart-outline" 
                className="h-12 w-12 text-gray-400" 
              />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">
              Your favorites list is empty
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Start adding items to your favorites by clicking the heart icon on products you love and want to revisit later
            </p>
            <div className="mt-8">
              <Link
                to="/product-list"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <Icon icon="mdi:shopping" className="mr-2 h-5 w-5" />
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative h-72">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                    
                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-gray-900 py-2 px-4 rounded-md shadow-md font-medium flex items-center hover:bg-gray-50 transition">
                        <Icon icon="mdi:eye" className="mr-1 h-5 w-5" />
                        Quick View
                      </button>
                    </div>
                    
                    {/* Discount Badge */}
                    {item.discount && (
                      <div className="absolute top-0 left-0 m-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {item.discount}
                      </div>
                    )}
                    
                    {/* Out of Stock Badge */}
                    {item.isOutOfStock && (
                      <div className="absolute top-0 left-0 m-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                        OUT OF STOCK
                      </div>
                    )}
                    
                    {/* Remove from Favorites Button */}
                    <button 
                      onClick={() => removeFromFavorites(item.id)}
                      className="absolute top-0 right-0 m-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      aria-label="Remove from favorites"
                    >
                      <Icon 
                        icon="mdi:heart" 
                        className="h-5 w-5 text-red-500" 
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      {renderRatingStars(item.rating)}
                      <span className="ml-1 text-xs text-gray-500">({item.rating})</span>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-orange-600 truncate">
                      <Link to={`/item-description/${item.id}`}>
                        {item.name}
                      </Link>
                    </h3>
                    
                    {/* Price */}
                    <div className="flex items-center mt-3">
                      {item.originalPrice ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 line-through">
                            {item.originalPrice}
                          </span>
                          <span className="text-xl font-bold text-orange-600">
                            {item.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-gray-900">
                          {item.price}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 grid grid-cols-5 gap-2">
                      <button
                        disabled={item.isOutOfStock}
                        className={`col-span-4 py-3 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                          item.isOutOfStock 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                      >
                        <Icon 
                          icon={item.isOutOfStock ? "mdi:bell" : "mdi:cart"} 
                          className="mr-2 h-5 w-5" 
                        />
                        {item.isOutOfStock ? 'Notify Me' : 'Add to Cart'}
                      </button>
                      <button
                        className="col-span-1 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                        aria-label="Share"
                      >
                        <Icon icon="mdi:share-variant" className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <p className="text-gray-600 mb-6">
                Your favorites are saved to your account and will be available across all devices.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/product-list"
                  className="inline-flex items-center justify-center px-6 py-3 border border-orange-600 text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Continue Shopping
                  <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
                </Link>
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <Icon icon="mdi:format-list-bulleted" className="mr-2 h-5 w-5" />
                  Create Wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Teaser */}
      <div className="bg-gray-800 text-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <h4 className="font-medium text-xl mb-2">Subscribe to our newsletter</h4>
              <p className="text-gray-300 text-sm">Get the latest updates on new products and sales</p>
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:ring-orange-500 focus:border-orange-500"
                />
                <button className="bg-orange-600 hover:bg-orange-700 transition-colors duration-200 px-6 py-3 rounded-md font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFavorites;