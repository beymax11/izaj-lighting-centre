import { Icon } from '@iconify/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Session } from '@supabase/supabase-js';
import  API_URL  from '../../config/api';

interface StockChangeSummary {
  increased: any[];
  decreased: any[];
  unchanged: any[];
  total: number;
}

interface ManageStockModalProps {
  session: Session | null;
  onClose: (shouldRefresh?: boolean) => void;
  publishedProducts: any[];
  setPublishedProducts: (products: any[]) => void;
}

export function ManageStockModal({
  onClose,
  session,
  publishedProducts,
  setPublishedProducts,
}: ManageStockModalProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [summary, setSummary] = useState<StockChangeSummary | null>(null);
  const [, setHasStockChanges] = useState(false);

  const handleSyncStock = async () => {
    setIsSyncing(true);
    
    try {
      const response = await fetch(`${API_URL}/api/products/stock-summary`, {
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch stock');
      
      const data = await response.json();
      const latestProducts = data.products || [];

      if (latestProducts.length === 0) {
        toast.error('No products found in stock data');
        return;
      }

      const increased: any[] = [];
      const decreased: any[] = [];
      const unchanged: any[] = [];

      publishedProducts.forEach((prod) => {
        const latest = latestProducts.find((p: any) => p.product_id === prod.product_id);
        if (!latest) return;
        
        if (latest.quantity > prod.quantity) {
          increased.push({ ...latest, diff: latest.quantity - prod.quantity });
        } else if (latest.quantity < prod.quantity) {
          decreased.push({ ...latest, diff: prod.quantity - latest.quantity });
        } else {
          unchanged.push(latest);
        }
      });

      const totalChanges = increased.length + decreased.length;

      if (totalChanges > 0) {
        setPublishedProducts(latestProducts);
        setHasStockChanges(true);
        toast.success(`Stock successfully synced! ${totalChanges} products updated.`);
      } else {
        toast('No stock changes detected. All products are up to date.');
      }

      setSummary({
        increased,
        decreased,
        unchanged,
        total: totalChanges,
      });
      
    } catch (err) {
      console.error('Stock sync error:', err);
      toast.error('Error syncing stock. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDone = () => {
    console.log('Stock sync completed, refreshing data...');
    onClose(true); // shouldRefresh = true
  };

  const handleCancel = () => {
    onClose(false); // shouldRefresh = false
  };

  const isSyncCompleted = summary !== null;
  const hasChanges = summary && summary.total > 0;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-2xl shadow-2xl border border-white overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:sync" className="text-2xl text-yellow-400" />
            <h2 className="text-xl font-bold text-gray-800">Sync Stock</h2>
          </div>
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>
        
        <div className="p-6">
          {!isSyncCompleted && (
            <button
              onClick={handleSyncStock}
              disabled={isSyncing}
              className="w-full px-6 py-3 rounded-xl bg-yellow-500 text-white font-medium border-2 border-yellow-200 hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-200 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? (
                <div className="flex items-center justify-center gap-2">
                  <Icon icon="mdi:loading" className="animate-spin" />
                  Syncing Stock...
                </div>
              ) : (
                'Sync Stock'
              )}
            </button>
          )}

          <div className="mt-4">
            {summary ? (
              summary.total === 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <Icon icon="mdi:check-circle" className="text-blue-500 text-2xl mx-auto mb-2" />
                  <div className="text-blue-700 font-medium">All stock levels are up to date!</div>
                  <div className="text-blue-600 text-sm mt-1">No changes were needed.</div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon icon="mdi:check-circle" className="text-green-500 text-xl" />
                    <div className="text-green-700 font-semibold">Stock Sync Complete</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 font-bold text-lg">{summary.increased.length}</div>
                      <div className="text-green-700">Increased</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-600 font-bold text-lg">{summary.decreased.length}</div>
                      <div className="text-red-700">Decreased</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 font-bold text-lg">{summary.unchanged.length}</div>
                      <div className="text-gray-700">Unchanged</div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="text-gray-400 text-center py-8">
                <Icon icon="mdi:sync" className="text-4xl mx-auto mb-2 opacity-50" />
                <div>Click "Sync Stock" to update product quantities</div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            {isSyncCompleted && hasChanges && (
              <button
                onClick={handleDone}
                className="px-6 py-2 rounded-xl bg-green-500 text-white font-medium border-2 border-green-200 hover:border-green-400 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Done & Refresh
              </button>
            )}
            <button
              onClick={isSyncCompleted && !hasChanges ? handleDone : handleCancel}
              className="px-6 py-2 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all duration-200"
            >
              {isSyncCompleted ? 'Close' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}