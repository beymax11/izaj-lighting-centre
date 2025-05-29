import { Icon } from '@iconify/react';
import { useState } from 'react';

interface Product {
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  variant: number | null;
  image: string;
}

interface ManageStockModalProps {
  onClose: () => void;
  product: Product;
  onUpdateStock: (newStock: number) => void;
}

export function ManageStockModal({ onClose, product, onUpdateStock }: ManageStockModalProps) {
  const [stockAmount, setStockAmount] = useState(product.stock);
  const [isAdding, setIsAdding] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStock(stockAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white w-[500px] rounded-2xl shadow-2xl border border-white overflow-hidden"
        style={{
          boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
        }}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Icon 
              icon="mdi:package-variant" 
              className="text-2xl text-yellow-400" 
            />
            <h2 className="text-xl font-bold text-gray-800">
              Manage Stock
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.category}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stock
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600">
                    {product.stock} units
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Stock Level
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                    placeholder="Enter new stock amount"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(!isAdding)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-colors ${
                    isAdding 
                      ? 'border-yellow-400 bg-yellow-50 text-yellow-700' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Add Stock
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(!isAdding)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-colors ${
                    !isAdding 
                      ? 'border-yellow-400 bg-yellow-50 text-yellow-700' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Remove Stock
                </button>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:information" className="text-yellow-500 text-xl mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-700 font-medium mb-1">
                      {isAdding ? 'Adding Stock' : 'Removing Stock'}
                    </p>
                    <p className="text-sm text-yellow-600">
                      {isAdding 
                        ? `This will increase the stock level by ${stockAmount - product.stock} units.`
                        : `This will decrease the stock level by ${product.stock - stockAmount} units.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-black text-white font-medium border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
              >
                Update Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 