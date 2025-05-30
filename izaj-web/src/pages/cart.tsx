import React from 'react';

import { Icon } from '@iconify/react';
import "../App.css";


// Cart Component
const Cart: React.FC = () => {




  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      }}
    >
     

   

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6">
        {/* Shopping Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold tracking-wider text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shopping Cart
          </h1>
         
        </div>

        {/* Cart Table Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 border-b border-gray-100 py-5 px-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-3xl">
            <div className="col-span-6">
              <div className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-black" />
                <span className="ml-3 font-semibold text-base tracking-wide text-black">PRODUCT</span>
              </div>
            </div>
            <div className="col-span-2 text-base font-semibold text-black">UNIT PRICE</div>
            <div className="col-span-2 text-base font-semibold text-black">QUANTITY</div>
            <div className="col-span-1 text-base font-semibold text-black">TOTAL</div>
            <div className="col-span-1 text-base font-semibold text-black">ACTIONS</div>
          </div>

          {/* Product Item */}
          <div className="grid grid-cols-12 items-center py-8 px-8 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="col-span-6">
              <div className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-black" />
                <div className="w-28 h-28 ml-4 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white flex items-center justify-center relative">
                  <img
                    src="ceiling.jpg"
                    alt="Aberdeen Modern LED Chandelier"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-yellow-300 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                    Best Seller
                  </span>
                </div>
                <div className="ml-6">
                  <p className="font-bold text-lg text-black hover:text-orange-500 cursor-pointer transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Aberdeen | Modern LED Chandelier
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Dispatched within 7 working days
                  </p>
                  <div className="mt-3">
                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full inline-flex items-center font-semibold shadow">
                      Monthly Deals (-₱1,000)
                      <button className="ml-2 hover:text-red-800 font-bold">×</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <p className="font-bold text-lg text-black">₱15,995</p>
              <p className="text-sm text-gray-400 line-through">₱16,995</p>
            </div>
            <div className="col-span-2">
              <div className="relative inline-block">
                <select className="form-select w-24 pl-3 pr-8 py-2 border-gray-300 rounded-lg focus:ring-black focus:border-black text-base shadow">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
            <div className="col-span-1 font-bold text-lg text-black">₱15,995</div>
            <div className="col-span-1">
              <button className="text-gray-400 hover:text-red-600 transition-colors rounded-full p-2 bg-gray-100 hover:bg-red-100">
                <Icon icon="mdi:delete" width="22" height="22" />
              </button>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="mt-10 grid grid-cols-12 gap-8">
          {/* Shipping Estimate */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center">
                  <Icon icon="mdi:truck-delivery-outline" width="28" height="28" className="mr-4 text-orange-500" />
                  <span className="font-semibold text-black text-lg">Estimate Shipping</span>
                </div>
                <Icon icon="mdi:chevron-down" width="22" height="22" className="text-gray-500" />
              </div>
              <div className="mt-4 text-gray-500 text-sm">
                Enter your address at checkout to see shipping options and rates.
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl shadow-lg p-8 border border-yellow-200">
              <h2 className="text-xl font-extrabold mb-5 text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-black">₱15,995</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount</span>
                  <span>-₱1,000</span>
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between font-extrabold text-lg">
                  <span>Total</span>
                  <span className="text-black">₱14,995</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-orange-500 hover:to-yellow-400 text-white py-4 rounded-xl font-bold text-lg shadow transition-all duration-200">
                PROCEED TO CHECKOUT
              </button>
              <p className="text-xs text-center mt-4 text-gray-500">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>

        {/* You may also like */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-black mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 p-4 flex flex-col items-center">
                <img src="ceiling.jpg" alt="Product" className="w-32 h-32 object-cover rounded-lg mb-3" />
                <div className="font-semibold text-black mb-1">Modern LED Chandelier</div>
                <div className="text-orange-500 font-bold mb-1">₱12,995</div>
                <button className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-500 transition-colors text-sm">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    
                      
                         
                     
    </div>
  );
};

export default Cart;