"use client";
import React from 'react';
import { Icon } from '@iconify/react';

const ProductRatings: React.FC = () => {
  return (
    <div className="mt-12 max-w-7xl mx-auto px-4">
      <h3 className="text-xl md:text-2xl font-semibold text-black mb-4 md:mb-6">PRODUCT RATINGS & REVIEWS</h3>

      {/* Ratings Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Overall Rating */}
          <div className="flex-1">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-bold text:black">4.5</h4>
                <div className="flex items-center justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className={`w-4 md:w-5 h-4 md:h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-600 text-xs md:text-sm">Based on 7.3K reviews</p>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-gray-600 w-6 md:w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${(rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2)}%` }}
                    />
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 w-10 md:w-12">
                    {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Filters */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
        <button className="px-3 md:px-4 py-1.5 md:py-2 bg-red-600 text-white rounded-full text-xs md:text-sm font-medium hover:bg-red-700 transition-colors">
          All Reviews
        </button>
        <button className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors">
          With Photos
        </button>
        <button className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors">
          Verified Purchase
        </button>
      </div>

      {/* Review Cards */}
      <div className="space-y-4 md:space-y-6">
        {/* Review Card 1 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 md:gap-4">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon icon="qlementine-icons:user-16" className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
            </div>

            {/* Review Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-black">John D.</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} icon="mdi:star" className={`w-3 h-3 md:w-4 md:h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs md:text-sm">2025-03-14</span>
                  </div>
                </div>
                <span className="text-xs md:text-sm text-gray-600 mt-1 md:mt-0">Verified Purchase</span>
              </div>

              {/* Review Images */}
              <div className="flex gap-2 my-2 md:my-3">
                <img 
                  src="/aber.webp" 
                  alt="Review" 
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-200 hover:opacity-90 cursor-pointer"
                />
                <img 
                  src="/aber2.webp" 
                  alt="Review" 
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-200 hover:opacity-90 cursor-pointer"
                />
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-gray-700 mb-2 md:mb-3">
                The chandelier exceeded my expectations! The quality is outstanding and it looks even better in person. The installation was smooth and the customer service was excellent.
              </p>

              {/* Review Metrics */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-3">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Performance</p>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:star" className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">Excellent</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Durability</p>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:star" className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">Good</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Quality</p>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:star" className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Review Actions */}
              <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                  <Icon icon="mdi:thumb-up-outline" className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">123</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Icon icon="mdi:comment-outline" className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Icon icon="mdi:share-variant" className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Card 2 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 md:gap-4">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon icon="qlementine-icons:user-16" className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
            </div>

            {/* Review Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-black">Sarah M.</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} icon="mdi:star" className={`w-3 h-3 md:w-4 md:h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs md:text-sm">2025-03-13</span>
                  </div>
                </div>
                <span className="text-xs md:text-sm text-gray-600 mt-1 md:mt-0">Verified Purchase</span>
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-gray-700 mb-2 md:mb-3">
                Absolutely stunning piece! The craftsmanship is impeccable and it adds such elegance to our living room. The LED lights are bright but not harsh, creating the perfect ambiance.
              </p>

              {/* Review Metrics */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-3">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Performance</p>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:star" className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">Excellent</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Durability</p>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:star" className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">Excellent</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Quality</p>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:star" className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Review Actions */}
              <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                  <Icon icon="mdi:thumb-up-outline" className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">89</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Icon icon="mdi:comment-outline" className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Icon icon="mdi:share-variant" className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center mt-6 md:mt-8">
        <button className="px-4 md:px-6 py-2 md:py-3 bg-gray-100 text-gray-700 rounded-lg text-sm md:text-base font-medium hover:bg-gray-200 transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default ProductRatings;


