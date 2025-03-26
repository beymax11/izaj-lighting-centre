import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Checkout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-gray-300 bg-white">
        <button className="text-black text-lg">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-2xl font-bold text-black">IZAJ</h1>
        <FontAwesomeIcon icon={faShoppingCart} className="text-black text-xl" />
      </header>

      <div className="p-4 md:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left - Form */}
        <div>
          {/* Contact */}
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">Contact</h2>
            <input type="email" placeholder="Email" className="w-full p-3 border rounded mb-2" />
            <label className="text-sm text-gray-600">
              <input type="checkbox" className="mr-2" /> Email me with news and offers
            </label>
          </div>

          {/* Delivery */}
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">Delivery</h2>
            <div className="flex items-center mb-4 space-x-6">
              <label className="flex items-center">
                <input type="radio" name="delivery" checked className="mr-2" /> Ship
              </label>
              <label className="flex items-center">
                <input type="radio" name="delivery" className="mr-2" /> Pickup in store
              </label>
            </div>
            <select className="w-full p-3 border rounded mb-4">
              <option>Philippines</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="p-3 border rounded" />
              <input type="text" placeholder="Last name" className="p-3 border rounded" />
            </div>
            <input type="text" placeholder="Company (optional)" className="w-full mt-4 p-3 border rounded" />
            <input type="text" placeholder="Address" className="w-full mt-4 p-3 border rounded" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="Postal code" className="p-3 border rounded" />
              <input type="text" placeholder="City" className="p-3 border rounded" />
            </div>
            <select className="w-full mt-4 p-3 border rounded">
              <option>Laguna</option>
            </select>
            <input type="text" placeholder="Phone" className="w-full mt-4 p-3 border rounded" />
            <label className="text-sm text-gray-600 mt-2 block">
              <input type="checkbox" className="mr-2" /> Save this information for next time
            </label>
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">Shipping method</h2>
            <div className="border p-4 rounded flex justify-between items-center">
              <span>Rest of Philippines</span>
              <span className="font-medium">₱2,500.00</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">Payment</h2>
            <p className="text-sm text-gray-500 mb-2">All transactions are secure and encrypted</p>
            <div className="bg-gray-50 border p-6 rounded-lg">
              <img src="secure-payment.png" alt="Secure Payment" className="h-16 mb-4" />
              <p className="text-sm text-gray-600 text-center">
                After clicking "Pay now", you will be redirected to Secure Payments to complete your purchase securely.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-black mb-4">Billing address</h2>
            <label className="block mb-2">
              <input type="radio" name="billing" checked className="mr-2" /> Same as shipping address
            </label>
            <label className="block">
              <input type="radio" name="billing" className="mr-2" /> Use a different billing address
            </label>
          </div>

          <button className="mt-6 w-full py-3 bg-black text-white font-semibold rounded hover:bg-gray-800">
            Pay now
          </button>

          <div className="mt-6 text-xs text-gray-500 space-x-4">
            <a href="#" className="hover:underline">Refund policy</a>
            <a href="#" className="hover:underline">Privacy policy</a>
            <a href="#" className="hover:underline">Terms of service</a>
            <a href="#" className="hover:underline">Cancellation policy</a>
          </div>
        </div>

        {/* Right - Summary */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="ceiling-light.jpg"
              alt="Product"
              className="w-24 h-24 rounded-md object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-black">Aberdeen | Modern LED Chandelier</p>
              <p className="text-xs text-red-500">Monthly Deals (₱1,000)</p>
              <p className="text-xs text-gray-400 line-through">₱16,995.00</p>
              <p className="text-sm font-medium text-black">₱15,995.00</p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Discount code or gift card"
            className="w-full p-3 border rounded mb-3"
          />
          <button className="w-full bg-black text-white py-2 rounded mb-4">Apply</button>

          <div className="text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal - 1 item</span>
              <span>₱15,995.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₱2,500.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-black">
              <span>Total</span>
              <span>₱18,495.00</span>
            </div>
            <p className="text-xs text-green-600 mt-2">✔ TOTAL SAVINGS ₱1,000.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;