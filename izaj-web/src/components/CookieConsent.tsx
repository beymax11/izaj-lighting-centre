import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';

const COOKIE_KEY = 'cookieConsent';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setIsVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'false');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const modal = (
    <div className="fixed bottom-6 left-6 z-[99999] max-w-sm w-[340px] animate-fade-in">
      <div className="relative rounded-lg border border-gray-200 shadow-2xl shadow-black/40 bg-gradient-to-br from-white via-gray-50 to-gray-200 p-5">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        {/* Cookie Icon */}
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="mdi:cookie" className="w-8 h-8 text-black" />
          <h3 className="text-lg font-semibold text-gray-900">We Value Your Privacy</h3>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/cookiepolicy" className="underline text-blue-600 hover:text-blue-800">Cookie Policy</a>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition-colors text-sm"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors text-sm"
          >
            Decline
          </button>
        </div>
      </div>
      {/* Animation style */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CookieConsent; 