// Products.tsx
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { AddProductModal } from './components/AddProductModal';
import Stock from './pages/Stock';

function Products() {
  const [filter, setFilter] = useState<'all' | 'sale'>('all');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [view, setView] = useState<'products' | 'stock'>('products');

  const products = [
    {
      name: 'LED Surface Panel Light',
      category: 'Ceiling Light',
      price: '₱ 3,999',
      stock: 210,
      status: 'Active',
      variant: null,
      image: '/aber.webp'
    },
    {
      name: 'Plug in Pendant Light',
      category: 'Pendant Light',
      price: '₱ 1,999',
      stock: 16,
      status: 'Active',
      variant: 2,
      image: '/ceiling.jpg'
    },
    {
      name: 'Cluster Chandelier',
      category: 'Chandelier',
      price: '₱ 6,999',
      stock: 0,
      status: 'Out of Stock',
      variant: null,
      image: '/chadelier.jpg'
    },
    {
      name: 'Modern Chandelier Ceiling',
      category: 'Chandelier',
      price: '₱ 5,499',
      stock: 0,
      status: 'Out of Stock',
      variant: null,
      image: '/cluster.jpg'
    },
    {
      name: 'Kovacs 1 Light Arc Floor Lamp',
      category: 'Floor Light',
      price: '₱ 1,499',
      stock: 350,
      status: 'Active',
      variant: 4,
      image: '/floor.jpg'
    },
    {
      name: 'Progress Lightning Ceiling',
      category: 'Ceiling Light',
      price: '₱ 3,999',
      stock: 99,
      status: 'Active',
      variant: null,
      image: '/pendant.jpg'
    },
  ];

  const filteredProducts = filter === 'sale'
    ? products.filter(p => p.variant !== null)
    : products;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <main className="flex-1 px-8 py-6 overflow-y-auto">
        {view === 'stock' ? (
          <Stock 
            onViewChange={(newView => {
              if (newView === 'products') {
                setFilter('all');
                setView('products');
              } else if (newView === 'sale') {
                setFilter('sale');
                setView('products');
              }
              setShowDropdown(false);
            }) as (view: 'products' | 'sale') => void}
          />
        ) : (
          <>
            {/* Header section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:package-variant" className="text-3xl text-red-400" />
                  <div className="relative">
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2 text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
                    >
                      {filter === 'sale' ? 'Sale' : 'Products'}
                      <Icon icon="mdi:chevron-down" className="text-xl" />
                    </button>
                    
                    {/* Updated Dropdown Menu */}
                    {showDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                        <button
                          onClick={() => {
                            setFilter('all');
                            setView('products');
                            setShowDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                            filter === 'all' && view === 'products'
                              ? 'bg-yellow-50 text-black font-medium border-l-4 border-yellow-400'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon icon="mdi:grid" className="text-lg" />
                          Products
                        </button>
                        <button
                          onClick={() => {
                            setView('stock');
                            setShowDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                            view === 'stock'
                              ? 'bg-yellow-50 text-black font-medium border-l-4 border-yellow-400'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon icon="mdi:package-variant" className="text-lg" />
                          Stock
                        </button>
                        <button
                          onClick={() => {
                            setFilter('sale');
                            setView('products');
                            setShowDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                            filter === 'sale' && view === 'products'
                              ? 'bg-yellow-50 text-black font-medium border-l-4 border-yellow-400'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon icon="mdi:tag-outline" className="text-lg" />
                          Sale
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 mt-1">
                  {filter === 'sale' 
                    ? 'Manage product sales and discounts' 
                    : 'Manage product inventory and listings'}
                </p>
              </div>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-red-200 hover:border-red-400 transition-all duration-200"
                style={{
                  boxShadow: '0 4px 24px rgba(252, 211, 77, 0.15)',
                }}
                onClick={() => setShowAddProductModal(true)}
              >
                <Icon icon="mdi:plus-circle" className="text-xl text-red-400" />
                {filter === 'sale' ? 'Add Sale' : 'Add Products'}
              </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-white p-8 mb-8"
              style={{
                boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
              }}>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <button
                    className={`text-black font-semibold border-b-2 flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${filter === 'all' ? 'border-black bg-yellow-50' : 'border-transparent hover:bg-yellow-50'}`}
                    onClick={() => setFilter('all')}
                  >
                    <Icon icon="mdi:format-list-bulleted" width={18} />
                    All
                  </button>
                  <button className="text-gray-500 hover:text-black flex items-center gap-1">
                    <Icon icon="mdi:check-circle-outline" width={18} />
                    Active
                  </button>
                  <button className="text-gray-500 hover:text-black flex items-center gap-1">
                    <Icon icon="mdi:file-document-outline" width={18} />
                    Draft
                  </button>
                  <button className="text-gray-500 hover:text-black flex items-center gap-1">
                    <Icon icon="mdi:archive-outline" width={18} />
                    Archive
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <input type="text" placeholder="Search products..." className="px-4 py-2 border border-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-200 bg-white shadow-sm" />
                  <select className="px-3 py-2 border rounded-lg text-sm">
                    <option>Category</option>
                  </select>
                  <select className="px-3 py-2 border rounded-lg text-sm">
                    <option>Type</option>
                  </select>
                  <button className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1">
                    <Icon icon="mdi:tune-variant" width={16} />
                    Advance Filter
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, idx) => (
                  <div key={idx} 
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-yellow-200 hover:border-yellow-400 transition-all duration-200 flex flex-col justify-between group"
                    style={{
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                    }}>
                    <div className="mb-4">
                      <div className="relative mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-xl bg-gray-100 group-hover:scale-[1.02] transition-transform duration-200"
                        />
                        {product.variant && (
                          <span className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                            {product.variant} variants
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-xl mb-2 text-gray-800">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                      {product.status === 'Active' && (
                        <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">🟢 Active</span>
                      )}
                      {product.status === 'Out of Stock' && (
                        <span className="inline-block px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 font-medium">⭕ Out of Stock</span>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-2xl font-bold text-gray-800">{product.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Stock</p>
                          <p className={`text-lg font-semibold ${
                            product.stock === 0 ? 'text-red-600' : 
                            product.stock < 100 ? 'text-orange-500' : 
                            'text-green-600'
                          }`}>
                            {product.stock}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              product.stock === 0 ? 'bg-red-400' : 
                              product.stock < 100 ? 'bg-orange-400' : 
                              'bg-green-400'
                            }`}
                            style={{ width: `${Math.min(product.stock / 3.5, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Stock level</span>
                          <span>{product.stock === 0 ? 'Out' : product.stock < 100 ? 'Low' : 'High'}</span>
                        </div>
                      </div>

                      <button className="w-full py-3 rounded-xl bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors group-hover:shadow-lg">
                        <Icon icon="mdi:plus-box" width={20} />
                        {product.stock === 0 ? 'RESTOCK NOW' : 'MANAGE STOCK'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal - Modified to handle both Product and Sale */}
            {showAddProductModal && (
              <AddProductModal 
                onClose={() => setShowAddProductModal(false)} 
                mode={filter === 'sale' ? 'sale' : 'product'}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Products;
