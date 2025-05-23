// Products.tsx
import { Icon } from '@iconify/react';

function Users() {
  return (
    <main className="flex-1 px-8 py-8 bg-gray-50 overflow-auto">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-2">
          <Icon icon="mdi:account-outline" className="text-blue-400 w-8 h-8" />
          Users & Feedback
        </h2>
        <p className="text-gray-500 text-md">Manage customer feedback and user actions</p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-blue-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
          <Icon icon="mdi:account-group" className="w-10 h-10 text-blue-400 mb-3" />
          <span className="text-2xl font-bold text-gray-800">1,234</span>
          <span className="text-gray-500 text-sm">Total Users</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
          <Icon icon="mdi:star-outline" className="w-10 h-10 text-yellow-400 mb-3" />
          <span className="text-2xl font-bold text-gray-800">345</span>
          <span className="text-gray-500 text-sm">Feedbacks</span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-green-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
          <Icon icon="mdi:message-outline" className="w-10 h-10 text-green-400 mb-3" />
          <span className="text-2xl font-bold text-gray-800">89</span>
          <span className="text-gray-500 text-sm">Messages</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4 text-sm">
          {['Feedback', 'Customer Action', 'Message Box'].map((label, idx) => (
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
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-white"
            />
          </div>
          <button className="px-4 py-2 border border-blue-200 rounded-lg text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
            Advance Filter
          </button>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <span className="font-semibold text-gray-700 text-lg">Feedback Table</span>
          <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
            <Icon icon="mdi:download" className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" /></th>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Ratings</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                {
                  id: '#000001',
                  name: 'Progress Lighting Ceiling',
                  rating: 4,
                },
                {
                  id: '#000002',
                  name: 'LED Surface Panel Ceiling Light',
                  rating: 3,
                },
                {
                  id: '#000003',
                  name: 'Kovacs 1 Light Arc Floor Light',
                  rating: 5,
                },
                {
                  id: '#000004',
                  name: 'Plug In Pendant Light',
                  rating: 4,
                },
                {
                  id: '#000005',
                  name: 'Progress Floor Light',
                  rating: 3,
                },
                {
                  id: '#000006',
                  name: 'Progress Lighting Ceiling',
                  rating: 4,
                },
              ]
                .flatMap((entry) => [entry, entry]) // duplicate for row count
                .map((product, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="accent-blue-400" />
                    </td>
                    <td className="px-4 py-3 font-mono text-blue-700">{product.id}</td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, starIdx) => (
                          <Icon
                            key={starIdx}
                            icon={starIdx < product.rating ? 'mdi:star' : 'mdi:star-outline'}
                            className={`w-4 h-4 ${starIdx < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">03/10/25</td>
                    <td className="px-4 py-3">
                      <button className="px-4 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition">
                        View
                      </button>
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

export default Users;
