import { Icon } from '@iconify/react';
import { useState } from 'react';

interface Payment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  productId: string;
  status: 'Pending' | 'Successful' | 'Canceled' | 'Refund';
  method: 'Gcash' | 'Maya' | 'Paypal' | 'Bank Transfer';
  amount: number;
}

function Payments({ setIsOverlayOpen }: { setIsOverlayOpen: (isOpen: boolean) => void }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['User ID', 'Name', 'Email', 'Phone Number', 'Date', 'Product ID', 'Payment'];
    const selectedData = mockData.filter(user => selectedRows.has(user.id));
    const csvContent = [
      headers.join(','),
      ...selectedData.map(user => [
        user.id,
        user.name,
        user.email,
        user.phone,
        user.date,
        user.productId,
        user.status
      ].join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'payments_export.csv';
    link.click();
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(mockData.map(user => user.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsOverlayOpen(true);
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setIsOverlayOpen(false);
  };

  // Mock data
  const mockData: Payment[] = [
    { 
      id: '#000001', 
      name: 'Jerome Bulaktala', 
      email: 'jeromebulaktala@gmail.com', 
      phone: '09231283712', 
      date: '03/10/25',
      time: '14:30',
      productId: 'PROD–000001',
      status: 'Pending' as const,
      method: 'Gcash' as const,
      amount: 1500
    },
    { 
      id: '#000002', 
      name: 'Ruiz Miguel Sapio', 
      email: 'sapioruizm@gmail.com', 
      phone: '09231283712', 
      date: '03/10/25',
      time: '15:45',
      productId: 'PROD–000002',
      status: 'Successful' as const,
      method: 'Maya' as const,
      amount: 2300
    },
    { 
      id: '#000003', 
      name: 'Rim Vernon Dimanadal', 
      email: 'dimanadalrim@gmail.com', 
      phone: '09231283712', 
      date: '03/10/25',
      time: '09:15',
      productId: 'PROD–000003',
      status: 'Canceled' as const,
      method: 'Paypal' as const,
      amount: 1800
    },
    { 
      id: '#000004', 
      name: 'John Isaiah Garcia', 
      email: 'garciajohn@gmail.com', 
      phone: '09231283712', 
      date: '03/10/25',
      time: '11:20',
      productId: 'PROD–000004',
      status: 'Refund' as const,
      method: 'Bank Transfer' as const,
      amount: 3200
    },
    { 
      id: '#000005', 
      name: 'Anthony Gabrielle Doria', 
      email: 'doriaanthony@gmail.com', 
      phone: '09231283712', 
      date: '03/10/25',
      time: '16:05',
      productId: 'PROD–000005',
      status: 'Pending' as const,
      method: 'Gcash' as const,
      amount: 950
    },
    { 
      id: '#000006', 
      name: 'Pearl Jam Latayan', 
      email: 'latayanpearljam@gmail.com', 
      phone: '09231283712', 
      date: '03/10/25',
      time: '13:40',
      productId: 'PROD–000006',
      status: 'Successful' as const,
      method: 'Maya' as const,
      amount: 2750
    },
  ];

  // Filter and search data
  const filteredData = mockData.filter(user => {
    const matchesSearch = searchQuery === '' || 
      Object.values(user).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(user.status);
    return matchesSearch && matchesFilter;
  });

  // Update stats based on actual data
  const stats = {
    pending: mockData.filter(user => user.status === 'Pending').length,
    successful: mockData.filter(user => user.status === 'Successful').length,
    canceled: mockData.filter(user => user.status === 'Canceled').length,
    refund: mockData.filter(user => user.status === 'Refund').length,
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <main className="flex-1 px-8 py-8 bg-white">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-2">
            <Icon icon="mdi:credit-card-outline" className="text-pink-400 w-8 h-8" />
            Payments
          </h2>
          <p className="text-gray-500 text-md">Monitor and manage payment transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
            <Icon icon="mdi:clock-outline" className="w-10 h-10 text-yellow-400 mb-3" />
            <span className="text-2xl font-bold text-gray-800">{stats.pending}</span>
            <span className="text-gray-500 text-sm">Pending</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-green-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
            <Icon icon="mdi:check-circle-outline" className="w-10 h-10 text-green-400 mb-3" />
            <span className="text-2xl font-bold text-gray-800">{stats.successful}</span>
            <span className="text-gray-500 text-sm">Successful</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-red-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
            <Icon icon="mdi:close-circle-outline" className="w-10 h-10 text-red-400 mb-3" />
            <span className="text-2xl font-bold text-gray-800">{stats.canceled}</span>
            <span className="text-gray-500 text-sm">Canceled</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-blue-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
            <Icon icon="mdi:cash-refund" className="w-10 h-10 text-blue-400 mb-3" />
            <span className="text-2xl font-bold text-gray-800">{stats.refund}</span>
            <span className="text-gray-500 text-sm">Refunds</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-4 text-sm">
            {['Pending', 'Successful', 'Canceled', 'Refund'].map((label, idx) => (
              <button
                key={idx}
                onClick={() => handleFilterToggle(label)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm transition ${
                  selectedFilters.includes(label) 
                    ? 'text-yellow-600 border-yellow-200 bg-yellow-50' 
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                <Icon 
                  icon={selectedFilters.includes(label) ? "mdi:checkbox-marked-circle" : "mdi:checkbox-blank-circle-outline"} 
                  className="w-4 h-4" 
                />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Icon icon="mdi:magnify" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-100 focus:border-yellow-200 bg-white"
              />
            </div>
            <button 
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className="px-4 py-2 border border-yellow-200 rounded-lg text-sm bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition"
            >
              Advance Filter
            </button>
          </div>
        </div>

        {/* Advanced Filter Panel */}
        {showAdvancedFilter && (
          <div className="max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full p-2 border rounded-lg" />
                  <input type="number" placeholder="Max" className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">All Methods</option>
                  <option value="credit">Gcash</option>
                  <option value="debit">Maya</option>
                  <option value="bank">Paypal</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Payments Table */}
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 mb-8">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="font-semibold text-gray-700 text-lg">Payments Table</span>
            <button 
              onClick={handleExport}
              disabled={selectedRows.size === 0}
              className={`flex items-center gap-1 text-sm ${
                selectedRows.size > 0 
                  ? 'text-yellow-600 hover:underline' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Icon icon="mdi:download" className="w-4 h-4" />
              Export {selectedRows.size > 0 && `(${selectedRows.size})`}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.size === mockData.length}
                      onChange={handleSelectAll}
                      className="accent-yellow-400"
                    />
                  </th>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Product ID</th>
                  <th className="px-4 py-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredData.map((user, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-yellow-50 transition cursor-pointer" 
                    onClick={() => handleRowClick(user)}
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.has(user.id)}
                        onChange={() => handleRowSelect(user.id)}
                        className="accent-yellow-400"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-yellow-700">{user.id}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{user.date}</td>
                    <td className="px-4 py-3">ID: {user.productId}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        user.status === 'Successful' ? 'bg-green-100 text-green-700' :
                        user.status === 'Canceled' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Details Modal */}
        {selectedPayment && (
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
                maxWidth: '800px',
                width: '90vw',
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

              {/* Close button */}
              <button
                className="absolute top-6 right-6 text-gray-400 hover:text-yellow-500 text-2xl z-50 bg-white/70 rounded-full p-1.5 shadow-lg focus:outline-none border border-yellow-100 transition hover:scale-110 hover:rotate-90"
                onClick={closeModal}
                aria-label="Close modal"
                type="button"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>

              <div className="p-10 pb-2 relative z-10 flex-1 w-full overflow-y-auto">
                <h3 id="modal-title" className="text-3xl font-extrabold mb-5 text-gray-800 flex items-center gap-2">
                  <Icon icon="mdi:credit-card" className="text-yellow-400 text-2xl" />
                  Payment Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
                  {/* LEFT: Customer & Payment Details */}
                  <div className="space-y-6">
                    <div>
                      <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Customer Information</span>
                      <div className="bg-white/90 border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                            <Icon icon="mdi:account-circle" className="w-10 h-10 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">{selectedPayment.name}</div>
                            <div className="text-sm text-gray-500">{selectedPayment.email}</div>
                            <div className="text-sm text-gray-500">{selectedPayment.phone}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Payment Information</span>
                      <div className="bg-white/90 border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-semibold text-lg">₱{selectedPayment.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Payment Method</span>
                            <span className="font-medium">{selectedPayment.method}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Status</span>
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                              selectedPayment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                              selectedPayment.status === 'Successful' ? 'bg-green-100 text-green-700' :
                              selectedPayment.status === 'Canceled' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {selectedPayment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Transaction Details</span>
                      <div className="bg-white/90 border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Transaction ID</span>
                            <span className="font-mono text-blue-700">{selectedPayment.id}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Product ID</span>
                            <span className="font-mono text-blue-700">{selectedPayment.productId}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Date</span>
                            <span className="font-medium">{selectedPayment.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Additional Details */}
                  <div className="space-y-6">
                    <div>
                      <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Payment Timeline</span>
                      <div className="bg-white/90 border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Icon icon="mdi:calendar-check" className="text-green-400 w-5 h-5" />
                            <div>
                              <div className="text-sm font-medium">Transaction Date</div>
                              <div className="text-xs text-gray-500">{selectedPayment.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Icon icon="mdi:clock-outline" className="text-blue-400 w-5 h-5" />
                            <div>
                              <div className="text-sm font-medium">Payment Time</div>
                              <div className="text-xs text-gray-500">{selectedPayment.time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Payment Analytics</span>
                      <div className="bg-white/90 border border-gray-100 rounded-xl p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Transaction Type</div>
                            <div className="text-lg font-bold text-gray-800">Regular</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Payment Channel</div>
                            <div className="text-lg font-bold text-gray-800">Online</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Processing Time</div>
                            <div className="text-lg font-bold text-gray-800">2h</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Verification</div>
                            <div className="text-lg font-bold text-gray-800">Verified</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-1">Actions</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedPayment.status === 'Pending' && (
                          <>
                            <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition flex items-center gap-1">
                              <Icon icon="mdi:check-circle" className="w-4 h-4" />
                              Approve Payment
                            </button>
                            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-1">
                              <Icon icon="mdi:close-circle" className="w-4 h-4" />
                              Reject Payment
                            </button>
                          </>
                        )}
                        {selectedPayment.status === 'Successful' && (
                          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition flex items-center gap-1">
                            <Icon icon="mdi:download" className="w-4 h-4" />
                            Download Receipt
                          </button>
                        )}
                        <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition flex items-center gap-1">
                          <Icon icon="mdi:printer" className="w-4 h-4" />
                          Print Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Payments;
