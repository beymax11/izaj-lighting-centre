import { Icon } from '@iconify/react';
import { useState } from 'react';
import { ViewType } from '../types';

interface StockProps {
  onViewChange: (view: ViewType) => void;
}

function Stock({ onViewChange }: StockProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentView] = useState<'stock' | 'restock'>('stock');

  const products = [
    {
      id: 'PROD-000001',
      name: 'Progress Lighting Ceiling',
      price: '₱ 3,999',
      sold: 93,
      stock: 123,
      status: 'Active'
    },
    {
      id: 'PROD-000002',
      name: 'LED Surface Panel Ceiling Light',
      price: '₱ 3,999',
      sold: 73,
      stock: 99,
      status: 'Active'
    },
    // ...existing products...
  ];

  return (
    <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 overflow-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-3">
            <Icon icon="mdi:package-variant" className="text-2xl sm:text-3xl text-red-400" />
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
              >
                Stock
                <Icon icon="mdi:chevron-down" className="text-xl" />
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                  <button
                    onClick={() => onViewChange('products')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Icon icon="mdi:grid" className="text-lg" />
                    Products
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm bg-yellow-50 text-black font-medium hover:bg-yellow-100 flex items-center gap-2 border-l-4 border-yellow-400"
                  >
                    <Icon icon="mdi:package-variant" className="text-lg" />
                    Stock
                  </button>
                  <button
                    onClick={() => onViewChange('sale')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Icon icon="mdi:tag-outline" className="text-lg" />
                    Sale
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {currentView === 'restock' 
              ? 'Manage product restocking and inventory replenishment' 
              : 'Manage product inventory and stock levels'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon icon="mdi:package" className="text-xl sm:text-2xl text-purple-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">All Products</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">1,223</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon icon="mdi:check-circle" className="text-xl sm:text-2xl text-green-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Active Products</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">1,200</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Icon icon="mdi:shopping" className="text-xl sm:text-2xl text-yellow-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Product Sold</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">6,789</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 mb-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <select className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm">
              <option>All Product</option>
            </select>
            <select className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm">
              <option>Category: All Category</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full lg:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600">Active</span>
                <div className="w-10 h-5 bg-green-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600">In-Active</span>
                <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-sm text-gray-500 border-b border-gray-200">
                <th className="font-medium text-left py-3 sm:py-4 px-2 sm:px-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="font-medium text-left py-3 sm:py-4 px-2 sm:px-4">Product Name</th>
                <th className="font-medium text-left py-3 sm:py-4 px-2 sm:px-4">Price</th>
                <th className="font-medium text-left py-3 sm:py-4 px-2 sm:px-4">Sold</th>
                <th className="font-medium text-left py-3 sm:py-4 px-2 sm:px-4">Stock</th>
                <th className="font-medium text-left py-3 sm:py-4 px-2 sm:px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">{product.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">ID: {product.id}</p>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base">{product.price}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base">{product.sold}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <span className={`font-medium text-sm sm:text-base ${product.stock < 100 ? 'text-orange-500' : 'text-green-500'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                      product.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
export default Stock;

