"use client";

import { useState } from "react";
import { Icon } from '@iconify/react';

const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('ship');
  const [billingAddress, setBillingAddress] = useState('same');
  
  return (
    <div className="min-h-screen bg-white to-white font-sans">
     {/* Header */}
     <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <Icon icon="mdi:shield-check" className="text-blue-600 text-2xl" />
            <span className="text-base font-semibold text-gray-800">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-screen">
          {/* Left - Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Icon icon="mdi:account" className="text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
                </div>
                <div className="text-sm text-gray-500">
                  Have an account? <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Log in</a>
                </div>
              </div>
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="mdi:email-outline" className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full pl-10 p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" 
                />
              </div>
              <label className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 mr-2" /> 
                Email me with news and exclusive offers
              </label>
            </div>

            {/* Delivery */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Icon icon="mdi:truck-delivery" className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Delivery Method</h2>
              </div>
              <div className="flex items-center mb-6 space-x-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-all w-1/2 hover:border-blue-500 hover:bg-blue-50" style={{ borderColor: deliveryMethod === 'ship' ? '#3B82F6' : '#e5e7eb' }}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    checked={deliveryMethod === 'ship'} 
                    onChange={() => setDeliveryMethod('ship')}
                    className="mr-3 text-blue-600 focus:ring-blue-500" 
                  /> 
                  <div>
                    <div className="font-medium text-gray-800">Ship</div>
                    <div className="text-xs text-gray-500">Delivered to your address</div>
                  </div>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-all w-1/2 hover:border-blue-500 hover:bg-blue-50" style={{ borderColor: deliveryMethod === 'pickup' ? '#3B82F6' : '#e5e7eb' }}>
                  <input 
                    type="radio"
                    name="delivery" 
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                    className="mr-3 text-blue-600 focus:ring-blue-500" 
                  /> 
                  <div>
                    <div className="font-medium text-gray-800">Pickup</div>
                    <div className="text-xs text-gray-500">Collect from our store</div>
                  </div>
                </label>
              </div>

              <div className="space-y-4">
                <select className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black">
                  <option>Philippines</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" />
                  <input type="text" placeholder="Last name" className="p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" />
                </div>
                <input type="text" placeholder="Company (optional)" className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" />
                <input type="text" placeholder="Address" className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Postal code" className="p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" />
                  <input type="text" placeholder="City" className="p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" />
                </div>
                <select className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black">
                  <option>Laguna</option>
                </select>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:phone" className="text-gray-400" />
                  </div>
                  <input type="text" placeholder="Phone" className="w-full pl-10 p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black" />
                </div>
              </div>
              <label className="inline-flex items-center text-sm text-gray-600 mt-4 block hover:text-gray-800 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 mr-2" /> 
                Save this information for next time
              </label>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Icon icon="mdi:package-variant" className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Shipping Method</h2>
              </div>
              <div className="border border-gray-200 hover:border-blue-500 hover:bg-blue-50 p-5 rounded-lg flex justify-between items-center cursor-pointer transition-all">
                <div>
                  <div className="font-medium text-gray-800">Rest of Philippines</div>
                  <div className="text-xs text-gray-500">3-5 business days</div>
                </div>
                <span className="font-semibold text-gray-900">₱2,500.00</span>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Icon icon="mdi:credit-card" className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Payment</h2>
              </div>
              <p className="text-sm text-gray-500 mb-6 flex items-center">
                <Icon icon="mdi:shield-check" className="mr-2 text-green-500 text-lg" />
                All transactions are secure and encrypted
              </p>
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl">
                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                  <img src="/paypal.png" alt="Paypal" className="h-12 object-contain hover:opacity-80 transition-opacity" />
                  <img src="/maya.png" alt="Maya" className="h-12 object-contain hover:opacity-80 transition-opacity" />
                  <img src="/gcash.png" alt="GCash" className="h-12 object-contain hover:opacity-80 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  After clicking "Complete order", you will be redirected to our secure payment gateway to complete your purchase.
                </p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Icon icon="mdi:map-marker" className="text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Billing Address</h2>
              </div>
              <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-all mb-3 hover:border-blue-500 hover:bg-blue-50" style={{ borderColor: billingAddress === 'same' ? '#3B82F6' : '#e5e7eb' }}>
                <input 
                  type="radio" 
                  name="billing" 
                  checked={billingAddress === 'same'} 
                  onChange={() => setBillingAddress('same')}
                  className="mr-3 text-blue-600 focus:ring-blue-500" 
                /> 
                <span className="text-gray-800">Same as shipping address</span>
              </label>
              <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50" style={{ borderColor: billingAddress === 'different' ? '#3B82F6' : '#e5e7eb' }}>
                <input 
                  type="radio" 
                  name="billing" 
                  checked={billingAddress === 'different'} 
                  onChange={() => setBillingAddress('different')}
                  className="mr-3 text-blue-600 focus:ring-blue-500" 
                /> 
                <span className="text-gray-800">Use a different billing address</span>
              </label>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-5 h-fit">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="max-h-64 overflow-auto mb-6 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden w-24 h-24 flex-shrink-0">
                    <img
                      src="/aber.webp"
                      alt="Aberdeen Chandelier"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-bl-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Aberdeen | Modern LED Chandelier</p>
                    <p className="text-sm text-red-500 font-medium">Monthly Deals (₱1,000 OFF)</p>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-400 line-through mr-2">₱16,995.00</p>
                      <p className="text-sm font-medium text-black">₱15,995.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Discount code or gift card"
                    className="flex-1 p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black"
                  />
                  <button className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-lg transition-colors font-medium">Apply</button>
                </div>
              </div>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal (1 item)</span>
                  <span className="font-medium">₱15,995.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₱2,500.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-base">
                  <span className="font-medium text-gray-800">Total</span>
                  <div className="text-right">
                    <span className="block font-bold text-gray-900 text-lg">₱18,495.00</span>
                    <span className="block text-xs text-gray-500">Including VAT</span>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-medium flex items-center">
                  <Icon icon="mdi:check-circle" className="mr-2 text-lg" />
                  Total savings: ₱1,000.00
                </p>
              </div>

              <button className="w-full py-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center group">
                <span>Complete order</span>
                <Icon icon="mdi:arrow-right" className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By completing your purchase, you agree to our <a href="#" className="underline hover:text-gray-800">Terms of Service</a>.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-800 hover:underline">Refund policy</a>
              <a href="#" className="hover:text-gray-800 hover:underline">Privacy policy</a>
              <a href="#" className="hover:text-gray-800 hover:underline">Terms of service</a>
              <a href="#" className="hover:text-gray-800 hover:underline">Cancellation policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;