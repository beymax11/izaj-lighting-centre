import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface FavoritesDropdownProps {
  user: { name: string; email: string } | null;
}

export default function FavoritesDropdown({ user }: FavoritesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const favorites = [
    { id: 1, name: 'Chandelier 001', link: '/item-description' },
    { id: 2, name: 'Pendant Light', link: '/item-description' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-black hover:text-orange-500 transition-colors duration-200"
        aria-label="Favorites"
      >
        <Icon icon="mdi:heart-outline" width="28" height="28" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
          <div className="py-2 px-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">My Favorites</h3>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {user ? (
              favorites.length > 0 ? (
                favorites.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="block px-4 py-3 text-sm text-black hover:bg-gray-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500 text-sm">
                  No favorite items yet.
                </div>
              )
            ) : (
              <div className="py-8 text-center">
                <Icon icon="mdi:account-alert-outline" className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600 text-sm">Login first to see your favorites</p>
              </div>
            )}
          </div>

          {user && (
            <div className="px-4 py-2 border-t border-gray-100">
              <Link
                to="/my-favorites"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View All Favorites
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
