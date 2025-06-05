import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showCookieModal, setShowCookieModal] = useState(false);

  // State for cookie category expansion
  const [isPerformanceExpanded, setIsPerformanceExpanded] = useState(false);
  const [isFunctionalExpanded, setIsFunctionalExpanded] = useState(false);
  const [isTargetingExpanded, setIsTargetingExpanded] = useState(false);

  // State for cookie toggle status
  const [isPerformanceEnabled, setIsPerformanceEnabled] = useState(true); // Assuming enabled by default based on image
  const [isFunctionalEnabled, setIsFunctionalEnabled] = useState(true); // Assuming enabled by default
  const [isTargetingEnabled, setIsTargetingEnabled] = useState(true); // Assuming enabled by default

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fil', name: 'Filipino' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const handleCookieSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCookieModal(true);
  };

  const handleCloseCookieModal = () => {
    setShowCookieModal(false);
  };

  // Handlers for expanding/collapsing cookie categories
  const togglePerformanceExpanded = () => setIsPerformanceExpanded(!isPerformanceExpanded);
  const toggleFunctionalExpanded = () => setIsFunctionalExpanded(!isFunctionalExpanded);
  const toggleTargetingExpanded = () => setIsTargetingExpanded(!isTargetingExpanded);

  // Handlers for toggling cookie status
  const togglePerformanceEnabled = () => setIsPerformanceEnabled(!isPerformanceEnabled);
  const toggleFunctionalEnabled = () => setIsFunctionalEnabled(!isFunctionalEnabled);
  const toggleTargetingEnabled = () => setIsTargetingEnabled(!isTargetingEnabled);

  const handleOnlyNecessaryClick = () => {
    // Logic for only necessary cookies
    console.log('Only Necessary Cookies clicked');
    handleCloseCookieModal();
  };

  const handleConfirmChoicesClick = () => {
    // Logic for confirming choices
    console.log('Confirm My Choices clicked');
    console.log('Performance Cookies Enabled:', isPerformanceEnabled);
    console.log('Functional Cookies Enabled:', isFunctionalEnabled);
    console.log('Targeting Cookies Enabled:', isTargetingEnabled);
    handleCloseCookieModal();
  };

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
              <Link to="/subscribe" className="bg-black text-white font-semibold rounded-full px-8 py-3 mt-2 hover:bg-gray-800 transition-colors inline-block">Join for free</Link>
            </div>
            {/* Our Company */}
            <div>
              <h3 className="font-bold text-xl mb-4 tracking-tight">OUR COMPANY</h3>
              <ul className="space-y-3">
                <li><a href="/" className="hover:text-orange-500 transition-colors text-base text-gray-700">Home</a></li>
                <li><a href="/aboutus" className="hover:text-orange-500 transition-colors text-base text-gray-700">About Us</a></li>
                <li><a href="/contactus" className="hover:text-orange-500 transition-colors text-base text-gray-700">Contact Us</a></li>
              </ul>
            </div>
            {/* More Info */}
            <div>
              <h3 className="font-bold text-xl mb-4 tracking-tight">MORE INFO</h3>
              <ul className="space-y-3">
                <li><a href="/delivery" className="hover:text-orange-500 transition-colors text-base text-gray-700">Delivery & Installation</a></li>
                <li><a href="/privacypolicy" className="hover:text-orange-500 transition-colors text-base text-gray-700">Privacy Policy</a></li>
                <li><a href="/return" className="hover:text-orange-500 transition-colors text-base text-gray-700">Returns & Refunds</a></li>
                <li><a href="/help" className="hover:text-orange-500 transition-colors text-base text-gray-700">Help & FAQs</a></li>
                <li><a href="/term" className="hover:text-orange-500 transition-colors text-base text-gray-700">Terms & Conditions</a></li>
                <li><a href="/warranty" className="hover:text-orange-500 transition-colors text-base text-gray-700">Warranty Terms</a></li>
                <li><a href="/career" className="hover:text-orange-500 transition-colors text-base text-gray-700">Careers</a></li>
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
              <button 
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Icon icon="mdi:translate" width="20" height="20" className="text-gray-700" />
                <span className="text-gray-700">{selectedLanguage}</span>
                <Icon 
                  icon="mdi:chevron-down" 
                  width="20" 
                  height="20" 
                  className={`text-gray-700 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language.name)}
                        className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                          selectedLanguage === language.name ? 'bg-gray-50 font-medium' : ''
                        }`}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
              <a href="#" className="hover:underline" onClick={handleCookieSettingsClick}>Cookie settings</a>
              <a href="/termofuse" className="hover:underline">Terms of use</a>
              <a href="/termsofpurchase" className="hover:underline">Terms of purchase</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Settings Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-start">
          <div className={`relative w-96 md:w-[1200px] bg-white h-full shadow-xl transform transition-transform ease-in-out duration-300 ${showCookieModal ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
            {/* Close Button */}
            <button onClick={handleCloseCookieModal} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
              <Icon icon="mdi:close" width="24" height="24" className="text-gray-700" />
            </button>

            <div className="p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">Cookie Preferences</h2>
              <p className="text-gray-600 text-sm mb-6">
                When you visit any website, it may store or retrieve information
                on your browser, mostly in the form of cookies. This information
                might be about you, your preferences or your device and is
                mostly used to make the site work as you expect it to. The
                information does not usually directly identify you, but it can give
                you a more personalised web experience. Because we respect
                your right to privacy, you can choose not to allow some types of
                cookies. Click on the different category headings to find out
                more and change our default settings. However, blocking some
                types of cookies may impact your experience of the site and the
                services we are able to offer.
              </p>
              <a href="#" className="text-blue-600 hover:underline text-sm">More information</a>

              <h3 className="font-bold text-xl mb-4 mt-8">Manage Cookie Settings</h3>

              {/* Strictly Necessary Cookies */}
              <div className="border-t border-gray-200 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Icon icon="mdi:plus" width="20" height="20" className="text-gray-700" />
                  <span className="font-semibold">Strictly Necessary Cookies</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                  <Icon icon="mdi:check-circle" width="20" height="20" className="text-blue-600" />
                  Always Active
                </div>
              </div>

              {/* Performance Cookies */}
              <div className="border-t border-gray-200">
                <div className="py-4 flex items-center justify-between cursor-pointer" onClick={togglePerformanceExpanded}>
                  <div className="flex items-center gap-2">
                     <Icon icon={isPerformanceExpanded ? "mdi:minus" : "mdi:plus"} width="20" height="20" className="text-gray-700" />
                    <span className="font-semibold">Performance Cookies</span>
                  </div>
                  {/* Toggle */}
                  <button onClick={(e) => { e.stopPropagation(); togglePerformanceEnabled(); }}>
                     <Icon icon={isPerformanceEnabled ? "mdi:toggle-right" : "mdi:toggle-left"} width="40" height="24" className={isPerformanceEnabled ? "text-blue-600" : "text-gray-400"} />
                  </button>
                </div>
                 {isPerformanceExpanded && (
                    <div className="pb-4 text-gray-600 text-sm">
                      <p>Performance cookies are used to collect information about how visitors use the website.</p>
                    </div>
                  )}
              </div>

              {/* Functional Cookies */}
              <div className="border-t border-gray-200">
                <div className="py-4 flex items-center justify-between cursor-pointer" onClick={toggleFunctionalExpanded}>
                  <div className="flex items-center gap-2">
                     <Icon icon={isFunctionalExpanded ? "mdi:minus" : "mdi:plus"} width="20" height="20" className="text-gray-700" />
                    <span className="font-semibold">Functional Cookies</span>
                  </div>
                   {/* Toggle */}
                  <button onClick={(e) => { e.stopPropagation(); toggleFunctionalEnabled(); }}>
                     <Icon icon={isFunctionalEnabled ? "mdi:toggle-right" : "mdi:toggle-left"} width="40" height="24" className={isFunctionalEnabled ? "text-blue-600" : "text-gray-400"} />
                  </button>
                </div>
                 {isFunctionalExpanded && (
                    <div className="pb-4 text-gray-600 text-sm">
                      <p>Functional cookies allow the website to remember choices you make and provide enhanced, more personal features.</p>
                    </div>
                  )}
              </div>

              {/* Targeting Cookies */}
              <div className="border-t border-b border-gray-200">
                <div className="py-4 flex items-center justify-between cursor-pointer" onClick={toggleTargetingExpanded}>
                  <div className="flex items-center gap-2">
                     <Icon icon={isTargetingExpanded ? "mdi:minus" : "mdi:plus"} width="20" height="20" className="text-gray-700" />
                    <span className="font-semibold">Targeting Cookies</span>
                  </div>
                   {/* Toggle */}
                   <button onClick={(e) => { e.stopPropagation(); toggleTargetingEnabled(); }}>
                     <Icon icon={isTargetingEnabled ? "mdi:toggle-right" : "mdi:toggle-left"} width="40" height="24" className={isTargetingEnabled ? "text-blue-600" : "text-gray-400"} />
                  </button>
                </div>
                 {isTargetingExpanded && (
                    <div className="pb-4 text-gray-600 text-sm">
                      <p>Targeting cookies are used to deliver advertisements more relevant to you and your interests.</p>
                    </div>
                  )}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  className="bg-black text-white font-semibold rounded-md px-4 py-3 hover:bg-gray-800 transition-colors flex-1"
                  onClick={handleOnlyNecessaryClick}
                >
                  Only Necessary Cookies
                </button>
                <button 
                  className="bg-white text-black font-semibold rounded-md px-4 py-3 border border-gray-300 hover:bg-gray-100 transition-colors flex-1"
                  onClick={handleConfirmChoicesClick}
                >
                  Confirm My Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;