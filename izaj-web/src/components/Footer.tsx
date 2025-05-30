import React from 'react';
import { Icon } from '@iconify/react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer Section */}
      <div className="bg-white py-12 mt-12">
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
      <footer className="bg-white text-black py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Footer Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Our Company */}
            <div>
              <h3 className="font-semibold text-lg mb-4">OUR COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
                <li><a href="#about-us" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#subscribe" className="hover:text-orange-500 transition-colors">Subscribe</a></li>
              </ul>
            </div>
      
            {/* More Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">MORE INFO</h3>
              <ul className="space-y-2">
                <li><a href="#delivery" className="hover:text-orange-500 transition-colors">Delivery & Installation</a></li>
                <li><a href="#privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#returns" className="hover:text-orange-500 transition-colors">Returns & Refunds</a></li>
                <li><a href="#help" className="hover:text-orange-500 transition-colors">Help & FAQs</a></li>
                <li><a href="#terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</a></li>
                <li><a href="#warranty" className="hover:text-orange-500 transition-colors">Warranty Terms</a></li>
                <li><a href="#careers" className="hover:text-orange-500 transition-colors">Careers</a></li>
              </ul>
            </div>
      
            {/* Connect with Us */}
            <div>
              <h3 className="font-semibold text-lg mb-4">CONNECT WITH US</h3>
              <ul className="space-y-2">
                <li><a href="tel:+639123456789" className="hover:text-orange-500 transition-colors">+639123456789</a></li>
                <li><a href="mailto:example@gmail.com" className="hover:text-orange-500 transition-colors">example@gmail.com</a></li>
                <li><a href="https://wa.me/639123456789" className="hover:text-orange-500 transition-colors">WhatsApp</a></li>
                <li><a href="https://m.me/yourpage" className="hover:text-orange-500 transition-colors">Messenger</a></li>
              </ul>
            </div>
      
            {/* Our Location */}
            <div>
              <h3 className="font-semibold text-lg mb-4">OUR LOCATION</h3>
              <p className="mb-2">Izaj Lighting Centre</p>
              <p className="text-gray-600 mb-6">San Pablo - 173 I, San Pablo City, 4000 Laguna</p>
              <h3 className="font-semibold text-lg mb-4">OUR BRANCHES</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Quezon</li>
                <li>Laguna</li>
                <li>Cavite</li>
                <li>Batangas</li>
                <li>Camarines Sur</li>
                <li>Sorsogon</li>
                <li>La Union</li>
              </ul>
            </div>
      
            {/* Payments Method */}
            <div>
              <h3 className="font-semibold text-lg mb-4">PAYMENTS METHOD</h3>
              <img src="payments.png" alt="Payment Methods" className="w-full max-w-xs" />
            </div>
          </div>
      
          {/* Bottom Footer */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>© 2025 IZAJ LIGHTING CENTRE. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer; 