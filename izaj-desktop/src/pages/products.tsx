import { Icon } from '@iconify/react';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { AddProductModal } from '../components/AddProductModal';
import { ManageStockModal } from '../components/ManageStockModal';
import Stock from './Stock';
import { ViewType } from '../types';
import { Session } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  product_id: string; 
  category: string;
  price: string;
  quantity: number;
  stock: number;
  status: string;
  variant: number | null;
  image: string;
}

export interface FetchedProduct {
  id: string;
  product_name: string;
  quantity: number;
  product_id: string; 
  price: number;
  status: string;
  category: string | { category_name: string } | null;
  branch: string | { location: string } | null;
  description: string | null;
  image_url: string | null;   
  created_at?: string;
  is_published?: boolean;
}

interface ApiResponse {
  success: boolean;
  products: FetchedProduct[];
  synced: number;
  skipped: number;
  timestamp: string;
}

interface ProductsProps {
  showAddProductModal: boolean;
  setShowAddProductModal: (show: boolean) => void;
  session: Session | null; 
}

export function Products({ showAddProductModal, setShowAddProductModal, session }: ProductsProps) {

  console.log('Products session:',  session?.user.id);

  const [showManageStockModal, setShowManageStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState<'all' | 'sale'>('all');
  const [showDropdown, setShowDropdown] = useState(false);
  const [view, setView] = useState<ViewType>('products');
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);
  const [syncStats, setSyncStats] = useState({ synced: 0, skipped: 0 });
  const [hasLoadedFromDB, setHasLoadedFromDB] = useState(false);
  const fetchingRef = useRef(false);
  const [publishedProducts, setPublishedProducts] = useState<FetchedProduct[]>([]);
  const [pendingProducts, setPendingProducts] = useState<FetchedProduct[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  const filteredProducts = useMemo(() => {
  const products = filter === 'sale' 
    ? publishedProducts.filter(p => p.status === 'Sale') 
    : publishedProducts;
    
    return products.filter(product => 
    product && 
    product.id && 
    product.product_name &&
    product.product_id
  );
}, [publishedProducts, filter]);
  
  const convertFetchedToProduct = (fetchedProduct: FetchedProduct): Product => {
    return {
      id: fetchedProduct.id || '',
      name: fetchedProduct.product_name || 'Unknown Product',
      product_id: fetchedProduct.product_id || '',
      category: typeof fetchedProduct.category === 'object'
        ? fetchedProduct.category?.category_name || 'Uncategorized'
        : fetchedProduct.category || 'Uncategorized',
      price: `₱ ${(fetchedProduct.price || 0).toLocaleString()}`,
      quantity: fetchedProduct.quantity || 0,
      stock: fetchedProduct.quantity || 0,
      status: fetchedProduct.status || 'Unknown',
      variant: null,
      image: fetchedProduct.image_url || '/default-product.jpg'
    };
  };

  const handleViewChange = (newView: ViewType) => {
    if (newView === 'products') {
      setFilter('all');
      setView('products');
    } else if (newView === 'sale') {
      setFilter('sale');
      setView('products');
    } else {
      setView(newView);
    }
    setShowDropdown(false);
  };

  const handleUpdateStock = async (newStock: number) => {
  if (!selectedProduct) return;
  try {
    const response = await fetch(
      `http://localhost:3001/api/products/${selectedProduct.product_id}/stock`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` }),
        },
        body: JSON.stringify({ newStock }),
      }
    );
    const data = await response.json();
    if (response.ok && data.success) {
      toast.success('Stock updated successfully');
      await refreshProductsData();
      setShowManageStockModal(false);
      setPublishedProducts(prev =>
        prev.map(p =>
          p.id === selectedProduct.id
            ? { ...p, quantity: newStock, status: newStock === 0 ? 'Out of Stock' : 'Active' }
            : p
        )
      );
      stockCache.current[selectedProduct.id] = { quantity: newStock, status: newStock === 0 ? 'Out of Stock' : 'Active' };
    } else {
      toast.error(data.error || 'Failed to update stock');
    }
  } catch (err) {
    toast.error('Network error updating stock');
  }
};

  const fetchPendingCount = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/pending-count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && {
            'Authorization': `Bearer ${session.access_token}`
          })
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPendingCount(data.count || 0);
      }
    } catch (error) {
      console.error('Error fetching pending count:', error);
    }
  }, [session?.access_token]);

  const fetchPendingProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && {
            'Authorization': `Bearer ${session.access_token}`
          })
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPendingProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching pending products:', error);
    }
  }, [session?.access_token]);

  const loadExistingProducts = useCallback(async () => {
    if (fetchingRef.current) {
      return;
    }

    fetchingRef.current = true;
    setIsFetching(true);
    
    try {
      const response = await fetch(`http://localhost:3001/api/products/existing?published=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && {
            'Authorization': `Bearer ${session.access_token}`
          })
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.products) {
        const published = data.products?.filter((p: FetchedProduct) => p.is_published === true);
        setPublishedProducts(published);
        setHasLoadedFromDB(true);
      }

    } catch (error) {
      console.error('Error loading existing products:', error);
    } finally {
      setIsFetching(false);
      fetchingRef.current = false;
    }
  }, [session?.access_token]);

  const refreshProductsData = useCallback(async () => {
    console.log('Refreshing products data...');
    await Promise.all([
      loadExistingProducts(),
      fetchPendingCount(),
      fetchPendingProducts()
    ]);
  }, [loadExistingProducts, fetchPendingCount, fetchPendingProducts]);

  const handleFetchProducts = useCallback(async (isManualSync: boolean = true) => {
    if (fetchingRef.current) {
      console.log('Fetch already in progress, skipping...');
      return;
    }

    fetchingRef.current = true;
    setIsFetching(true);
    setFetchSuccess(false);
    
    try {
      const params = new URLSearchParams();
      if (lastFetchTime) {
        params.append('after', lastFetchTime);
      }
      params.append('limit', '100');
      params.append('sync', 'true');
            
      const response = await fetch(`http://localhost:3001/api/products?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && {
            'Authorization': `Bearer ${session.access_token}`
          })
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }

      const newProducts = data.products || [];
      
      if (newProducts.length === 0 && lastFetchTime) {
        toast('No new products to fetch');
        setFetchSuccess(true);
        setSyncStats({ synced: 0, skipped: 0 });
        return;
      }

      setLastFetchTime(data.timestamp);
      localStorage.setItem('lastFetchTime', data.timestamp);
      setFetchSuccess(true);
      setSyncStats({ synced: data.synced, skipped: data.skipped });

      await fetchPendingCount();

      if (isManualSync) {
        const successMessage = newProducts.length === 1 
          ? `Successfully synced 1 product (${data.synced} synced, ${data.skipped} skipped)` 
          : `Successfully synced ${newProducts.length} products (${data.synced} synced, ${data.skipped} skipped)`;
        
        toast.success(successMessage);
      }

    } catch (error) {
      console.error('Error syncing products:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred while syncing products';
      
      if (isManualSync) {
        toast.error(`Failed to sync products: ${errorMessage}`);
      }
      setFetchSuccess(false);
    } finally {
      setIsFetching(false);
      fetchingRef.current = false;
    }
  }, [session?.access_token, lastFetchTime, fetchPendingCount]);

  const handleManualSync = useCallback(() => {
    handleFetchProducts(true);
  }, [handleFetchProducts]);

  const handleAddProductClick = async () => {
    await fetchPendingProducts();
    setShowAddProductModal(true);
  };

  const handleAddProductModalClose = useCallback(async (shouldRefresh: boolean = false) => {
    setShowAddProductModal(false);
    
    // If products were published, refresh the data
    if (shouldRefresh) {
      console.log('Product published, refreshing data...');
      await refreshProductsData();
      toast.success('Products updated successfully!');
    }
  }, [refreshProductsData]);

  const stockCache = useRef<{ [productId: string]: { quantity: number, status: string } }>({});

  const fetchProductStock = async (productId: string) => {
    if (stockCache.current[productId]) {
      return stockCache.current[productId];
    }
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}/stock`, {
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` })
        }
      });
      if (!response.ok) {
        const err = await response.json();
        toast.error(err.error || 'Stock info not available');
        return null;
      }
      const data = await response.json();
      stockCache.current[productId] = { quantity: data.stock, status: data.status };
      return stockCache.current[productId];
    } catch (error) {
      toast.error('Network error fetching stock info');
      return null;
    }
  };

 const handleManageStockModalClose = useCallback(async (shouldRefresh: boolean = false) => {
  setShowManageStockModal(false);
    if (shouldRefresh) {
      console.log('Stock synced, refreshing data...');
      await refreshProductsData();
      toast.success('Products updated successfully!');
    }
  }, [refreshProductsData]);

  useEffect(() => {
    if (session?.user?.id && !hasLoadedFromDB) {
      console.log('Loading existing published products from DB2...');
      loadExistingProducts();
      fetchPendingCount();
    }

    const savedTime = localStorage.getItem('lastFetchTime');
    if (savedTime) {
      setLastFetchTime(savedTime);
    }

  }, [session?.user?.id, loadExistingProducts, hasLoadedFromDB, fetchPendingCount]);

  return (
    <div className="flex-1 overflow-y-auto">
      <main className="flex-1 px-8 py-6">
        {view === 'stock' ? (
          <Stock session={session}
            onViewChange={handleViewChange}
          />
        ) : (
          <>
            {/* Header section */}
            {!showAddProductModal && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:package-variant" className="text-3xl text-red-400" />
                    <div className="relative">
                      <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
                      >
                        {filter === 'sale' ? 'Sale' : 'Products'}
                        <Icon icon="mdi:chevron-down" className="text-xl" />
                      </button>
                      
                      {/* Updated Dropdown Menu */}
                      {showDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                          <button
                            onClick={() => handleViewChange('products')}
                            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                              view === 'products' && filter === 'all'
                                ? 'bg-yellow-50 text-black font-medium border-l-4 border-yellow-400'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon icon="mdi:grid" className="text-lg" />
                            Products
                          </button>
                          <button
                            onClick={() => handleViewChange('stock')}
                            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                              (view as ViewType) === 'stock'
                                ? 'bg-yellow-50 text-black font-medium border-l-4 border-yellow-400'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon icon="mdi:package-variant" className="text-lg" />
                            Stock
                          </button>
                          <button
                            onClick={() => handleViewChange('sale')}
                            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                              filter === 'sale'
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
                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    {filter === 'sale' 
                      ? 'Manage product sales and discounts' 
                      : 'Manage product inventory and listings'}
                  </p>
                  {/* Add sync stats display */}
                  {fetchSuccess && syncStats.synced > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      Last sync: {syncStats.synced} synced, {syncStats.skipped} skipped
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <button
                      onClick={handleManualSync}
                      disabled={isFetching}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-xl font-medium border-2 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:outline-none flex items-center justify-center gap-2 ${
                        fetchSuccess && !isFetching
                          ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 focus:ring-gray-200'
                      }`}
                      style={{ boxShadow: '0 4px 12px 0 rgba(0,0,0,0.12)' }}
                    >
                      <Icon 
                        icon={
                          isFetching 
                            ? "mdi:loading" 
                            : fetchSuccess 
                              ? "mdi:check" 
                              : "mdi:refresh"
                        } 
                        className={`text-xl ${isFetching ? 'animate-spin' : ''}`} 
                      />
                      {isFetching ? 'Syncing...' : fetchSuccess ? 'Synced' : 'Sync'}
                    </button>
                  </div>
                  <button
                    className="flex-1 sm:flex-none w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-200"
                    onClick={() => setShowManageStockModal(true)}
                  >
                    <Icon icon="mdi:sync" className="text-xl" />
                    Manage Stock
                  </button>
                  <button
                    className="flex-1 sm:flex-none w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-black text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-red-200 hover:border-red-400 transition-all duration-200 relative"
                    style={{
                      boxShadow: '0 4px 24px rgba(252, 211, 77, 0.15)',
                    }}
                    onClick={handleAddProductClick}
                  >
                    <Icon icon="mdi:plus-circle" className="text-xl text-red-400" />
                    {filter === 'sale' ? 'Add Sale' : 'Add Products'}
                    {pendingCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {pendingCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-white p-4 sm:p-8 mb-8"
              style={{
                boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
              }}>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 mb-8">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
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
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      className="w-full sm:w-[200px] lg:w-[300px] px-4 py-2 border border-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-200 bg-white shadow-sm" 
                    />
                    <select className="px-3 py-2 border rounded-lg text-sm">
                      <option>Category</option>
                    </select>
                    <select className="px-3 py-2 border rounded-lg text-sm">
                      <option>Type</option>
                    </select>
                    <button className="px-3 py-2 border rounded-lg text-sm flex items-center justify-center gap-1 w-[150px]">
                      <Icon icon="mdi:tune-variant" width={16} />
                      Advance Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading state */}
              {isFetching && !hasLoadedFromDB && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:loading" className="text-2xl animate-spin text-gray-500" />
                    <span className="text-gray-500">Loading products...</span>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!isFetching && filteredProducts.length === 0 && hasLoadedFromDB && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Icon icon="mdi:package-variant-closed" className="text-6xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No products found</h3>
                  <p className="text-gray-400 mb-4">Click the Sync button to fetch products from your inventory.</p>
                </div>
              )}

              {/* Products grid */}
              {filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} 
                      className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-yellow-200 hover:border-yellow-400 transition-all duration-200 flex flex-col justify-between group"
                      style={{
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                      }}>
                      <div className="mb-4">
                        <div className="relative mb-4">
                          <img
                            src="/default-product.jpg"
                            alt={product.product_name}
                            className="w-full h-40 sm:h-48 object-cover rounded-xl bg-gray-100 group-hover:scale-[1.02] transition-transform duration-200"
                          />
                        </div>
                        <h3 className="font-semibold text-lg sm:text-xl mb-2 text-gray-800">{product.product_name}</h3>
                        <div className="space-y-1 mb-2">
                          <p className="text-gray-500 text-sm">
                            Category: {
                              typeof product.category === 'object'
                                ? product.category?.category_name
                                : product.category || 'Uncategorized'
                            }
                          </p>
                          {product.branch && (
                            <p className="text-gray-500 text-sm">
                              Branch: {
                                typeof product.branch === 'object'
                                  ? product.branch?.location
                                  : product.branch
                              }
                            </p>
                          )}
                        </div>
                        <span className={`inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full ${
                          product.status === 'Active' || product.status === 'active'
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        } font-medium`}>
                          {(product.status === 'Active' || product.status === 'active') ? '🟢 Active' : '⭕ Out of Stock'}
                        </span>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3 sm:pt-4">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">Price</p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-800">
                              ₱ {(product.price && typeof product.price === 'number') ? product.price.toLocaleString() : '0'}
                            </p>                          
                          </div>
                          <div className="text-right">
                            <p className="text-xs sm:text-sm text-gray-500">Stock</p>
                            <p className={`text-base sm:text-lg font-semibold ${
                              product.quantity === 0 ? 'text-red-600' : 
                              product.quantity < 100 ? 'text-orange-500' : 
                              'text-green-600'
                            }`}>
                              {product.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                product.quantity === 0 ? 'bg-red-400' : 
                                product.quantity < 100 ? 'bg-orange-400' : 
                                'bg-green-400'
                              }`}
                              style={{ width: `${Math.min(product.quantity / 3.5, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Stock level</span>
                            <span>{product.quantity === 0 ? 'Out' : product.quantity < 100 ? 'Low' : 'High'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modals */}
            {showAddProductModal && (
              <AddProductModal
                session={session}
                onClose={() => handleAddProductModalClose(false)}
                onSuccess={() => handleAddProductModalClose(true)}
                mode={filter === 'sale' ? 'sale' : 'product'}
                fetchedProducts={pendingProducts}
              />
            )}
            {/* Manage Stock Modal */}
            {showManageStockModal && (
              <ManageStockModal
                session={session}
                onClose={() => handleManageStockModalClose(true)} 
                publishedProducts={publishedProducts}
                setPublishedProducts={setPublishedProducts}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}