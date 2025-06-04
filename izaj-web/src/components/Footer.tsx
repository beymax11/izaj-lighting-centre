import React from 'react';
import { Icon } from '@iconify/react';


const Footer: React.FC = () => {
  return (
    <>
      {/* Featured Section */}
      <div className="bg-white py-12 mt-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Delivery & Installation */}
            <div className="flex items-start">
              <Icon icon="mdi:truck-delivery-outline" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-black">Free delivery & installation</h3>
                <p className="text-gray-600">For orders P10,000.00 and above within Metro Manila.</p>
              </div>
            </div>
        
            {/* Phone Contact */}
            <div className="flex items-start">
              <Icon icon="mdi:phone-outline" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-black">Phone Contact</h3>
                <p className="text-gray-600">Monday to Sunday 9:00am - 5:00pm</p>
              </div>
            </div>
        
            {/* Top-notch support */}
            <div className="flex items-start">
              <Icon icon="mdi:headset" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-black">Top-notch support</h3>
                <p className="text-gray-600">Any question? Our team is just one click away!</p>
              </div>
            </div>
        
            {/* Secure payments */}
            <div className="flex items-start">
              <Icon icon="mdi:lock-outline" width="32" height="32" className="text-black mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-black">Secure payments</h3>
                <p className="text-gray-600">Your payment information is processed securely</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Footer */}
      <footer className="bg-gray-50 text-black py-20">
        <div className="max-w-7xl mx-auto pl-0 pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-24">
            {/* IZAJ Family */}
            <div>
              <h3 className="font-bold text-2xl mb-4">IZAJ Family</h3>
              <p className="text-gray-700 mb-6 max-w-xs">Unlock exclusive deals and special offers just for you! Subscribe now and be the first to know about flash sales, discounts, and new arrivals!</p>
              <button className="bg-black text-white font-semibold rounded-full px-8 py-3 mt-2 hover:bg-gray-800 transition-colors">Join for free</button>
            </div>
            {/* Our Company */}
            <div>
              <h3 className="font-bold text-xl mb-4 tracking-tight">OUR COMPANY</h3>
              <ul className="space-y-3">
                <li><a href="/" className="hover:text-orange-500 transition-colors text-base text-gray-700">Home</a></li>
                <li><a href="/aboutus" className="hover:text-orange-500 transition-colors text-base text-gray-700">About Us</a></li>
                <li><a href="/contactus" className="hover:text-orange-500 transition-colors text-base text-gray-700">Contact Us</a></li>
                <li><a href="/ourteam" className="hover:text-orange-500 transition-colors text-base text-gray-700">Our Team</a></li>
              </ul>
            </div>
            {/* More Info */}
            <div>
              <h3 className="font-bold text-xl mb-4 tracking-tight">MORE INFO</h3>
              <ul className="space-y-3">
                <li><a href="/delivery" className="hover:text-orange-500 transition-colors text-base text-gray-700">Delivery & Installation</a></li>
                <li><a href="/privacypolicy" className="hover:text-orange-500 transition-colors text-base text-gray-700">Privacy Policy</a></li>
                <li><a href="/return" className="hover:text-orange-500 transition-colors text-base text-gray-700">Returns & Refunds</a></li>
                <li><a href="#help" className="hover:text-orange-500 transition-colors text-base text-gray-700">Help & FAQs</a></li>
                <li><a href="#terms" className="hover:text-orange-500 transition-colors text-base text-gray-700">Terms & Conditions</a></li>
                <li><a href="#warranty" className="hover:text-orange-500 transition-colors text-base text-gray-700">Warranty Terms</a></li>
                <li><a href="#careers" className="hover:text-orange-500 transition-colors text-base text-gray-700">Careers</a></li>
              </ul>
            </div>
            {/* Connect with Us */}
            <div>
              <h3 className="font-bold text-xl mb-4 tracking-tight">OUR LOCATION</h3>
              <ul className="space-y-3">
                <li><a href="tel:+639123456789" className="hover:text-orange-500 transition-colors text-base text-gray-700">173 1, San Pablo City, 4000 Laguna</a></li>
         
              </ul>
            </div>
            {/* Our Location */}
            <div>
              <h3 className="font-bold text-xl mb-4 tracking-tight">OUR BRANCHES</h3>
              <ul className="space-y-2 text-gray-500 text-base">
                <li>Quezon</li>
                <li>Laguna</li>
                <li>Cavite</li>
                <li>Batangas</li>
                <li>Camarines Sur</li>
                <li>Sorsogon</li>
                <li>La Union</li>
              </ul>
            </div>
          </div>
          {/* Social and Payment Icons Bar */}
          <div className="max-w-7xl pl-0 pr-4 flex flex-wrap items-center justify-between mt-16">
            <div className="flex items-center gap-6">
              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="rounded-full border border-gray-200 w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Icon icon="mdi:facebook" width="24" height="24" className="text-gray-700" />
                </a>
                <a href="#" className="rounded-full border border-gray-200 w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Icon icon="mdi:youtube" width="24" height="24" className="text-gray-700" />
                </a>
                <a href="#" className="rounded-full border border-gray-200 w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Icon icon="mdi:instagram" width="24" height="24" className="text-gray-700" />
                </a>
                <a href="#" className="rounded-full border border-gray-200 w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Icon icon="mdi:pinterest" width="24" height="24" className="text-gray-700" />
                </a>
                <a href="#" className="rounded-full border border-gray-200 w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Icon icon="ri:tiktok-fill" width="24" height="24" className="text-gray-700" />
                </a>
              </div>
              {/* Payment Icons */}
              <div className="flex gap-4 ml-8">
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-12 flex items-center justify-center">
                  <img src="/gcash2.png" alt="GCash" className="h-6" />
                </div>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-12 flex items-center justify-center">
                  <img src="/maya2.png" alt="Maya" className="h-8 w-auto object-contain" />
                </div>
                <div className="rounded-lg border border-gray-200 bg-white w-16 h-12 flex items-center justify-center">
                  <img src="/paypal2.png" alt="PayPal" className="h-6" />
                </div>
              </div>
            </div>
            {/* Language Selector */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Icon icon="mdi:translate" width="20" height="20" className="text-gray-700" />
                <span className="text-gray-700">English</span>
                <Icon icon="mdi:chevron-down" width="20" height="20" className="text-gray-700" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">English</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Filipino</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">日本語</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">한국어</a>
                </div>
              </div>
            </div>
          </div>
          {/* Divider Line */}
          <hr className="my-6 border-gray-200" />
          {/* Bottom Footer Info */}
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2">
            <div className="text-gray-700 text-sm">
              © Izaj Lighting Centre 2024
              <br />
              IZAJ (PHILIPPINES), INC. (Registration No. 123456789)
            </div>
            <div className="flex flex-wrap gap-6 text-gray-700 text-sm">
              <a href="/cookiepolicy" className="hover:underline">Cookie policy</a>
              <a href="#" className="hover:underline">Cookie settings</a>
             
              <a href="/termofuse" className="hover:underline">Terms of use</a>
              <a href="/termsofpurchase" className="hover:underline">Terms of purchase</a>
            </div>
          </div>
        </div>
      </footer>
     
    </>
  );
};

export default Footer; 