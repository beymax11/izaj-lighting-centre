import { Icon } from '@iconify/react';

interface AddProductModalProps {
  onClose: () => void;
  mode: 'product' | 'sale';
}

export function AddProductModal({ onClose, mode }: AddProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white w-[800px] rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden transform transition-all"
        style={{
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        }}>
        {/* Header */}
        <div className="flex justify-between items-center p-7 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-yellow-50">
              <Icon 
                icon={mode === 'sale' ? "mdi:tag-plus" : "mdi:package-plus"} 
                className="text-2xl text-yellow-500" 
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === 'sale' ? 'Add New Sale' : 'Add New Product'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-7 space-y-7 overflow-y-auto max-h-[calc(100vh-200px)]">
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
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Icon icon="mdi:package-outline" className="text-xl text-yellow-500" />
                  Product Details
                </h3>
                <div className="space-y-5">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
                  />
                  <textarea
                    placeholder="Product Description"
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all resize-none"
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all">
                        <option>Select Category</option>
                        {/* Add category options here */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-7 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 sticky bottom-0">
          <div className="flex gap-3">
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Icon icon="mdi:content-save-outline" className="text-lg" />
              Save as Draft
            </button>
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Icon icon="mdi:archive-outline" className="text-lg" />
              Archive
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-black text-white font-medium border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-yellow-200 focus:outline-none"
              style={{ boxShadow: '0 4px 12px 0 rgba(0,0,0,0.12)' }}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
