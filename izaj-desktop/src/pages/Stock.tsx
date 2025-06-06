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
    <main className="flex-1 px-8 py-6 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-3">
            <Icon icon="mdi:package-variant" className="text-3xl text-red-400" />
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
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
          <p className="text-gray-500 mt-1">
            {currentView === 'restock' 
              ? 'Manage product restocking and inventory replenishment' 
              : 'Manage product inventory and stock levels'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon icon="mdi:package" className="text-2xl text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">All Products</p>
                <p className="text-xl font-bold text-gray-800">1,223</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon icon="mdi:check-circle" className="text-2xl text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Products</p>
                <p className="text-xl font-bold text-gray-800">1,200</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Icon icon="mdi:shopping" className="text-2xl text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Product Sold</p>
                <p className="text-xl font-bold text-gray-800">6,789</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
              <option>All Product</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
              <option>Category: All Category</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-600">Active</span>
                <div className="w-10 h-5 bg-green-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-600">In-Active</span>
                <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500 border-b border-gray-200">
              <th className="font-medium text-left py-4 px-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="font-medium text-left py-4 px-4">Product Name</th>
              <th className="font-medium text-left py-4 px-4">Price</th>
              <th className="font-medium text-left py-4 px-4">Sold</th>
              <th className="font-medium text-left py-4 px-4">Stock</th>
              <th className="font-medium text-left py-4 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                  </div>
                </td>
                <td className="py-4 px-4">{product.price}</td>
                <td className="py-4 px-4">{product.sold}</td>
                <td className="py-4 px-4">
                  <span className={`font-medium ${product.stock < 100 ? 'text-orange-500' : 'text-green-500'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
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
    </main>
  );
}
export default Stock;

