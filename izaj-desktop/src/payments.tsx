import { Icon } from '@iconify/react';

function Payments() {
  return (
    <main className="flex-1 px-8 py-8 bg-gray-50 overflow-auto">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-2">
          <Icon icon="mdi:credit-card-outline" className="text-yellow-400 w-8 h-8" />
          Payments
        </h2>
        <p className="text-gray-500 text-md">Monitor and manage payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
          <Icon icon="mdi:clock-outline" className="w-10 h-10 text-yellow-400 mb-3" />
          <span className="text-2xl font-bold text-gray-800">120</span>
          <span className="text-gray-500 text-sm">Pending</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-green-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
          <Icon icon="mdi:check-circle-outline" className="w-10 h-10 text-green-400 mb-3" />
          <span className="text-2xl font-bold text-gray-800">320</span>
          <span className="text-gray-500 text-sm">Successful</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-red-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
          <Icon icon="mdi:close-circle-outline" className="w-10 h-10 text-red-400 mb-3" />
          <span className="text-2xl font-bold text-gray-800">23</span>
          <span className="text-gray-500 text-sm">Canceled</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-blue-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
          <Icon icon="mdi:cash-refund" className="w-10 h-10 text-blue-400 mb-3" />
          <span className="text-2xl font-bold text-gray-800">8</span>
          <span className="text-gray-500 text-sm">Refunds</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4 text-sm">
          {['Pending', 'Successful', 'Canceled', 'Refund'].map((label, idx) => (
            <button
              key={idx}
              className="flex items-center space-x-1 text-gray-700 hover:text-black px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm transition"
            >
              <Icon icon="mdi:checkbox-blank-circle-outline" className="w-4 h-4" />
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
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-100 focus:border-yellow-200 bg-white"
            />
          </div>
          <button className="px-4 py-2 border border-yellow-200 rounded-lg text-sm bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition">
            Advance Filter
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <span className="font-semibold text-gray-700 text-lg">Payments Table</span>
          <button className="flex items-center gap-1 text-sm text-yellow-600 hover:underline">
            <Icon icon="mdi:download" className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" /></th>
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
              {[
                { id: '#000001', name: 'Jerome Bulaktala', email: 'jeromebulaktala@gmail.com', phone: '09231283712', date: '03/10/25', productId: 'PROD–000001' },
                { id: '#000002', name: 'Ruiz Miguel Sapio', email: 'sapioruizm@gmail.com', phone: '09231283712', date: '03/10/25', productId: 'PROD–000002' },
                { id: '#000003', name: 'Rim Vernon Dimanadal', email: 'dimanadalrim@gmail.com', phone: '09231283712', date: '03/10/25', productId: 'PROD–000003' },
                { id: '#000004', name: 'John Isaiah Garcia', email: 'garciajohn@gmail.com', phone: '09231283712', date: '03/10/25', productId: 'PROD–000004' },
                { id: '#000005', name: 'Anthony Gabrielle Doria', email: 'doriaanthony@gmail.com', phone: '09231283712', date: '03/10/25', productId: 'PROD–000005' },
                { id: '#000006', name: 'Pearl Jam Latayan', email: 'latayanpearljam@gmail.com', phone: '09231283712', date: '03/10/25', productId: 'PROD–000006' },
              ].flatMap(entry => [entry, entry])
                .map((user, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50 transition">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="accent-yellow-400" />
                    </td>
                    <td className="px-4 py-3 font-mono text-yellow-700">{user.id}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{user.date}</td>
                    <td className="px-4 py-3">ID: {user.productId}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-700">
                        Unpaid
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Payments;
