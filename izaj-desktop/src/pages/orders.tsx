import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Session } from '@supabase/supabase-js';
import API_URL from '../../config/api';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: 'pending' | 'approved' | 'delivering' | 'delivered' | 'complete' | 'cancelled';
  total_amount: number;
  shipping_fee: number;
  payment_method: string;
  payment_status: string;
  recipient_name: string;
  shipping_phone: string;
  shipping_address_line1: string;
  shipping_address_line2: string | null;
  shipping_city: string;
  shipping_province: string;
  tracking_number: string | null;
  courier: string | null;
  customer_notes: string | null;
  admin_notes: string | null;
  created_at: string;
  items?: OrderItem[];
}

interface OrdersProps {
  setIsOverlayOpen: (isOpen: boolean) => void;
  session: Session | null;
}

function Orders({ setIsOverlayOpen, session }: OrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'delivering' | 'delivered' | 'complete' | 'cancelled'>('all');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courier, setCourier] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    delivering: 0,
    delivered: 0,
    complete: 0,
    cancelled: 0
  });

  const ordersPerPage = 10;

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      console.log('🔵 Fetching orders from:', `${API_URL}/api/orders`);
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('🔵 Response status:', response.status);

      const data = await response.json();
      console.log('🔵 Orders data:', data);

      if (data.success && data.data) {
        console.log('✅ Orders loaded:', data.data.length);
        setOrders(data.data);
        
        // Calculate stats
        const newStats = {
          pending: data.data.filter((o: Order) => o.status === 'pending').length,
          approved: data.data.filter((o: Order) => o.status === 'approved').length,
          delivering: data.data.filter((o: Order) => o.status === 'delivering').length,
          delivered: data.data.filter((o: Order) => o.status === 'delivered').length,
          complete: data.data.filter((o: Order) => o.status === 'complete').length,
          cancelled: data.data.filter((o: Order) => o.status === 'cancelled').length,
        };
        setStats(newStats);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string, options: any = {}) => {
    try {
      console.log('🔵 Updating order status:', { orderId, newStatus, options });
      const response = await fetch(`${API_URL}/api/orders/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          newStatus,
          ...options
        })
      });

      const data = await response.json();

      if (data.success) {
        // Refresh orders
        await fetchOrders();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  };

  const handleStatusChange = (order: Order) => {
    setSelectedOrder(order);
    setAdminNotes('');
    setShowStatusModal(true);
    setIsOverlayOpen(true);
  };

  const handleAddTracking = (order: Order) => {
    setSelectedOrder(order);
    setTrackingNumber(order.tracking_number || '');
    setCourier(order.courier || 'JRS Express');
    setShowTrackingModal(true);
    setIsOverlayOpen(true);
  };

  const confirmStatusUpdate = async (newStatus: string) => {
    if (!selectedOrder) return;

    const success = await updateOrderStatus(selectedOrder.id, newStatus, {
      admin_notes: adminNotes || undefined
    });

    if (success) {
      setShowStatusModal(false);
      setIsOverlayOpen(false);
      setSelectedOrder(null);
    }
  };

  const confirmTracking = async () => {
    if (!selectedOrder || !trackingNumber) return;

    const success = await updateOrderStatus(selectedOrder.id, 'delivering', {
      tracking_number: trackingNumber,
      courier: courier,
      admin_notes: `Tracking number: ${trackingNumber} (${courier})`
    });

    if (success) {
      setShowTrackingModal(false);
      setIsOverlayOpen(false);
      setSelectedOrder(null);
      setTrackingNumber('');
      setCourier('');
    }
  };

  const closeModal = () => {
    setShowStatusModal(false);
    setShowTrackingModal(false);
    setIsOverlayOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filter === 'all' || order.status === filter;
    const matchSearch =
      search.trim() === '' ||
      order.order_number.toLowerCase().includes(search.toLowerCase()) ||
      order.recipient_name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const toggleRow = (idx: number) => {
    setSelectedRows(selectedRows.includes(idx) ? selectedRows.filter((i) => i !== idx) : [...selectedRows, idx]);
  };

  const toggleAllRows = () => {
    if (selectedRows.length === paginatedOrders.length && paginatedOrders.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedOrders.map((_, idx) => idx));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-400 hover:bg-yellow-500';
      case 'approved':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'delivering':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'delivered':
        return 'bg-green-500 hover:bg-green-600';
      case 'complete':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-400 hover:bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <main
        className="flex-1 px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-white m-2 sm:m-4 rounded-2xl shadow-lg border border-white overflow-y-auto"
        style={{
          boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
        }}
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:package-variant" className="text-2xl sm:text-3xl text-yellow-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Orders Management</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Manage and track all customer orders</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 w-full transition-all duration-200"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <button
              className="px-4 py-2 bg-yellow-400 text-white rounded-xl text-sm font-medium hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => fetchOrders()}
              type="button"
            >
              <Icon icon="mdi:refresh" className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { key: 'pending', label: 'Pending', count: stats.pending, bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-600', icon: 'mdi:clock-outline' },
            { key: 'approved', label: 'Approved', count: stats.approved, bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', icon: 'mdi:check-circle' },
            { key: 'delivering', label: 'Delivering', count: stats.delivering, bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', icon: 'mdi:truck-fast' },
            { key: 'delivered', label: 'Delivered', count: stats.delivered, bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600', icon: 'mdi:package-variant' },
            { key: 'complete', label: 'Complete', count: stats.complete, bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-600', icon: 'mdi:check-all' },
            { key: 'cancelled', label: 'Cancelled', count: stats.cancelled, bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', icon: 'mdi:close-circle' },
          ].map((stat) => (
            <button
              key={stat.key}
              className={`${stat.bg} rounded-xl p-3 sm:p-4 border ${stat.border} w-full text-left transition-all duration-200 hover:scale-105 hover:shadow-md`}
              onClick={() => {
                setFilter(stat.key as any);
                setCurrentPage(1);
              }}
              type="button"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</span>
                <Icon icon={stat.icon} className={`w-4 h-4 ${stat.text}`} />
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-bold text-gray-800">{stat.count}</div>
            </button>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Orders', icon: 'mdi:package-variant-closed' },
            { key: 'pending', label: 'Pending', icon: 'mdi:clock-outline' },
            { key: 'approved', label: 'Approved', icon: 'mdi:check-circle' },
            { key: 'delivering', label: 'Delivering', icon: 'mdi:truck-fast' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                filter === tab.key
                  ? 'bg-yellow-400 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setFilter(tab.key as any);
                setCurrentPage(1);
              }}
              type="button"
            >
              <Icon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Order Table */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Icon icon="mdi:loading" className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Order #</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Customer</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Items</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Total</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Payment</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedOrders.map((order, idx) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-800">{order.order_number}</div>
                        <div className="text-xs text-gray-400">{formatDate(order.created_at)}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-800">{order.recipient_name}</div>
                        <div className="text-xs text-gray-500">{order.shipping_phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-gray-700">{order.items?.length || 0} item(s)</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{formatPrice(order.total_amount)}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-600">{order.payment_method}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{order.shipping_city}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold text-white ${
                            order.status === 'pending' ? 'bg-yellow-500' :
                            order.status === 'approved' ? 'bg-blue-500' :
                            order.status === 'delivering' ? 'bg-purple-500' :
                            order.status === 'delivered' ? 'bg-green-500' :
                            order.status === 'complete' ? 'bg-gray-500' :
                            'bg-red-500'
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleStatusChange(order)}
                            className="p-2 text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-all"
                            title="Update Status"
                            type="button"
                          >
                            <Icon icon="mdi:pencil" className="w-4 h-4" />
                          </button>
                          {(order.status === 'approved' || order.status === 'delivering') && (
                            <button
                              onClick={() => handleAddTracking(order)}
                              className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                              title="Add Tracking"
                              type="button"
                            >
                              <Icon icon="mdi:truck-fast" className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedOrders.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-gray-400">
                        <Icon icon="mdi:package-variant-closed" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No orders found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <div className="text-xs sm:text-sm text-gray-500">
                Showing {filteredOrders.length === 0 ? 0 : (currentPage - 1) * ordersPerPage + 1} to{' '}
                {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 border border-gray-200 rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  type="button"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(pageCount, 5) }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={idx}
                        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ${
                          currentPage === pageNum ? 'bg-yellow-400 text-white font-bold' : 'hover:bg-gray-50 border border-gray-200'
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                        type="button"
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  className="px-3 py-1 border border-gray-200 rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === pageCount || pageCount === 0}
                  onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center p-4"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: 'rgba(255, 215, 0, 0.09)',
          }}
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-yellow-100 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={closeModal}
              type="button"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Update Order Status</h3>
              <p className="text-sm text-gray-600 mb-4">Order: {selectedOrder.order_number}</p>

              <div className="space-y-3 mb-6">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => confirmStatusUpdate('approved')}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium flex items-center justify-center gap-2"
                    type="button"
                  >
                    <Icon icon="mdi:check-circle" className="w-5 h-5" />
                    Approve Order
                  </button>
                )}
                
                {selectedOrder.status === 'approved' && (
                  <button
                    onClick={() => handleAddTracking(selectedOrder)}
                    className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-medium flex items-center justify-center gap-2"
                    type="button"
                  >
                    <Icon icon="mdi:truck-fast" className="w-5 h-5" />
                    Mark as Delivering (Add Tracking)
                  </button>
                )}
                
                {selectedOrder.status === 'delivering' && (
                  <button
                    onClick={() => confirmStatusUpdate('delivered')}
                    className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium flex items-center justify-center gap-2"
                    type="button"
                  >
                    <Icon icon="mdi:package-variant" className="w-5 h-5" />
                    Mark as Delivered
                  </button>
                )}
                
                {selectedOrder.status === 'delivered' && (
                  <button
                    onClick={() => confirmStatusUpdate('complete')}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all font-medium flex items-center justify-center gap-2"
                    type="button"
                  >
                    <Icon icon="mdi:check-all" className="w-5 h-5" />
                    Mark as Complete
                  </button>
                )}

                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'complete' && (
                  <button
                    onClick={() => confirmStatusUpdate('cancelled')}
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium flex items-center justify-center gap-2"
                    type="button"
                  >
                    <Icon icon="mdi:close-circle" className="w-5 h-5" />
                    Cancel Order
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes (Optional)</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  rows={3}
                  placeholder="Add notes about this status change..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Number Modal */}
      {showTrackingModal && selectedOrder && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center p-4"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: 'rgba(255, 215, 0, 0.09)',
          }}
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-yellow-100 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={closeModal}
              type="button"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <Icon icon="mdi:truck-fast" className="text-purple-500" />
                Add Tracking Information
              </h3>
              <p className="text-sm text-gray-600 mb-4">Order: {selectedOrder.order_number}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Courier</label>
                  <select
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  >
                    <option value="JRS Express">JRS Express</option>
                    <option value="LBC">LBC</option>
                    <option value="J&T Express">J&T Express</option>
                    <option value="Grab Express">Grab Express</option>
                    <option value="Lalamove">Lalamove</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                    placeholder="Enter tracking number"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmTracking}
                  disabled={!trackingNumber}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  Confirm & Mark as Delivering
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
