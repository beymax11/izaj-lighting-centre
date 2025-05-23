import { Icon } from '@iconify/react';

interface Stat {
  label: string;
  count: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

function Orders() {
  const stats: Stat[] = [
    { 
      label: 'Pending', 
      count: 222, 
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-100',
      textColor: 'text-yellow-400'
    },
    { 
      label: 'Shipping', 
      count: 100,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      textColor: 'text-blue-400'
    },
    { 
      label: 'Completed', 
      count: 111,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
      textColor: 'text-green-400'
    },
    { 
      label: 'Cancelled', 
      count: 22,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
      textColor: 'text-red-400'
    }
  ];

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 px-8 py-6 bg-white m-4 rounded-2xl shadow-lg border border-white overflow-hidden"
        style={{
          boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
        }}>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Orders Overview</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300 w-64 transition-all duration-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center gap-2">
              <Icon icon="mdi:filter-variant" className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bgColor} rounded-xl p-4 border ${stat.borderColor}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <Icon icon="mdi:circle" className={`w-2 h-2 ${stat.textColor}`} />
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-800">{stat.count}</div>
            </div>
          ))}
        </div>

        {/* Order Table */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
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
              {/*
                Sample data for orders. In a real application, this data would be fetched from an API or database.
              */}
              {[
                { product: 'Progress Lighting Ceiling', price: '₱ 3,999', customer: 'Ruiz Miguel Sapio', date: '03/10/2025', payment: 'Paid', status: 'Accept' },
                { product: 'LED Surface Panel Ceiling Light', price: '₱ 3,999', customer: 'Jerome Bulaktala', date: '03/09/2025', payment: 'Paid', status: 'Accept' },
                { product: 'Kovacs 1 Light Arc Floor Light', price: '₱ 1,499', customer: 'John Isaiah Garcia', date: '03/08/2025', payment: 'Paid', status: 'Accept' },
                { product: 'Plug In Pendant Light', price: '₱ 1,999', customer: 'Rim Vernon Dimanadal', date: '03/07/2025', payment: 'Paid', status: 'Accept' },
                { product: 'Progress Floor Light', price: '₱ 2,999', customer: 'Anthony Doria', date: '03/06/2025', payment: 'Paid', status: 'Accept' },
                { product: 'Progress Lighting Ceiling', price: '₱ 3,999', customer: 'Pearl Latayan', date: '03/05/2025', payment: 'Paid', status: 'Accept' },
                { product: 'Progress Lighting Ceiling', price: '₱ 3,999', customer: 'Jaun Two', date: '03/04/2025', payment: 'Unpaid', status: 'Accept' },
              ].map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{order.product}</div>
                    <div className="text-xs text-gray-400">ID: 00000{idx + 1}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.price}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.payment === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      {order.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing 1 to 7 of 555 entries
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">Previous</button>
            {[1, 2, 3, '...', 50].map((page, idx) => (
              <button key={idx} className={`px-3 py-1 rounded-lg text-sm ${
                page === 1 ? 'bg-yellow-400 text-white' : 'hover:bg-gray-50 border border-gray-200'
              }`}>
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orders;
