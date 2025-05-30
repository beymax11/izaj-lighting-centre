import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface FavoritesDropdownProps {
  user: { name: string; email: string } | null;
}

export default function FavoritesDropdown({ user }: FavoritesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const favorites = [
    { id: 1, name: 'Chandelier 001', link: '/item-description', image: '/chandelier.avif' },
    { id: 2, name: 'Pendant Light', link: '/item-description', image: '/pendant.avif' },
  ];

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-black hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
        aria-label="Favorites"
      >
        <Icon icon="mdi:heart-outline" width="28" height="28" />
        {user && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            {favorites.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden border border-gray-100 animate-fade-in backdrop-blur-sm">
          <div className="py-5 px-7 bg-gradient-to-r from-orange-100 via-white to-orange-50 border-b border-gray-200 flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-xl">
              <Icon icon="mdi:heart" className="text-orange-500 w-7 h-7" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>My Favorites</h3>
          </div>

          <div className="max-h-[28rem] overflow-y-auto custom-scrollbar">
            {user ? (
              favorites.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {favorites.map((item) => (
                    <li key={item.id} className="flex items-center px-7 py-5 hover:bg-orange-50/50 transition-all duration-300 group">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mr-5 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          to={item.link}
                          className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors text-lg"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {item.name}
                        </Link>
                        <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                          <Icon icon="mdi:lightbulb-outline" className="w-4 h-4" />
                          Lighting Fixture
                        </div>
                      </div>
                      <Link
                        to={item.link}
                        className="ml-3 text-orange-500 hover:text-orange-700 transition-all duration-300 transform hover:translate-x-1"
                        aria-label="View"
                      >
                        <Icon icon="mdi:arrow-right" className="w-6 h-6" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <div className="bg-orange-100/50 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon icon="mdi:heart-off-outline" className="h-12 w-12 text-orange-300" />
                  </div>
                  <p className="text-base">No favorite items yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Start adding items to your favorites!</p>
                </div>
              )
            ) : (
              <div className="py-12 px-8 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white">
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-6 mb-5 shadow-lg">
                  <Icon icon="mdi:heart-off-outline" className="h-14 w-14 text-orange-400" />
                </div>
                <div className="font-bold text-gray-800 text-xl mb-2">Sign in to view your favorites</div>
                <div className="text-gray-500 text-sm mb-6 text-center max-w-xs">
                  Save and access your favorite items across all your devices.
                </div>
                <button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
                >
                  Login / Register
                </button>
              </div>
            )}
          </div>

          {user && (
            <div className="px-7 py-5 border-t border-gray-100 bg-gradient-to-r from-orange-50 to-white flex justify-between items-center">
              <Link
                to="/my-favorites"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors flex items-center gap-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Icon icon="mdi:format-list-bulleted" className="w-5 h-5" />
                View All Favorites
              </Link>
              <button
                className="text-gray-400 hover:text-red-500 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-red-50"
                title="Clear all favorites"
              >
                <Icon icon="mdi:delete-outline" className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
