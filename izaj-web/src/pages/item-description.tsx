import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';

import ChatNow from '../ChatNow';


const ItemDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const imgRef = useRef<HTMLDivElement>(null);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // Get product data from the allProducts array in Home.tsx
    const allProducts = [
      {
        id: 1,
        name: "Abednego | Chandelier/Large",
        price: "₱32,995",
        image: "/public/abed.webp",
        size: "φ110*H15cm",
        colors: ["black", "gold", "silver"]
      },
      {
        id: 2,
        name: "Aberdeen | Modern LED Chandelier",
        price: "₱25,464",
        image: "/public/aber.webp",
        colors: ["black", "gold"]
      }
    ];

    const foundProduct = allProducts.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
      // Set thumbnails based on the product image
      const baseImage = foundProduct.image.replace('.webp', '');
      setThumbnails([
        foundProduct.image,
        `${baseImage}2.webp`,
        `${baseImage}3.webp`,
        `${baseImage}4.webp`
      ]);
    }
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Product Images and Details Container */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left Column - Product Images */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Desktop Thumbnails */}
              <div className="hidden md:flex md:flex-col gap-2">
                {thumbnails.map((thumbnail, index) => (
                  <img 
                    key={index}
                    src={thumbnail}
                    className={`w-16 h-16 md:w-20 md:h-20 object-cover border cursor-pointer transition-all ${
                      mainImage === thumbnail ? 'ring-2 ring-black' : 'border-gray-200'
                    }`}
                    onClick={() => setMainImage(thumbnail)}
                    alt={`Thumbnail ${index + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ))}
              </div>

              {/* Main Image Container */}
              <div className="flex-1">
                {/* Main Image with Zoom */}
                <div 
                  ref={imgRef}
                  className="relative overflow-hidden rounded-lg aspect-square w-full"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={mainImage}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Product Image"
                  />
                  
                  {Object.keys(zoomStyle).length > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        ...zoomStyle,
                        backgroundRepeat: 'no-repeat',
                        zIndex: 10
                      }}
                    />
                  )}
                </div>

                {/* Mobile Thumbnails */}
                <div className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2">
                  {thumbnails.map((thumbnail, index) => (
                    <img 
                      key={index}
                      src={thumbnail}
                      className={`w-16 h-16 object-cover border cursor-pointer transition-all flex-shrink-0 ${
                        mainImage === thumbnail ? 'ring-2 ring-black' : 'border-gray-200'
                      }`}
                      onClick={() => setMainImage(thumbnail)}
                      alt={`Thumbnail ${index + 1}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ))}
                </div>

                {/* Desktop Share and Favorites */}
                <div className="hidden md:flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-black">Share:</span>
                    <Icon icon="logos:messenger" className="w-5 h-5 text-blue-500 cursor-pointer hover:opacity-80" />
                    <Icon icon="ic:baseline-facebook" className="w-5 h-5 text-blue-700 cursor-pointer hover:opacity-80" />
                    <Icon icon="mdi:instagram" className="w-5 h-5 text-pink-500 cursor-pointer hover:opacity-80" />
                    <Icon icon="mdi:twitter" className="w-5 h-5 text-blue-400 cursor-pointer hover:opacity-80" />
                  </div>

                  <div className="flex items-center text-gray-600 text-sm gap-1">
                    <Icon icon="mdi:heart" className="text-red-500 text-lg" />
                    Favorite (2.7k)
                  </div>
                </div>

                {/* Product Description - Desktop */}
                <div className="hidden md:block mt-4 p-4">
                  <h3 className="font-bold text-black text-lg mb-2">PRODUCT DESCRIPTION</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-black">
                    <li>Color: {product.colors?.[0] || 'Black'}, {product.colors?.[1] || 'Black'} + Gold</li>
                    <li>Material: Iron art + Aluminum</li>
                    <li>Width: {product.size || '120cm'}</li>
                  </ul>
                </div>

                {/* Payment & Security - Desktop */}
                <div className="hidden md:block mt-4 p-4 border-t border-gray-200">
                  <h3 className="font-bold text-black text-lg mb-4">PAYMENT & SECURITY</h3>
                  <div className="flex justify-center">
                    <img 
                      src="/payment.webp" 
                      alt="Payment security badges" 
                      className="w-80 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex-1">
            {/* Mobile View */}
            <div className="md:hidden">
              {/* Product Name */}
              <h2 className="text-2xl font-bold mb-4 text-black">
                {product.name}
              </h2>

              {/* Monthly Deals & Ratings */}
              <div className="flex items-center mb-4 gap-2">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">MONTHLY DEALS</span>
                <div className="flex items-center">
                  <span className="mr-1 text-black">4.5</span>
                  {[...Array(4)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className="text-yellow-500 text-lg" />
                  ))}
                  <Icon icon="mdi:star-half" className="text-yellow-500 text-lg" />
                </div>
                <span className="text-gray-500 text-sm">7.3K Ratings | 10K+ Sold</span>
              </div>

              {/* Color Options */}
              <div className="mb-6">
                <p className="font-semibold mb-2 text-black">Color: {product.colors?.[0] || 'Black'}</p>
                <div className="flex gap-2">
                  {product.colors?.map((color: string, index: number) => (
                    <div
                      key={index}
                      className="w-12 h-12 border border-gray-200 rounded cursor-pointer hover:ring-2 hover:ring-black"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Price and Details */}
              <div>
                <p className="text-2xl font-bold mb-4 text-black">{product.price}</p>
                <p className="mb-6 text-gray-600">Stock: <span className="font-semibold text-green-600">In Stock</span></p>
                
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <label className="font-medium text-black">Quantity:</label>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        type="button"
                        className="px-2 py-1 text-black hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                      >
                        <Icon icon="mdi:minus" className="w-5 h-5" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-12 p-2 text-center border-0 focus:ring-0 focus:outline-none text-black bg-transparent"
                      />
                      <button
                        type="button"
                        className="px-2 py-1 text-black hover:bg-gray-100"
                        onClick={() => setQuantity(q => q + 1)}
                      >
                        <Icon icon="mdi:plus" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="font-medium text-black">Branch Availability:</label>
                    <select className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black focus:outline-none text-black">
                      <option>San Pablo City</option>
                      <option>Quezon</option>
                      <option>Laguna</option>
                      <option>Cavite</option>
                      <option>Batangas</option>
                      <option>Camarines Sur</option>
                      <option>Sorsogon</option>
                      <option>La Union</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping Schedule */}
              <div className="bg-yellow-100 p-4 rounded-lg mb-8 flex items-start">
                <Icon 
                  icon="mdi:truck-delivery-outline" 
                  className="text-gray-800 text-2xl mr-3 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Shipping Schedule</h3>
                  <p className="text-gray-800 text-sm">
                    Dispatched within 10-14 working days (for store pick up), 10-14 days (Metro Manila), and 14 days (Provincial).
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:cart-outline" className="text-lg" />
                  ADD TO CART
                </button>
                
                <Link 
                  to="/checkout"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:credit-card-outline" className="text-lg" />
                  BUY NOW
                </Link>
              </div>

              {/* Share and Favorites - Mobile Only */}
              <div className="md:hidden flex flex-row justify-between items-center mt-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-black">Share:</span>
                  <Icon icon="logos:messenger" className="w-5 h-5 text-blue-500 cursor-pointer hover:opacity-80" />
                  <Icon icon="ic:baseline-facebook" className="w-5 h-5 text-blue-700 cursor-pointer hover:opacity-80" />
                  <Icon icon="mdi:instagram" className="w-5 h-5 text-pink-500 cursor-pointer hover:opacity-80" />
                  <Icon icon="mdi:twitter" className="w-5 h-5 text-blue-400 cursor-pointer hover:opacity-80" />
                </div>
                <div className="flex items-center text-gray-600 text-sm gap-1">
                  <Icon icon="mdi:heart" className="text-red-500 text-lg" />
                  Favorite (2.7k)
                </div>
              </div>

              {/* Product Description */}
              <div className="mt-4 p-4">
                <h3 className="font-bold text-black text-lg mb-2">PRODUCT DESCRIPTION</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-black">
                  <li>Color: {product.colors?.[0] || 'Black'}, {product.colors?.[1] || 'Black'} + Gold</li>
                  <li>Material: Iron art + Aluminum</li>
                  <li>Width: {product.size || '120cm'}</li>
                </ul>
              </div>

              {/* Delivery & Installation (Dropdown) */}
              <div className="mt-4 p-4 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-bold text-black text-lg mb-2 focus:outline-none"
                  onClick={() => setIsDeliveryOpen((prev) => !prev)}
                >
                  DELIVERY & INSTALLATION
                  <Icon icon={isDeliveryOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="ml-2 text-xl" />
                </button>
                {isDeliveryOpen && (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-black">
                    <li>Delivery within 10-14 working days for store pick up, 10-14 days for Metro Manila, and 14 days for Provincial.</li>
                    <li>Professional installation available upon request.</li>
                    <li>Contact us for more details about installation services.</li>
                  </ul>
                )}
              </div>

              {/* Care Instruction (Dropdown) */}
              <div className="mt-4 p-4 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-bold text-black text-lg mb-2 focus:outline-none"
                  onClick={() => setIsCareOpen((prev) => !prev)}
                >
                  CARE INSTRUCTION
                  <Icon icon={isCareOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="ml-2 text-xl" />
                </button>
                {isCareOpen && (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-black">
                    <li>Wipe with a soft, dry cloth.</li>
                    <li>Avoid using harsh chemicals or abrasive cleaners.</li>
                    <li>Ensure the fixture is cool before cleaning.</li>
                  </ul>
                )}
              </div>

              {/* Payment & Security */}
              <div className="mt-4 p-4 border-t border-gray-200">
                <h3 className="font-bold text-black text-lg mb-4">PAYMENT & SECURITY</h3>
                <div className="flex justify-center">
                  <img 
                    src="/payment.webp" 
                    alt="Payment security badges" 
                    className="w-80 h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              {/* Chat Now Button */}
              <button 
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm mb-6 hover:bg-gray-50 flex items-center gap-2 transition-colors text-black"
                onClick={() => setIsChatModalOpen(true)}
              >
                <Icon icon="material-symbols:chat-outline-rounded" className="text-lg" />
                INQUIRE NOW
              </button>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
                {product.name}
              </h2>

              {/* Monthly Deals & Ratings */}
              <div className="flex items-center mb-4 gap-2">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">MONTHLY DEALS</span>
                <div className="flex items-center">
                  <span className="mr-1 text-black">4.5</span>
                  {[...Array(4)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className="text-yellow-500 text-lg" />
                  ))}
                  <Icon icon="mdi:star-half" className="text-yellow-500 text-lg" />
                </div>
                <span className="text-gray-500 text-sm">7.3K Ratings | 10K+ Sold</span>
              </div>

              {/* Color Options */}
              <div className="mb-6">
                <p className="font-semibold mb-2 text-black">Color: {product.colors?.[0] || 'Black'}</p>
                <div className="flex gap-2">
                  {product.colors?.map((color: string, index: number) => (
                    <div
                      key={index}
                      className="w-12 h-12 border border-gray-200 rounded cursor-pointer hover:ring-2 hover:ring-black"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold mb-4 text-black">{product.price}</p>

              {/* Stock */}
              <p className="mb-6 text-gray-600">Stock: <span className="font-semibold text-green-600">In Stock</span></p>

              {/* Quantity & Branch Availability */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-black">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      type="button"
                      className="px-2 py-1 text-black hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <Icon icon="mdi:minus" className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-12 p-2 text-center border-0 focus:ring-0 focus:outline-none text-black bg-transparent"
                    />
                    <button
                      type="button"
                      className="px-2 py-1 text-black hover:bg-gray-100"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      <Icon icon="mdi:plus" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium text-black">Branch Availability:</label>
                  <select className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black focus:outline-none text-black">
                    <option>San Pablo City</option>
                    <option>Quezon</option>
                    <option>Laguna</option>
                    <option>Cavite</option>
                    <option>Batangas</option>
                    <option>Camarines Sur</option>
                    <option>Sorsogon</option>
                    <option>La Union</option>
                  </select>
                </div>
              </div>

              {/* Shipping Schedule */}
              <div className="bg-yellow-100 p-4 rounded-lg mb-8 flex items-start">
                <Icon 
                  icon="mdi:truck-delivery-outline" 
                  className="text-gray-800 text-2xl mr-3 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Shipping Schedule</h3>
                  <p className="text-gray-800 text-sm">
                    Dispatched within 10-14 working days (for store pick up), 10-14 days (Metro Manila), and 14 days (Provincial).
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:cart-outline" className="text-lg" />
                  ADD TO CART
                </button>
                
                <Link 
                  to="/checkout"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:credit-card-outline" className="text-lg" />
                  BUY NOW
                </Link>
              </div>

              {/* Share and Favorites - Mobile Only */}
              <div className="md:hidden flex flex-row justify-between items-center mt-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-black">Share:</span>
                  <Icon icon="logos:messenger" className="w-5 h-5 text-blue-500 cursor-pointer hover:opacity-80" />
                  <Icon icon="ic:baseline-facebook" className="w-5 h-5 text-blue-700 cursor-pointer hover:opacity-80" />
                  <Icon icon="mdi:instagram" className="w-5 h-5 text-pink-500 cursor-pointer hover:opacity-80" />
                  <Icon icon="mdi:twitter" className="w-5 h-5 text-blue-400 cursor-pointer hover:opacity-80" />
                </div>
                <div className="flex items-center text-gray-600 text-sm gap-1">
                  <Icon icon="mdi:heart" className="text-red-500 text-lg" />
                  Favorite (2.7k)
                </div>
              </div>

              {/* Delivery & Installation (Dropdown) */}
              <div className="mt-4 p-4 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-bold text-black text-lg mb-2 focus:outline-none"
                  onClick={() => setIsDeliveryOpen((prev) => !prev)}
                >
                  DELIVERY & INSTALLATION
                  <Icon icon={isDeliveryOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="ml-2 text-xl" />
                </button>
                {isDeliveryOpen && (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-black">
                    <li>Delivery within 10-14 working days for store pick up, 10-14 days for Metro Manila, and 14 days for Provincial.</li>
                    <li>Professional installation available upon request.</li>
                    <li>Contact us for more details about installation services.</li>
                  </ul>
                )}
              </div>

              {/* Care Instruction (Dropdown) */}
              <div className="mt-4 p-4 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-bold text-black text-lg mb-2 focus:outline-none"
                  onClick={() => setIsCareOpen((prev) => !prev)}
                >
                  CARE INSTRUCTION
                  <Icon icon={isCareOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="ml-2 text-xl" />
                </button>
                {isCareOpen && (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-black">
                    <li>Wipe with a soft, dry cloth.</li>
                    <li>Avoid using harsh chemicals or abrasive cleaners.</li>
                    <li>Ensure the fixture is cool before cleaning.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

        
       {/* Chat Modal */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* No backdrop here, just the modal */}
          <div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button overlay */}
            <button
              onClick={() => setIsChatModalOpen(false)}
              className="absolute -top-10 -right-10 md:top-4 md:right-4 z-10 p-2 text-white hover:text-gray-200 transition-colors"
            >
              <Icon icon="mdi:close" width={24} height={24} />
            </button>
            {/* Chat component */}
            <div className="h-full">
              <ChatNow onClose={() => setIsChatModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Product Ratings */}
      <div className="mt-12 max-w-7xl mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-semibold text-black mb-4 md:mb-6">PRODUCT RATINGS & REVIEWS</h3>

        {/* Ratings Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Overall Rating */}
            <div className="flex-1">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="text-center">
                  <h4 className="text-3xl md:text-4xl font-bold text-black">4.5</h4>
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
                    src="aber.webp" 
                    alt="Review" 
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-200 hover:opacity-90 cursor-pointer"
                  />
                  <img 
                    src="aber2.webp" 
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
        
     
    </div>
  );
};

export default ItemDescription;