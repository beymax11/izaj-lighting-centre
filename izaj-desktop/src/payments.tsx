// Products.tsx
import { useState } from 'react';
import { Icon } from '@iconify/react';

function Payments() {
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
      Payment & Transaction
    
    </h2>
    </div>
   
  </div>
</header>


        {/* Main Content */}
        <main className={`flex-1 ${sidebarCollapsed ? 'px-4' : 'px-8'} py-6 bg-gray-50 overflow-auto`}>
  {/* Filter Bar */}
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center space-x-4 text-sm">
      {['Pending', 'Successful', 'Canceled', 'Refund'].map((label, idx) => (
        <button key={idx} className="flex items-center space-x-1 text-gray-700 hover:text-black">
          <Icon icon={`mdi:checkbox-blank-circle-outline`} className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
    <div className="flex items-center space-x-2">
      <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-lg" />
      <button className="px-3 py-2 border rounded-lg text-sm">Advance Filter</button>
    </div>
  </div>

  {/* Payments Table */}
  <div className="bg-white shadow rounded-lg overflow-hidden border">
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
        ].flatMap(entry => [entry, entry]) // Duplicated to match image row count
        .map((user, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-4 py-3"><input type="checkbox" /></td>
            <td className="px-4 py-3">{user.id}</td>
            <td className="px-4 py-3">{user.name}</td>
            <td className="px-4 py-3">{user.email}</td>
            <td className="px-4 py-3">{user.phone}</td>
            <td className="px-4 py-3">{user.date}</td>
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
</main>


      </div>
    </div>
  );
}

export default Payments;
