// Products.tsx
import { useState } from 'react';
import { Icon } from '@iconify/react';

function Orders() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-sm border-r flex flex-col h-full shrink-0 overflow-hidden`}>
        <div className="flex items-center gap-3 px-6 py-4">
          <img src="/izaj.jpg" alt="IZAJ Logo" className={`rounded-full bg-yellow-400 transition-all duration-300 ${sidebarCollapsed ? 'w-10 h-10' : 'w-10 h-10'}`} />
          {!sidebarCollapsed && (
            <h1 className="text-4xl font-regular text-gray-800" style={{ color: "#000000", fontFamily: "'Playfair Display', serif", textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)", letterSpacing: "10px" }}>
              IZAJ
            </h1>
          )}
        </div>
        <nav className={`${sidebarCollapsed ? 'p-2' : 'p-6'} flex-1`}>
          <ul className="space-y-2">
            {[
              { icon: 'mdi:view-dashboard', label: 'DASHBOARD', route: '/' },
              { icon: 'mdi:shopping-outline', label: 'PRODUCTS', route: '/products' },
              { icon: 'mdi:clipboard-list-outline', label: 'ORDERS', route: '/orders' },
              { icon: 'mdi:account-outline', label: 'USERS', route: '/user' },
              { icon: 'mdi:credit-card-outline', label: 'PAYMENTS', route: '/payments' },
              { icon: 'mdi:chart-bar', label: 'REPORTS', route: '/reports' },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.route}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2'} text-gray-800 hover:bg-gray-100 rounded-lg font-medium`}
                >
                  <Icon icon={item.icon} className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-800`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`${sidebarCollapsed ? 'px-2' : 'px-6'} pb-6`}>
          <button className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3 mb-2' : 'gap-3 mb-4'} text-gray-600 hover:text-gray-800 w-full`}>
            <img src="/profile.webp" alt="Profile" className="w-8 h-8 rounded-full bg-gray-300" />
            {!sidebarCollapsed && <span className="text-sm font-medium">PROFILE</span>}
          </button>
          <button className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3'} text-gray-600 hover:text-gray-800 w-full`}>
            <Icon icon="mdi:cog-outline" className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-400`} />
            {!sidebarCollapsed && <span className="text-sm font-medium">SETTINGS</span>}
          </button>
        </div>
      </aside>

      {/* Header */}
      <div className="flex-1 flex flex-col overflow-hidden">
       <header className={`bg-white shadow-lg border px-6 py-4 ${sidebarCollapsed ? 'mx-2' : 'mx-6'} mt-4 rounded-xl shrink-0 overflow-hidden`}>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button className="p-2" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
      </button>
    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
      Review Order
    
    </h2>
    </div>
   
  </div>
</header>


        {/* Main Content */}
        <main className={`flex-1 ${sidebarCollapsed ? 'px-4' : 'px-8'} py-6 bg-gray-50 overflow-auto`}>
  {/* Filter Bar */}
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center space-x-4 text-sm">
      {['Pending (222)', 'Shipping (100)', 'Completed (111)', 'Cancel (22)'].map((label, idx) => (
        <button key={idx} className="flex items-center space-x-1 text-gray-700 hover:text-black">
          <span>{label}</span>
        </button>
      ))}
    </div>
    <div className="flex items-center space-x-2">
      <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-lg" />
      <button className="px-3 py-2 border rounded-lg text-sm">Advance Filter</button>
    </div>
  </div>

  {/* Order Table */}
  <div className="bg-white shadow rounded-lg overflow-hidden border">
    <table className="min-w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th className="px-4 py-3"><input type="checkbox" /></th>
          <th className="px-4 py-3">Product Name</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Customer</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Payment</th>
          <th className="px-4 py-3">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {[
          { product: 'Progress Lighting Ceiling', price: '₱ 3,999', customer: 'Ruiz Miguel Sapio', date: '03/10/2025', payment: 'Paid', status: 'Accept' },
          { product: 'LED Surface Panel Ceiling Light', price: '₱ 3,999', customer: 'Jerome Bulaktala', date: '03/09/2025', payment: 'Paid', status: 'Accept' },
          { product: 'Kovacs 1 Light Arc Floor Light', price: '₱ 1,499', customer: 'John Isaiah Garcia', date: '03/08/2025', payment: 'Paid', status: 'Accept' },
          { product: 'Plug In Pendant Light', price: '₱ 1,999', customer: 'Rim Vernon Dimanadal', date: '03/07/2025', payment: 'Paid', status: 'Accept' },
          { product: 'Progress Floor Light', price: '₱ 2,999', customer: 'Anthony Doria', date: '03/06/2025', payment: 'Paid', status: 'Accept' },
          { product: 'Progress Lighting Ceiling', price: '₱ 3,999', customer: 'Pearl Latayan', date: '03/05/2025', payment: 'Paid', status: 'Accept' },
          { product: 'Progress Lighting Ceiling', price: '₱ 3,999', customer: 'Jaun Two', date: '03/04/2025', payment: 'Unpaid', status: 'Accept' },
        ].map((order, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-4 py-3"><input type="checkbox" /></td>
            <td className="px-4 py-3 font-medium text-gray-800">
              {order.product}
              <div className="text-xs text-gray-400">ID: 00000{idx + 1}</div>
            </td>
            <td className="px-4 py-3">{order.price}</td>
            <td className="px-4 py-3">{order.customer}</td>
            <td className="px-4 py-3">{order.date}</td>
            <td className="px-4 py-3">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${order.payment === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {order.payment}
              </span>
            </td>
            <td className="px-4 py-3">
              <button className="px-4 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">Accept</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</main>

      </div>
    </div>
  );
}

export default Orders;
