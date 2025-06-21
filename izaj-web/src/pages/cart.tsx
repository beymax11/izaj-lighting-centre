import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react';
import "../App.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  isSale: boolean;
}

// Cart Component
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // ...your cart items
    {
      id: 1,
      name: "Abednego | Chandelier/Large",
      price: 32995,
      originalPrice: 35995,
      quantity: 1,
      image: "/abed.webp",
      isSale: true
    },
    {
      id: 2,
      name: "Aberdeen | Modern LED Chandelier",
      price: 25464,
      originalPrice: 27464,
      quantity: 1,
      image: "/aber.webp",
      isSale: true
    },
    {
      id: 3,
      name: "Acadia | Table Lamp",
      price: 12234,
      originalPrice: 13234,
      quantity: 1,
      image: "/acad.webp",
      isSale: true
    },
    {
      id: 4,
      name: "Ademar | Modern Chandelier",
      price: 11237,
      originalPrice: 12237,
      quantity: 1,
      image: "/mar.webp",
      isSale: true
    },
    {
      id: 5,
      name: "Aeris | Modern Pendant Light",
      price: 9435,
      originalPrice: 10435,
      quantity: 1,
      image: "/aeris.webp",
      isSale: true
    },
    {
      id: 6,
      name: "Aina | Modern LED Chandelier",
      price: 29995,
      originalPrice: 32995,
      quantity: 1,
      image: "/aina.webp",
      isSale: true
    },
    {
      id: 7,
      name: "Alabama | Table Lamp",
      price: 27995,
      originalPrice: 29995,
      quantity: 1,
      image: "/alab.webp",
      isSale: true
    },
    {
      id: 8,
      name: "Alphius | Surface Mounted Downlight",
      price: 25995,
      originalPrice: 27995,
      quantity: 1,
      image: "/alph.webp",
      isSale: true
    }
  ]);

  const [showShipping, setShowShipping] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Philippines'
  });

  const navigate = useNavigate();

  const calculateShipping = () => {
    // Simple shipping calculation based on city
    const shippingRates = {
      'San Pablo City': 200,
      'Quezon': 250,
      'Laguna': 200,
      'Cavite': 250,
      'Batangas': 250,
      'Camarines Sur': 300,
      'Sorsogon': 300,
      'La Union': 300,
      'default': 300
    };
    return shippingRates[shippingAddress.city as keyof typeof shippingRates] || shippingRates.default;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.12; // 12% VAT
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping() + calculateTax();
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(items => items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((sum, item) => {
      if (item.originalPrice !== undefined) {
        return sum + ((item.originalPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-[94%] mx-auto mt-8 px-5 sm:px-8 ml-6 mr-6">
        {/* Shopping Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-wider text-black">
            Your cart
          </h1>
        </div>
        <div className="mb-2 text-gray-600 text-sm">
          {cartItems.length} product{cartItems.length !== 1 ? 's' : ''} in total
        </div>
        <hr className="border-t border-gray-200 mb-8" />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Side - Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 lg:py-16 px-4">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 mb-4 lg:mb-6 text-gray-300">
                    <Icon icon="mdi:cart-outline" width="96" height="96" className="lg:w-128 lg:h-128" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-700 mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 text-center mb-6 lg:mb-8 text-sm lg:text-base">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <button 
                    onClick={() => window.history.back()}
                    className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 rounded-xl font-semibold hover:bg-orange-500 transition-colors flex items-center text-sm lg:text-base"
                  >
                    <Icon icon="mdi:arrow-left" className="mr-2" />
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div>
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={
                          "flex items-start p-4 border-b border-gray-100 bg-white relative"
                        }
                        style={{ scrollSnapAlign: 'start' }}
                      >
                        {/* Product Image */}
                        <div
                          className={
                            "w-24 h-24 flex-shrink-0 mr-4 bg-white flex items-center justify-center rounded-lg border border-gray-100"
                          }
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Details and Quantity Controls */}
                        <div
                          className={
                            "flex flex-col justify-between flex-1"
                          }
                        >
                          <div>
                            <p className="font-bold text-base lg:text-lg text-black hover:text-orange-500 transition-colors cursor-pointer">{item.name}</p>
                            <p className="text-gray-700 mt-1 text-sm lg:text-base">₱{item.price.toLocaleString()}{item.quantity === 10 ? '/10 pieces' : ''}</p>
                            {item.isSale && (
                              <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 mt-2">
                                Sale
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col lg:flex-row items-start lg:items-center mt-4 space-y-4 lg:space-y-0">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 overflow-hidden">
                              <button
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <Icon icon="mdi:minus" width="20" height="20" />
                              </button>
                              <span className="w-8 text-center text-black font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, Math.min(10, item.quantity + 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <Icon icon="mdi:plus" width="20" height="20" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Total Price and Action Buttons */}
                        <div
                          className={
                            "flex flex-col items-end justify-between ml-2 min-h-[96px]"
                          }
                          style={{ minHeight: '96px' }}
                        >
                          <div>
                            <p className="font-semibold text-base lg:text-lg text-black">₱{(item.price * item.quantity).toLocaleString()}</p>
                            {item.originalPrice && (
                              <p className="text-sm text-gray-500 line-through">
                                ₱{(item.originalPrice * item.quantity).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="flex-grow"></div>
                          {/* Action buttons: bottom right on mobile */}
                          <div className="absolute bottom-2 right-2 flex flex-row space-x-2 items-end z-10">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-700 hover:text-red-500 transition-colors flex items-center p-2"
                              aria-label="Remove"
                            >
                              <Icon icon="mdi:delete-outline" />
                            </button>
                            <button
                              className="text-gray-700 hover:text-orange-500 transition-colors flex items-center p-2"
                              aria-label="Save for later"
                            >
                              <Icon icon="mdi:heart-outline" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Order Summary and Shipping */}
          <div className="lg:col-span-4">
           
            {/* Sticky wrapper for order summary and shipping */}
            <div className="lg:sticky lg:top-8">
              <div className="space-y-4 lg:space-y-6">
                {/* Order Summary */}
                <div className="bg-white p-4 lg:p-8 border border-gray-200 shadow-sm rounded-xl">
                  <h2 className="text-lg lg:text-xl font-extrabold mb-4 lg:mb-5 text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>Order Summary</h2>
                  
                  {/* Promo Code Section */}
                  <div className="mb-4 lg:mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black text-sm lg:text-base"
                      />
                      <button className="px-3 lg:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-200 transition-colors text-sm lg:text-base">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium text-sm lg:text-base">Subtotal</span>
                      <span className="font-semibold text-black text-sm lg:text-base">₱{calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-semibold text-sm lg:text-base">
                      <span>Discount</span>
                      <span>-₱{calculateDiscount().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium text-sm lg:text-base">Shipping</span>
                      <span className="font-semibold text-black text-sm lg:text-base">₱{calculateShipping().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium text-sm lg:text-base">Tax (12% VAT)</span>
                      <span className="font-semibold text-black text-sm lg:text-base">₱{calculateTax().toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 lg:pt-4 flex justify-between font-extrabold text-base lg:text-lg">
                      <span className="text-black">Total</span>
                      <span className="text-black">₱{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-black hover:bg-orange-500 text-white py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg shadow transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <Icon icon="mdi:lock-outline" className="mr-2" />
                    PROCEED TO CHECKOUT
                  </button>
                  <p className="text-xs text-center mt-3 lg:mt-4 text-gray-500">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>

                {/* Shipping Estimate */}
                <div className="bg-white p-4 lg:p-8 rounded-xl border border-gray-200 shadow-sm">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowShipping(!showShipping)}
                  >
                    <div className="flex items-center">
                      <Icon icon="mdi:truck-delivery-outline" width="24" height="24" className="mr-3 lg:mr-4 text-black" />
                      <span className="font-semibold text-black text-base lg:text-lg">Estimate Shipping</span>
                    </div>
                    <Icon 
                      icon={showShipping ? "mdi:chevron-up" : "mdi:chevron-down"} 
                      width="20" 
                      height="20" 
                      className="text-gray-500 transition-transform duration-200"
                    />
                  </div>
                  {showShipping && (
                    <div className="mt-4 space-y-3 lg:space-y-4 bg-white p-3 lg:p-4 rounded-lg shadow-sm border border-gray-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          type="text"
                          value={shippingAddress.street}
                          onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white text-black text-sm lg:text-base"
                          placeholder="Enter street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <div className="relative">
                          <select
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white text-black appearance-none text-sm lg:text-base"
                          >
                            <option value="">Select a city</option>
                            <option value="San Pablo City">San Pablo City</option>
                            <option value="Quezon">Quezon</option>
                            <option value="Laguna">Laguna</option>
                            <option value="Cavite">Cavite</option>
                            <option value="Batangas">Batangas</option>
                            <option value="Camarines Sur">Camarines Sur</option>
                            <option value="Sorsogon">Sorsogon</option>
                            <option value="La Union">La Union</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <Icon icon="mdi:chevron-down" width="20" height="20" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white text-black text-sm lg:text-base"
                          placeholder="Enter postal code"
                        />
                      </div>
                      <div className="pt-2">
                        <p className="text-xs lg:text-sm text-gray-600">
                          Estimated delivery: 3-5 business days
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600 mt-1">
                          Shipping cost: ₱{calculateShipping().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;