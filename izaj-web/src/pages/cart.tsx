import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import "../App.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

// Cart Component
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Aberdeen | Modern LED Chandelier",
      price: 15995,
      originalPrice: 16995,
      quantity: 1,
      image: "ceiling.jpg",
      isSelected: false
    },
    {
      id: 2,
      name: "Vienna | Crystal Pendant Light",
      price: 12995,
      originalPrice: 14995,
      quantity: 2,
      image: "ceiling.jpg",
      isSelected: false
    },
    {
      id: 3,
      name: "Oslo | Minimalist Wall Sconce",
      price: 8995,
      originalPrice: 9995,
      quantity: 1,
      image: "ceiling.jpg",
      isSelected: false
    },
    {
      id: 4,
      name: "Stockholm | Industrial Floor Lamp",
      price: 18995,
      originalPrice: 19995,
      quantity: 1,
      image: "ceiling.jpg",
      isSelected: false
    }
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems(items => items.map(item => ({ ...item, isSelected: !selectAll })));
  };

  const handleItemSelect = (id: number) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    ));
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
    return cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Proceeding to checkout...');
  };

  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [showShipping, setShowShipping] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Philippines'
  });

  const calculateShipping = () => {
    // Simple shipping calculation based on city
    const shippingRates = {
      'Manila': 200,
      'Quezon City': 250,
      'Makati': 200,
      'Pasig': 250,
      'Taguig': 250,
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

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <div className="max-w-[94%] mx-auto mt-8 px-5 sm:px-8 ml-6 mr-6">
        {/* Shopping Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-wider text-black" >
           Cart
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="mr-2" />
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Side - Cart Items */}
          <div className="col-span-12 lg:col-span-9">
        {/* Cart Table Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-32 h-32 mb-6 text-gray-300">
                    <Icon icon="mdi:cart-outline" width="128" height="128" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 text-center mb-8">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <button 
                    onClick={() => window.history.back()}
                    className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 transition-colors flex items-center"
                  >
                    <Icon icon="mdi:arrow-left" className="mr-2" />
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
          {/* Table Header */}
                  <div className="grid grid-cols-12 border-b border-gray-100 py-6 px-10 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-3xl">
            <div className="col-span-6">
              <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-black cursor-pointer" 
                        />
                        <span className="ml-4 font-semibold text-base tracking-wide text-black">PRODUCT</span>
              </div>
            </div>
            <div className="col-span-2 text-base font-semibold text-black">UNIT PRICE</div>
            <div className="col-span-2 text-base font-semibold text-black">QUANTITY</div>
            <div className="col-span-1 text-base font-semibold text-black">TOTAL</div>
            <div className="col-span-1 text-base font-semibold text-black">ACTIONS</div>
          </div>

                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 items-center py-8 px-10 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="col-span-6">
              <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={item.isSelected}
                            onChange={() => handleItemSelect(item.id)}
                            className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-black cursor-pointer" 
                          />
                          <div className="w-32 h-32 ml-6 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white flex items-center justify-center relative group">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-yellow-300 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                    Best Seller
                  </span>
                </div>
                          <div className="ml-8">
                  <p className="font-bold text-lg text-black hover:text-orange-500 cursor-pointer transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                              {item.name}
                  </p>
                            <p className="text-sm text-gray-500 mt-2">
                    Dispatched within 7 working days
                  </p>
                            <div className="mt-4">
                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full inline-flex items-center font-semibold shadow">
                      Monthly Deals (-₱1,000)
                                <button 
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="ml-2 hover:text-red-800 font-bold"
                                >
                                  ×
                                </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
                        <p className="font-bold text-lg text-black">₱{item.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-400 line-through mt-1">₱{item.originalPrice.toLocaleString()}</p>
            </div>
            <div className="col-span-2">
              <div className="relative inline-block">
                          <select 
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="form-select w-24 pl-3 pr-8 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-black focus:border-black text-base shadow cursor-pointer appearance-none z-10"
                            style={{
                              backgroundColor: 'white',
                              color: 'black'
                            }}
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option 
                                key={num} 
                                value={num}
                                className="bg-white text-black py-2"
                              >
                                {num}
                              </option>
                            ))}
                </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <Icon icon="mdi:chevron-down" width="20" height="20" />
                          </div>
              </div>
            </div>
                      <div className="col-span-1 font-bold text-lg text-black">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors rounded-full p-2.5 bg-gray-100 hover:bg-red-100"
                        >
                <Icon icon="mdi:delete" width="22" height="22" />
              </button>
            </div>
          </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Right Side - Order Summary and Shipping */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
          {/* Order Summary */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl shadow-lg p-8 border border-yellow-200 sticky top-8">
              <h2 className="text-xl font-extrabold mb-5 text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-black">₱{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount</span>
                  <span>-₱{calculateDiscount().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Shipping</span>
                  <span className="font-semibold text-black">₱{calculateShipping().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Tax (12% VAT)</span>
                  <span className="font-semibold text-black">₱{calculateTax().toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between font-extrabold text-lg">
                  <span>Total</span>
                  <span className="text-black">₱{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-black hover:bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow transition-all duration-200 transform hover:scale-[1.02]"
              >
                PROCEED TO CHECKOUT
              </button>
              <p className="text-xs text-center mt-4 text-gray-500">
                Taxes and shipping calculated at checkout
              </p>
            </div>

            {/* Shipping Estimate */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowShipping(!showShipping)}
              >
                <div className="flex items-center">
                  <Icon icon="mdi:truck-delivery-outline" width="28" height="28" className="mr-4 text-black" />
                  <span className="font-semibold text-black text-lg">Estimate Shipping</span>
                </div>
                <Icon 
                  icon={showShipping ? "mdi:chevron-up" : "mdi:chevron-down"} 
                  width="22" 
                  height="22" 
                  className="text-gray-500 transition-transform duration-200"
                />
              </div>
              {showShipping && (
                <div className="mt-4 space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white text-black"
                      placeholder="Enter street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white text-black appearance-none"
                      style={{ zIndex: 20 }}
                    >
                      <option value="">Select a city</option>
                      <option value="Manila">Manila</option>
                      <option value="Quezon City">Quezon City</option>
                      <option value="Makati">Makati</option>
                      <option value="Pasig">Pasig</option>
                      <option value="Taguig">Taguig</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <Icon icon="mdi:chevron-down" width="20" height="20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white text-black"
                      placeholder="Enter postal code"
                    />
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      Estimated delivery: 3-5 business days
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Shipping cost: ₱{calculateShipping().toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* You may also like - Moved to bottom */}
        <div className="mt-16 px-16 mx-16">
          {/* Title */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-black text-left" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
            You may also like
          </h2>
            <Link
              to="/product-list"
              className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
            >
              View all
            </Link>
          </div>
          
          <div className="relative group" style={{
            height: "500px",
            overflow: "hidden",
          }}>
            {/* First Page with 4 items */}
            <div
              className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
              style={{
                opacity: currentDealIndex === 0 ? 1 : 0,
                transform: `translateX(${currentDealIndex === 0 ? "0" : "-100%"})`,
                pointerEvents: currentDealIndex === 0 ? "auto" : "none",
              }}
            >
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-grow">
                    <img
                      src="ceiling.jpg"
                      alt="Product"
                      className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                      MONTHLY DEALS
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-4">Modern LED Chandelier</h3>
                  <p className="text-gray-500 text-sm line-through">₱16,995</p>
                  <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
                  <Link to="/item-description">
                    <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                      CHOOSE OPTIONS
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Second Page with next 4 items */}
            <div
              className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
              style={{
                opacity: currentDealIndex === 1 ? 1 : 0,
                transform: `translateX(${currentDealIndex === 1 ? "0" : "100%"})`,
                pointerEvents: currentDealIndex === 1 ? "auto" : "none",
              }}
            >
              {[5, 6, 7, 8].map((i) => (
                <div key={i} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-grow">
                    <img
                      src="ceiling.jpg"
                      alt="Product"
                      className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                      MONTHLY DEALS
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-4">Modern LED Chandelier</h3>
                  <p className="text-gray-500 text-sm line-through">₱16,995</p>
                  <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
                  <Link to="/item-description">
                    <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                      CHOOSE OPTIONS
                </button>
                  </Link>
              </div>
            ))}
            </div>

            {/* Navigation Buttons */}
            {currentDealIndex === 1 && (
              <button
                onClick={() => setCurrentDealIndex(0)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
                style={{ zIndex: 10 }}
              >
                <Icon icon="mdi:chevron-left" className="h-6 w-6 text-gray-600" width="24" height="24" />
              </button>
            )}

            {currentDealIndex === 0 && (
              <button
                onClick={() => setCurrentDealIndex(1)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
                style={{ zIndex: 10 }}
              >
                <Icon icon="mdi:chevron-right" className="h-6 w-6 text-gray-600" width="24" height="24" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;