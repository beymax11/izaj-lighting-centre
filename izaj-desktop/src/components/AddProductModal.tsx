import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { FetchedProductSlide } from './FetchedProductSlide';

interface FetchedProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

interface AddProductModalProps {
  onClose: () => void;
  mode: 'product' | 'sale';
  fetchedProducts: FetchedProduct[];
}

export function AddProductModal({ onClose, mode, fetchedProducts }: AddProductModalProps) {
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50" onClick={onClose}>
      <div
        className={`bg-white max-w-5xl w-full min-h-[400px] rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden transform transition-all relative flex flex-col justify-between`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        }}
        onClick={(e) => e.stopPropagation()}>
      
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-yellow-100 text-gray-500 hover:text-yellow-600 shadow focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
          aria-label="Close"
        >
          <Icon icon="mdi:close" className="text-2xl" />
        </button>

        {/* Content */}
        <div className={`p-7 space-y-7 ${mode === 'product' && !showFullForm ? 'flex-1 flex flex-col justify-center' : ''}`}>
          {mode === 'sale' ? (
            // Sale form content
            <div className="space-y-7">
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Icon icon="mdi:tag-outline" className="text-xl text-yellow-500" />
                  Sale Details
                </h3>
                <div className="space-y-5">
                  <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all">
                    <option>Select Product</option>
                    {/* Add product options here */}
                  </select>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                      <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all">
                        <option>Percentage</option>
                        <option>Fixed Amount</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
                        onFocus={e => (e.target.type = 'date')}
                        onBlur={e => (e.target.type = 'text')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
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
            <div className="space-y-7">
              {!showFullForm ? (
                fetchedProducts.length > 0 ? (
                  <FetchedProductSlide
                    fetchedProducts={fetchedProducts}
                    currentIndex={currentIndex}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    handleAdd={handleAdd}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Icon icon="mdi:package-variant-closed" className="text-6xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No new products in inventory</h3>
                    <p className="text-gray-500">Try fetching inventory to see available products</p>
                  </div>
                )
              ) : (
                // Show full form
                <div className="space-y-5">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Icon icon="mdi:package-outline" className="text-xl text-yellow-500" />
                      Product Details
                    </h3>
                  
                  </div>
                  {selectedProduct && (
                    <div className="mb-8">
                      <div className="rounded-3xl overflow-hidden shadow-xl border border-yellow-100 bg-gradient-to-br from-yellow-50 via-white to-white p-8">
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                          {/* Left: Image */}
                          <div className="w-full lg:w-2/5 flex-shrink-0 flex justify-center items-start">
                            <img
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              className="w-full max-w-md max-h-[28rem] object-cover rounded-2xl border border-yellow-100 shadow"
                            />
                          </div>
                          {/* Right: Product Info */}
                          <div className="w-full lg:w-3/5 flex flex-col gap-6">
                            <div className="flex items-center justify-between mb-2">
                             
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Product Name</span>
                                <span className="text-xl font-bold text-yellow-700 block">{selectedProduct.name}</span>
                              </div>
                              <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Price</span>
                                <span className="text-xl font-bold text-yellow-700 block">{selectedProduct.price}</span>
                              </div>
                              <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Category</span>
                                <span className="text-lg font-semibold text-gray-800 block">{selectedProduct.category}</span>
                              </div>
                              <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-yellow-100">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Insert Media</span>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  onChange={handleFileSelect}
                                />
                                <button
                                  onClick={handleUploadButtonClick}
                                  className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                >
                                  <Icon icon="mdi:upload" width={20} />
                                  {selectedFile ? `Selected: ${selectedFile.name}` : 'Upload Photo/Video'}
                                </button>
                              </div>
                              <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-yellow-100 md:col-span-2">
                                <label htmlFor="product-description" className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 block">Product Details</label>
                                <textarea
                                  id="product-description"
                                  value={formData.description}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  className="w-full text-base text-gray-700 block border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
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
          <div className="flex justify-between items-center p-2 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 w-full gap-2">
            <div className="flex gap-3">
              <button className="px-5 py-3 text-base font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Icon icon="mdi:content-save-outline" className="text-xl" />
                Save as Draft
              </button>
              <button className="px-5 py-3 text-base font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Icon icon="mdi:archive-outline" className="text-xl" />
                Archive
              </button>
            </div>
            <div className="flex gap-3 ml-auto">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-base"
              >
                Cancel
              </button>
              {/* Show Add button in footer only in slide view */}
              {mode === 'product' && !showFullForm && (
                <button
                  onClick={() => handleAdd(fetchedProducts[currentIndex])}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold shadow hover:from-yellow-500 hover:to-yellow-400 transition-colors text-xl tracking-wide rounded-xl flex items-center gap-2"
                >
                  <Icon icon="mdi:plus-circle" className="text-2xl align-middle" />
                  Add
                </button>
              )}
              {(showFullForm || mode === 'sale') && (
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-xl bg-black text-white font-medium border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-base"
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
