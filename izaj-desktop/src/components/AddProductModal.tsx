import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { FetchedProductSlide } from './FetchedProductSlide';
import { Session } from '@supabase/supabase-js';

interface FetchedProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

interface AddProductModalProps {
  session: Session | null;
  onClose: () => void;
  mode: 'product' | 'sale';
  fetchedProducts: FetchedProduct[];
}

export function AddProductModal({ onClose, mode, fetchedProducts, session }: AddProductModalProps) {
  const [showFullForm, setShowFullForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FetchedProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: ''
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (product: FetchedProduct) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.image
    });
    setShowFullForm(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? fetchedProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === fetchedProducts.length - 1 ? 0 : prev + 1));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50 p-4 sm:p-6 overflow-y-auto" onClick={onClose}>
      <div
        className={`bg-white w-full max-w-5xl min-h-[400px] rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden transform transition-all relative flex flex-col justify-between my-4 sm:my-6`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        }}
        onClick={(e) => e.stopPropagation()}>
      
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-yellow-100 text-gray-500 hover:text-yellow-600 shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all z-10"
          aria-label="Close"
        >
          <Icon icon="mdi:close" className="text-xl sm:text-2xl" />
        </button>

        {/* Content */}
        <div className={`p-4 sm:p-7 space-y-5 sm:space-y-7 overflow-y-auto max-h-[calc(100vh-8rem)] ${mode === 'product' && !showFullForm ? 'flex-1 flex flex-col justify-center' : ''}`}>
          {mode === 'sale' ? (
            // Sale form content
            <div className="space-y-5 sm:space-y-7">
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Icon icon="mdi:tag-outline" className="text-lg sm:text-xl text-yellow-500" />
                  Sale Details
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all">
                    <option>Select Product</option>
                  </select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Discount Type</label>
                      <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all">
                        <option>Percentage</option>
                        <option>Fixed Amount</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Discount Value</label>
                      <input
                        type="number"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Start Date</label>
                      <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
                        onFocus={e => (e.target.type = 'date')}
                        onBlur={e => (e.target.type = 'text')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">End Date</label>
                      <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
                        onFocus={e => (e.target.type = 'date')}
                        onBlur={e => (e.target.type = 'text')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Product form content
            <div className="space-y-5 sm:space-y-7">
              {!showFullForm ? (
                fetchedProducts.length > 0 ? (
                  <FetchedProductSlide
                    session={session}
                    fetchedProducts={fetchedProducts}
                    currentIndex={currentIndex}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    handleAdd={handleAdd}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4 sm:px-6">
                    <Icon icon="mdi:package-variant-closed" className="text-4xl sm:text-6xl text-gray-300 mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No new products in inventory</h3>
                    <p className="text-sm sm:text-base text-gray-500 max-w-[280px] sm:max-w-[320px]">Try fetching inventory to see available products</p>
                  </div>
                )
              ) : (
                // Show full form
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Icon icon="mdi:package-outline" className="text-lg sm:text-xl text-yellow-500" />
                      Product Details
                    </h3>
                  </div>
                  {selectedProduct && (
                    <div className="mb-6 sm:mb-8">
                      <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-yellow-100 bg-gradient-to-br from-yellow-50 via-white to-white p-4 sm:p-8">
                        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
                          {/* Left: Image */}
                          <div className="w-full lg:w-2/5 flex-shrink-0 flex justify-center items-start">
                            <img
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              className="w-full max-w-md max-h-[20rem] sm:max-h-[28rem] object-cover rounded-xl sm:rounded-2xl border border-yellow-100 shadow"
                            />
                          </div>
                          {/* Right: Product Info */}
                          <div className="w-full lg:w-3/5 flex flex-col gap-4 sm:gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              <div className="bg-white/80 rounded-xl p-3 sm:p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Product Name</span>
                                <span className="text-lg sm:text-xl font-bold text-yellow-700 block">{selectedProduct.name}</span>
                              </div>
                              <div className="bg-white/80 rounded-xl p-3 sm:p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Price</span>
                                <span className="text-lg sm:text-xl font-bold text-yellow-700 block">{selectedProduct.price}</span>
                              </div>
                              <div className="bg-white/80 rounded-xl p-3 sm:p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Category</span>
                                <span className="text-base sm:text-lg font-semibold text-gray-800 block">{selectedProduct.category}</span>
                              </div>
                              <div className="bg-white/80 rounded-xl p-3 sm:p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Insert Media</span>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  onChange={handleFileSelect}
                                />
                                <button
                                  onClick={handleUploadButtonClick}
                                  className="w-full py-2 sm:py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-sm sm:text-base"
                                >
                                  <Icon icon="mdi:upload" width={18} />
                                  {selectedFile ? `Selected: ${selectedFile.name}` : 'Upload Photo/Video'}
                                </button>
                              </div>
                              <div className="bg-white/80 rounded-xl p-3 sm:p-5 shadow-sm border border-yellow-100 sm:col-span-2">
                                <label htmlFor="product-description" className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Product Details</label>
                                <textarea
                                  id="product-description"
                                  value={formData.description}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  className="w-full text-sm sm:text-base text-gray-700 block border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                                  rows={4}
                                  placeholder="Type your product description here..."
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {(mode === 'sale' || fetchedProducts.length > 0) && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 w-full gap-3 sm:gap-2">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button className="px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Icon icon="mdi:content-save-outline" className="text-lg sm:text-xl" />
                Save as Draft
              </button>
              <button className="px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Icon icon="mdi:archive-outline" className="text-lg sm:text-xl" />
                Archive
              </button>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 sm:px-8 py-2 sm:py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              {/* Show Add button in footer only in slide view */}
              {mode === 'product' && !showFullForm && (
                <button
                  onClick={() => handleAdd(fetchedProducts[currentIndex])}
                  className="flex-1 sm:flex-none px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold shadow hover:from-yellow-500 hover:to-yellow-400 transition-colors text-base sm:text-xl tracking-wide rounded-xl flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:plus-circle" className="text-xl sm:text-2xl align-middle" />
                  Add
                </button>
              )}
              {(showFullForm || mode === 'sale') && (
                <button 
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none px-4 sm:px-8 py-2 sm:py-3 rounded-xl bg-black text-white font-medium border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-sm sm:text-base"
                  style={{ boxShadow: '0 4px 12px 0 rgba(0,0,0,0.12)' }}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
