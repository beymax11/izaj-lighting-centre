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
        <Icon icon="mdi:heart-outline" className="w-7 h-7 translate-y-1" />
        {user && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            {favorites.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
          <div className="py-2 px-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">My Favorites</h3>
            {user && (
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {user ? (
              favorites.length > 0 ? (
                <div>
                  {favorites.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <Link
                            to={item.link}
                            className="text-sm text-gray-800 font-medium hover:text-orange-500"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Icon icon="mdi:lightbulb-outline" className="w-3 h-3" />
                            Lighting Fixture
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Icon icon="mdi:heart-off-outline" className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-gray-500">No favorite items yet</p>
                </div>
              )
            ) : (
              <div className="py-8 text-center">
                <Icon icon="mdi:account-alert-outline" className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600">Login first to see your favorites</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
