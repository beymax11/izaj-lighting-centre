import { useState } from "react";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('ship');
  const [billingAddress, setBillingAddress] = useState('same');
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header with subtle shadow and improved spacing */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        {/* Left - Back Button with hover effect */}
        <div className="flex-1">
          <Link to="/" className="flex items-center text-gray-700 hover:text-black transition-colors">
            <Icon icon="mdi:arrow-left" className="text-2xl" />
            <span className="ml-2 hidden sm:inline text-sm">Continue Shopping</span>
          </Link>
        </div>
        
        {/* Center - Enhanced Logo */}
        <div className="flex items-center justify-center flex-1">
          <Link to="/" className="flex flex-col items-center">
            <div
              className="text-5xl tracking-wide leading-tight"
              style={{ 
                color: "#000000",
                fontFamily: "'Playfair Display', serif",
                textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)",
                letterSpacing: "10px",
              }}
            >
              IZAJ
            </div>
          </Link>
        </div>
        
        {/* Right - Cart icon */}
        <div className="flex-1 flex justify-end">
          <button className="relative p-2">
            <Icon icon="mdi:cart-outline" className="text-2xl text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
          </button>
        </div>
      </header>

      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8 hidden md:block">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</div>
              <span className="mt-2 text-xs text-black font-medium">Information</span>
            </div>
            <div className="h-1 flex-1 bg-gray-300 mx-2">
              <div className="h-full bg-black w-0"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">2</div>
              <span className="mt-2 text-xs text-gray-500">Shipping</span>
            </div>
            <div className="h-1 flex-1 bg-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">3</div>
              <span className="mt-2 text-xs text-gray-500">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left - Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-medium text-gray-800">Contact Information</h2>
                <div className="text-sm text-gray-500">
                  Have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                </div>
              </div>
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="mdi:email-outline" className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                />
              </div>
              <label className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 mr-2" /> 
                Email me with news and exclusive offers
              </label>
            </div>

            {/* Delivery */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-800 mb-5">Delivery Method</h2>
              <div className="flex items-center mb-6 space-x-4">
                <label className="flex items-center p-3 border rounded-md cursor-pointer transition-all w-1/2 hover:border-black" style={{ borderColor: deliveryMethod === 'ship' ? 'black' : '#e5e7eb' }}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    checked={deliveryMethod === 'ship'} 
                    onChange={() => setDeliveryMethod('ship')}
                    className="mr-2 text-black focus:ring-black" 
                  /> 
                  <div>
                    <div className="font-medium">Ship</div>
                    <div className="text-xs text-gray-500">Delivered to your address</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer transition-all w-1/2 hover:border-black" style={{ borderColor: deliveryMethod === 'pickup' ? 'black' : '#e5e7eb' }}>
                  <input 
                    type="radio"
                    name="delivery" 
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                    className="mr-2 text-black focus:ring-black" 
                  /> 
                  <div>
                    <div className="font-medium">Pickup</div>
                    <div className="text-xs text-gray-500">Collect from our store</div>
                  </div>
                </label>
              </div>

              <div className="space-y-4">
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                  <option>Philippines</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  <input type="text" placeholder="Last name" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <input type="text" placeholder="Company (optional)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                <input type="text" placeholder="Address" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Postal code" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  <input type="text" placeholder="City" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                  <option>Laguna</option>
                </select>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:phone" className="text-gray-400" />
                  </div>
                  <input type="text" placeholder="Phone" className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
              <label className="inline-flex items-center text-sm text-gray-600 mt-4 block hover:text-gray-800 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 mr-2" /> 
                Save this information for next time
              </label>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-800 mb-5">Shipping Method</h2>
              <div className="border border-gray-300 hover:border-black p-4 rounded-md flex justify-between items-center cursor-pointer transition-all">
                <div>
                  <div className="font-medium">Rest of Philippines</div>
                  <div className="text-xs text-gray-500">3-5 business days</div>
                </div>
                <span className="font-medium">₱2,500.00</span>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-800 mb-2">Payment</h2>
              <p className="text-sm text-gray-500 mb-4 flex items-center">
                <Icon icon="mdi:shield-check" className="mr-1 text-green-500" />
                All transactions are secure and encrypted
              </p>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                <div className="flex flex-wrap gap-3 mb-4 justify-center">
                  <img src="/paypal.png" alt="Paypal" className="h-10 object-contain" />
                  <img src="/maya.png" alt="Maya" className="h-10 object-contain" />
                  <img src="/gcash.png" alt="GCash" className="h-10 object-contain" />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  After clicking "Complete order", you will be redirected to our secure payment gateway to complete your purchase.
                </p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-800 mb-5">Billing Address</h2>
              <label className="flex items-center p-3 border rounded-md cursor-pointer transition-all mb-3 hover:border-black" style={{ borderColor: billingAddress === 'same' ? 'black' : '#e5e7eb' }}>
                <input 
                  type="radio" 
                  name="billing" 
                  checked={billingAddress === 'same'} 
                  onChange={() => setBillingAddress('same')}
                  className="mr-2 text-black focus:ring-black" 
                /> 
                <span>Same as shipping address</span>
              </label>
              <label className="flex items-center p-3 border rounded-md cursor-pointer transition-all hover:border-black" style={{ borderColor: billingAddress === 'different' ? 'black' : '#e5e7eb' }}>
                <input 
                  type="radio" 
                  name="billing" 
                  checked={billingAddress === 'different'} 
                  onChange={() => setBillingAddress('different')}
                  className="mr-2 text-black focus:ring-black" 
                /> 
                <span>Use a different billing address</span>
              </label>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-medium text-gray-800 mb-5">Order Summary</h2>
              
              <div className="max-h-64 overflow-auto mb-6">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="relative bg-gray-100 rounded-md overflow-hidden w-24 h-24 flex-shrink-0">
                    <img
                      src="/aber.webp"
                      alt="Aberdeen Chandelier"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-0 right-0 bg-black text-white text-xs px-1.5 py-0.5">1</span>
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
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md transition-colors font-medium">Apply</button>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal (1 item)</span>
                  <span className="font-medium">₱15,995.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₱2,500.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
                  <span className="font-medium text-gray-800">Total</span>
                  <div className="text-right">
                    <span className="block font-bold text-gray-900 text-lg">₱18,495.00</span>
                    <span className="block text-xs text-gray-500">Including VAT</span>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-medium flex items-center">
                  <Icon icon="mdi:check-circle" className="mr-1" />
                  Total savings: ₱1,000.00
                </p>
              </div>

              <button className="w-full py-4 bg-black hover:bg-gray-800 text-white font-medium rounded-md transition-colors flex items-center justify-center">
                <span>Complete order</span>
                <Icon icon="mdi:arrow-right" className="ml-2" />
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By completing your purchase, you agree to our <a href="#" className="underline hover:text-gray-800">Terms of Service</a>.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
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