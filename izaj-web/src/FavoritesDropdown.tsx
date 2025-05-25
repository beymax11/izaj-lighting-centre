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
        className="relative text-black hover:text-orange-500 transition-colors duration-200"
        aria-label="Favorites"
      >
        <Icon icon="mdi:heart-outline" width="28" height="28" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200 animate-fade-in">
          <div className="py-4 px-6 bg-gradient-to-r from-orange-100 via-white to-orange-50 border-b border-gray-200 flex items-center gap-2">
            <Icon icon="mdi:heart" className="text-orange-500 w-6 h-6" />
            <h3 className="font-bold text-gray-800 text-lg tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>My Favorites</h3>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {user ? (
              favorites.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {favorites.map((item) => (
                    <li key={item.id} className="flex items-center px-6 py-4 hover:bg-orange-50 transition-colors group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4 overflow-hidden shadow">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          to={item.link}
                          className="font-medium text-black group-hover:text-orange-500 transition-colors text-base"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {item.name}
                        </Link>
                        <div className="text-xs text-gray-400 mt-1">Lighting Fixture</div>
                      </div>
                      <Link
                        to={item.link}
                        className="ml-2 text-orange-500 hover:text-orange-700 transition-colors"
                        aria-label="View"
                      >
                        <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-8 text-center text-gray-500 text-sm">
                  <Icon icon="mdi:heart-off-outline" className="mx-auto h-10 w-10 text-orange-300 mb-2" />
                  No favorite items yet.
                </div>
              )
            ) : (
              <div className="py-10 px-6 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white">
                <div className="bg-orange-100 rounded-full p-4 mb-3 shadow">
                  <Icon icon="mdi:heart-off-outline" className="h-10 w-10 text-orange-400" />
                </div>
                <div className="font-bold text-gray-800 text-lg mb-1">Sign in to view your favorites</div>
                <div className="text-gray-500 text-sm mb-4 text-center">
                  Save and access your favorite items across all your devices.
                </div>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-200"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
                >
                  Login / Register
                </button>
              </div>
            )}
          </div>

          {user && (
            <div className="px-6 py-4 border-t border-gray-100 bg-orange-50 flex justify-between items-center">
              <Link
                to="/my-favorites"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                View All Favorites
              </Link>
              <button
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                title="Clear all favorites"
                // Add your clear logic here if needed
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
