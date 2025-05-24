import { Icon } from '@iconify/react';

interface AddProductModalProps {
  onClose: () => void;
  mode: 'product' | 'sale';
}

export function AddProductModal({ onClose, mode }: AddProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white w-[800px] rounded-2xl shadow-2xl border border-white overflow-hidden"
        style={{
          boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
        }}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Icon 
              icon={mode === 'sale' ? "mdi:tag-plus" : "mdi:package-plus"} 
              className="text-2xl text-yellow-400" 
            />
            <h2 className="text-xl font-bold text-gray-800">
              {mode === 'sale' ? 'Add New Sale' : 'Add New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {mode === 'sale' ? (
            // Sale form content
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Sale Details</h3>
                <div className="space-y-4">
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300">
                    <option>Select Product</option>
                    {/* Add product options here */}
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300">
                        <option>Percentage</option>
                        <option>Fixed Amount</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Original product form content
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Product Details</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                />
                <textarea
                  placeholder="Product Description"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 bg-gray-50 border-t border-gray-100 sticky bottom-0">
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2">
              <Icon icon="mdi:content-save-outline" className="text-lg" />
              Save as Draft
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2">
              <Icon icon="mdi:archive-outline" className="text-lg" />
              Archive
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-6 py-2 rounded-xl bg-black text-white font-medium border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-200">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
