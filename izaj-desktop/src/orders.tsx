import { useState } from 'react';
import { Icon } from '@iconify/react';

interface Stat {
  label: string;
  count: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

interface Item {
  name: string;
  quantity: number;
  price: string;
  sku: string;
  image: string;
}

interface Order {
  orderNumber: string;
  product: string;
  price: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  transactionId: string;
  status: 'Accept' | 'Pending' | 'Shipping' | 'Completed' | 'Cancelled';
  shippingAddress: string;
  billingAddress: string;
  items: Item[];
  totalAmount: string;
  taxes: string;
  shippingFee: string;
  discount: string;
  grandTotal: string;
  estimatedDeliveryDate: string;
  customerSupportContact: string;
}

const sampleOrders: Order[] = [
  {
    orderNumber: 'ORD-1001',
    product: 'Progress Lighting Ceiling',
    price: '₱ 3,999',
    customer: 'Ruiz Miguel Sapio',
    customerEmail: 'ruiz.miguel@example.com',
    customerPhone: '0917-123-4567',
    date: '03/10/2025 14:30',
    paymentMethod: 'Gcash',
    paymentStatus: 'Completed',
    transactionId: 'TX123456789',
    status: 'Accept',
    shippingAddress: '123 Main St, Quezon City, Philippines',
    billingAddress: '123 Main St, Quezon City, Philippines',
    items: [
      {
        name: 'Ceiling Light Model A',
        quantity: 1,
        price: '₱ 3,999',
        sku: 'PL-12345',
        image: 'ceiling.jpg',
      },
    ],
    totalAmount: '₱ 3,999',
    taxes: '₱ 200',
    shippingFee: '₱ 50',
    discount: '₱ 100',
    grandTotal: '₱ 4,149',
    estimatedDeliveryDate: '03/15/2025',
    customerSupportContact: 'support@company.com',
  },
];

function Orders() {
  const stats: Stat[] = [
    { label: 'Pending', count: 222, bgColor: 'bg-yellow-50', borderColor: 'border-yellow-100', textColor: 'text-yellow-400' },
    { label: 'Shipping', count: 100, bgColor: 'bg-blue-50', borderColor: 'border-blue-100', textColor: 'text-blue-400' },
    { label: 'Completed', count: 111, bgColor: 'bg-green-50', borderColor: 'border-green-100', textColor: 'text-green-400' },
    { label: 'Cancelled', count: 22, bgColor: 'bg-red-50', borderColor: 'border-red-100', textColor: 'text-red-400' },
  ];

  const [filter, setFilter] = useState<'All' | 'Pending' | 'Shipping' | 'Completed' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const [modalOrderIdx, setModalOrderIdx] = useState<number | null>(null);

  const ordersPerPage = 7;

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filter === 'All' ? true : order.status === filter;
    const matchSearch =
      search.trim() === '' ||
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
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

  const handleStatusClick = (orderIdx: number) => {
    const order = paginatedOrders[orderIdx];
    if (order.status === 'Accept') {
      setModalOrderIdx(orderIdx);
    } else {
      setOrders((prev) => {
        const globalIdx = (currentPage - 1) * ordersPerPage + orderIdx;
        const nextStatus: Order['status'][] = ['Accept', 'Pending', 'Shipping', 'Completed', 'Cancelled'];
        const currStatusIdx = nextStatus.indexOf(prev[globalIdx].status);
        const newStatus = nextStatus[(currStatusIdx + 1) % nextStatus.length];
        const updatedOrders = [...prev];
        updatedOrders[globalIdx] = { ...updatedOrders[globalIdx], status: newStatus };
        return updatedOrders;
      });
    }
  };

  const closeModal = () => setModalOrderIdx(null);

  const confirmOrder = () => {
    if (modalOrderIdx === null) return;
    setOrders((prev) => {
      const globalIdx = (currentPage - 1) * ordersPerPage + modalOrderIdx;
      const updatedOrders = [...prev];
      updatedOrders[globalIdx] = { ...updatedOrders[globalIdx], status: 'Pending' };
      return updatedOrders;
    });
    closeModal();
  };

  const modalOrder = modalOrderIdx !== null ? paginatedOrders[modalOrderIdx] : null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <main
        className="flex-1 px-8 py-6 bg-white m-4 rounded-2xl shadow-lg border border-white overflow-y-auto"
        style={{
          boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
        }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:shopping-outline" className="text-3xl text-green-400" />
              <h2 className="text-2xl font-bold text-gray-800">Orders Overview</h2>
            </div>
            <p className="text-gray-500 mt-1">Track and manage all orders in one place</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 w-64 transition-all duration-200"
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
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              <Icon icon="mdi:filter-variant" className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 border rounded-xl bg-yellow-50 border-yellow-100 flex gap-4 items-center">
            <span className="font-medium text-gray-600">Filter by status:</span>
            {['All', 'Pending', 'Shipping', 'Completed', 'Cancelled'].map((label) => (
              <button
                key={label}
                className={`px-3 py-1 rounded-lg border text-sm font-medium ${
                  filter === label ? 'bg-yellow-400 text-white border-yellow-400' : 'border-gray-200 hover:bg-yellow-50'
                }`}
                onClick={() => {
                  setFilter(label as typeof filter);
                  setCurrentPage(1);
                }}
                type="button"
              >
                {label}
              </button>
            ))}
            <button
              className="ml-auto px-3 py-1 rounded-lg text-sm border border-red-100 text-red-400 hover:bg-red-50"
              onClick={() => setShowFilters(false)}
              type="button"
            >
              Close
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <button
              key={idx}
              className={`${stat.bgColor} rounded-xl p-4 border ${stat.borderColor} w-full text-left transition-transform hover:scale-105`}
              onClick={() => {
                setFilter(stat.label as typeof filter);
                setCurrentPage(1);
              }}
              type="button"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <Icon icon="mdi:circle" className={`w-2 h-2 ${stat.textColor}`} />
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-800">{stat.count}</div>
            </button>
          ))}
        </div>

        {/* Order Table */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                    checked={selectedRows.length === paginatedOrders.length && paginatedOrders.length > 0}
                    onChange={toggleAllRows}
                  />
                </th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Product Name</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Price</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Customer</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Date</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Payment</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      checked={selectedRows.includes(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{order.product}</div>
                    <div className="text-xs text-gray-400">ID: {order.orderNumber}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.price}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-1 ${
                        order.status === 'Accept'
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : order.status === 'Pending'
                          ? 'bg-yellow-400 hover:bg-yellow-500'
                          : order.status === 'Shipping'
                          ? 'bg-blue-400 hover:bg-blue-500'
                          : order.status === 'Completed'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                      } text-white text-xs rounded-lg transition-colors duration-200`}
                      onClick={() => handleStatusClick(idx)}
                      type="button"
                    >
                      {order.status}
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {filteredOrders.length === 0 ? 0 : (currentPage - 1) * ordersPerPage + 1} to{' '}
            {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              type="button"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === idx + 1 ? 'bg-yellow-400 text-white' : 'hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => setCurrentPage(idx + 1)}
                type="button"
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200"
              disabled={currentPage === pageCount || pageCount === 0}
              onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Modal Overlay for Accept with detailed info */}
      {modalOrder && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center p-6"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: 'rgba(255, 215, 0, 0.09)',
          }}
          onClick={closeModal}
        >
          <div
            className="relative bg-gradient-to-br from-yellow-50 via-white to-blue-50 rounded-3xl shadow-2xl border border-yellow-100 flex flex-col"
            style={{
              maxWidth: '1100px',
              width: '90vw',
              height: '900px',
              maxHeight: '90vh',
              overflow: 'visible',
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute -inset-2 rounded-3xl z-0"
              style={{
                background: "radial-gradient(ellipse at top left, rgba(252,211,77,0.15) 0%, rgba(59,130,246,0.10) 100%)",
                filter: "blur(8px)",
                zIndex: 0
              }}
            ></div>

            {/* Functional close button */}
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-yellow-500 text-2xl z-50 bg-white/70 rounded-full p-1 shadow-lg focus:outline-none border border-yellow-100 transition"
              onClick={(e) => {
                e.stopPropagation();
                setModalOrderIdx(null);
              }}
              aria-label="Close modal"
              type="button"
            >
              <Icon icon="mdi:close" />
            </button>
            <div className="p-10 pb-2 relative z-10 flex-1 w-full">
              <h3 id="modal-title" className="text-3xl font-extrabold mb-5 text-gray-800 flex items-center gap-2">
                <Icon icon="mdi:package-variant-closed" className="text-yellow-400 text-2xl" />
                Order Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
                {/* LEFT: General & Items */}
                <div className="space-y-6">
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Order Number</span>
                    <span className="text-lg font-bold">{modalOrder.orderNumber}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Customer</span>
                    <div className="flex items-center gap-3">
                      <Icon icon="mdi:account-circle" className="text-2xl text-blue-300" />
                      <div>
                        <div className="font-medium">{modalOrder.customer}</div>
                        <div className="text-xs text-gray-500">{modalOrder.customerEmail}</div>
                        <div className="text-xs text-gray-500">{modalOrder.customerPhone}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Shipping Address</span>
                    <span className="block">{modalOrder.shippingAddress}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Billing Address</span>
                    <span className="block">{modalOrder.billingAddress}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Items Ordered</span>
                    <div className="flex flex-col gap-3">
                      {modalOrder.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 rounded-xl bg-white/90 border border-gray-100 shadow-sm p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl border border-yellow-100"
                          />
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                            <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                          </div>
                          <div className="ml-auto font-bold text-yellow-500">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* RIGHT: Payment, Totals, Status */}
                <div className="space-y-6">
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Order Date</span>
                    <span className="block">{modalOrder.date}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Payment</span>
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:credit-card-outline" className="text-xl text-blue-400" />
                      <span>{modalOrder.paymentMethod}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                        ${modalOrder.paymentStatus === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : modalOrder.paymentStatus === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'}`}>
                        {modalOrder.paymentStatus}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Transaction ID: {modalOrder.transactionId}</div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Order Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-xl font-bold text-sm
                      ${modalOrder.status === 'Accept'
                        ? 'bg-blue-100 text-blue-700'
                        : modalOrder.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : modalOrder.status === 'Shipping'
                        ? 'bg-blue-200 text-blue-800'
                        : modalOrder.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'}`}>
                      <Icon icon="mdi:circle" className="w-3 h-3 mr-2"
                        style={{
                          color:
                            modalOrder.status === 'Accept'
                              ? '#3B82F6'
                              : modalOrder.status === 'Pending'
                              ? '#F59E42'
                              : modalOrder.status === 'Shipping'
                              ? '#60A5FA'
                              : modalOrder.status === 'Completed'
                              ? '#22C55E'
                              : '#EF4444',
                        }} />
                      {modalOrder.status}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Estimated Delivery</span>
                    <span className="block font-medium">{modalOrder.estimatedDeliveryDate}</span>
                  </div>
                  <div className="border-t border-yellow-100 pt-5 mt-2">
                    <div className="flex justify-between text-base mb-1">
                      <span>Subtotal:</span>
                      <span>{modalOrder.totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Taxes:</span>
                      <span>{modalOrder.taxes}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Shipping Fee:</span>
                      <span>{modalOrder.shippingFee}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Discount:</span>
                      <span>-{modalOrder.discount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-extrabold text-yellow-600 mt-2">
                      <span>Grand Total:</span>
                      <span>{modalOrder.grandTotal}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Customer Support</span>
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:headset" className="text-lg text-blue-400" />
                      <span className="text-sm">{modalOrder.customerSupportContact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10 px-10 pb-10">
              <button
                onClick={closeModal}
                className="px-5 py-2 text-white bg-red-500 border border-red-600 rounded-lg hover:bg-red-600 transition font-semibold"
                type="button"
              >
                Reject
              </button>
              <button
                onClick={confirmOrder}
                className="px-6 py-2 bg-yellow-400 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition"
                type="button"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;