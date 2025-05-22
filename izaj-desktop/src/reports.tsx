// Products.tsx
import { useState } from 'react';
import { Icon } from '@iconify/react';

function Reports() {
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
      Reports & Analytics
    
    </h2>
    </div>
   
  </div>
</header>


        {/* Main Content */}
        <main className={`flex-1 ${sidebarCollapsed ? 'px-4' : 'px-8'} py-6 bg-gray-50 overflow-auto`}>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Total Sales Revenue */}
    <div className="bg-white rounded-lg shadow p-6 border flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-4">
        <Icon icon="mdi:cash-multiple" className="text-4xl text-gray-600" />
        <h3 className="text-lg font-bold text-sky-500">Total Sales Revenue</h3>
      </div>
      <p className="text-3xl font-bold mb-1">₱ 1,111,111.00</p>
      <p className="text-sm text-gray-500 mb-4">Your total sale</p>
      <button className="self-end px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1">
        <Icon icon="mdi:eye-outline" />
        View
      </button>
    </div>

    {/* Best Sales by Product */}
    <div className="bg-white rounded-lg shadow p-6 border flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-4">
        <Icon icon="mdi:package-variant-closed" className="text-4xl text-gray-600" />
        <h3 className="text-lg font-bold text-sky-500">Best Sales by Product</h3>
      </div>
      <p className="text-lg font-semibold">Plug In Pendant Light</p>
      <p className="text-sm text-gray-500 mb-4">#PROD–000001</p>
      <button className="self-end px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1">
        <Icon icon="mdi:chart-box-outline" />
        View
      </button>
    </div>

    {/* Best Sales by Category */}
    <div className="bg-white rounded-lg shadow p-6 border flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-4">
        <Icon icon="mdi:box" className="text-4xl text-gray-600" />
        <h3 className="text-lg font-bold text-sky-500">Best Sales by Category</h3>
      </div>
      <p className="text-lg font-semibold">Pendant Light</p>
      <p className="text-sm text-gray-500 mb-4">Best product sale</p>
      <button className="self-end px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1">
        <Icon icon="mdi:chart-box-outline" />
        View
      </button>
    </div>

    {/* Sales Trend */}
    <div className="bg-white rounded-lg shadow p-6 border flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-4">
        <Icon icon="mdi:chart-line" className="text-4xl text-gray-600" />
        <h3 className="text-lg font-bold text-sky-500">Sales Trend</h3>
      </div>
      <ul className="text-sm text-gray-800 space-y-1 mb-4">
        <li>Top 1 <strong>Plug In Pendant Light</strong></li>
        <li>Top 2 <strong>Modern Chandelier Light</strong></li>
        <li>Top 3 <strong>Cluster Chandelier</strong></li>
      </ul>
      <button className="self-end px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1">
        <Icon icon="mdi:chart-line" />
        View
      </button>
    </div>

    {/* Total Website Visit */}
    <div className="bg-white rounded-lg shadow p-6 border flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-4">
        <Icon icon="mdi:web" className="text-4xl text-gray-600" />
        <h3 className="text-lg font-bold text-sky-500">Total Website Visit</h3>
      </div>
      <p className="text-5xl font-bold text-center my-auto">123</p>
    </div>

    {/* Stock Level */}
    <div className="bg-white rounded-lg shadow p-6 border flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-4">
        <Icon icon="mdi:warehouse" className="text-4xl text-gray-600" />
        <h3 className="text-lg font-bold text-sky-500">Stock Level</h3>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Icon icon="mdi:chart-line-variant" className="text-5xl text-sky-400" />
      </div>
      <button className="self-end mt-4 px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1">
        <Icon icon="mdi:chart-box-outline" />
        View
      </button>
    </div>
  </div>
</main>


      </div>
    </div>
  );
}

export default Reports;
